import { configureStore } from '@reduxjs/toolkit'
import postsListReducer from '@/redux/reducers/postListReducer'
import postsReducer from '@/redux/reducers/postReducer'
import commentsReducer from '@/redux/reducers/commentsReducer'

const store = configureStore({
	reducer: {
		posts: postsListReducer,
		postPage: postsReducer,
		comments: commentsReducer,
	},
})
export type RootState = ReturnType<typeof store.getState>

export default store
