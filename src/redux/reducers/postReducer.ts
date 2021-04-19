/* eslint  no-param-reassign:0 */
import { createSlice } from '@reduxjs/toolkit'

type InitialState = { id: number | string; title: string; body: string }

const initialState: InitialState = { id: 0, title: 'title', body: 'body' }

const postsSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setPost: (state, action) => {
			state.title = action.payload.title
			state.body = action.payload.body
			state.id = action.payload.id
		},
	},
})

export const { setPost } = postsSlice.actions

export default postsSlice.reducer
