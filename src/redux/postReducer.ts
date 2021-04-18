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
		getPosts: (state, action) => {
			return [...action.payload]
		},
	},
})

export const { postAdded, getPosts } = postsSlice.actions

export default postsSlice.reducer
