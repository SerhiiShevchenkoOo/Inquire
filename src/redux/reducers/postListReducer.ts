import { createSlice } from '@reduxjs/toolkit'

type InitialArr = Array<{ id: number; title: string; body: string }>

const initialState: InitialArr = []

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: (state, action) => {
			state.push(action.payload)
		},
		setPosts: (state, action) => {
			return [...action.payload]
		},
		delelePost: (state, action) => {
			return state.filter(elem => elem.id !== action.payload)
		},
	},
})

export const { postAdded, delelePost, setPosts } = postsSlice.actions

export default postsSlice.reducer
