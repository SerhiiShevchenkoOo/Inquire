import { createSlice } from '@reduxjs/toolkit'

type InitialArr = Array<{ postId: number; id: string; body: string }>

const initialState: InitialArr = []

const postsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		commentsAdded: (state, action) => {
			state.push(action.payload)
		},
		setComments: (state, action) => {
			return [...action.payload]
		},
	},
})

export const { commentsAdded, setComments } = postsSlice.actions

export default postsSlice.reducer
