import React, { useState, useEffect } from 'react'

// material
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// react-router
import { useParams } from 'react-router-dom'

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
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	const classes = useStyles()

	useEffect(() => {
		const getPostsFromApi = async () => {
			setIsLoading(true)
			try {
				const result = await getPost(id)
				dispatch(
					setPost({ title: result.data.title, body: result.data.body, id }),
				)
				setIsLoading(false)
			} catch (err) {
				setError(err)
				setIsLoading(false)
			}
		}
		getPostsFromApi()
	}, [dispatch])

	if (error) {
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
