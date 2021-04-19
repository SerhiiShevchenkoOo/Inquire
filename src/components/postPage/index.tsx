import React, { useReducer, useEffect } from 'react'

// material
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

// react-router
import { useParams } from 'react-router-dom'

// hooks
import dataFetchReducer from '@/utils/dataFetchReducer'

// api
import { getPost } from '@/utils/apiRequests'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setPost } from '@/redux/reducers/postReducer'

// components
import Loader from '@/components/Loader'
import Comments from './Comments'
import FormUpdatePost from './FormUpdatePost'
// -----------------------

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		position: 'relative',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
})

const PagePost = (): JSX.Element => {
	const { id }: { id: string } = useParams()
	const post = useSelector((state: RootState) => state.postPage)
	const dispatch = useDispatch()
	const [loading, dispatchLoadding] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
	})
	const { isLoading, isError } = loading
	const classes = useStyles()

	useEffect(() => {
		const getPostsFromApi = async () => {
			dispatchLoadding({ type: 'FETCH_INIT' })
			try {
				const result = await getPost(id)
				dispatch(setPost({ ...result.data, id }))
				dispatchLoadding({ type: 'FETCH_SUCCESS' })
			} catch (err) {
				dispatchLoadding({ type: 'FETCH_FAILURE' })
			}
		}
		getPostsFromApi()
	}, [dispatch, id])

	if (isError) {
		return <p>error</p>
	}
	if (isLoading) {
		return <Loader />
	}
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color='textSecondary'
					gutterBottom>
					title
				</Typography>
				<Typography variant='h5' component='h2'>
					{post.title}
				</Typography>
				<FormUpdatePost />
				<Typography variant='body2' component='p'>
					{post.body}
				</Typography>
				<Comments />
			</CardContent>
		</Card>
	)
}

export default PagePost
