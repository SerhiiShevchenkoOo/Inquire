import React, { useEffect, useState, Fragment } from 'react'

// api
import { getAllposts } from '@/utils/apiRequests'

// material
import List from '@material-ui/core/List'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setPosts } from '@/redux/postReducer'

// components
import Loader from '@/components/Loader'
import PostCard from './postCard'
// ------------------

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		list: {
			paddingBottom: '5rem',
		},
		inline: {
			display: 'inline',
			height: '5rem',
		},
	}),
)

const Home = (): JSX.Element => {
	const posts = useSelector((state: RootState) => state.posts)
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)
	const classes = useStyles()

	useEffect(() => {
		const getPostsFromApi = async () => {
			setIsLoading(true)
			try {
				const result = await getAllposts()
				dispatch(setPosts(result.data))
				setIsLoading(false)
			} catch (err) {
				setError(err)
				setIsLoading(false)
			}
		}
		getPostsFromApi()
	}, [dispatch])

	const renderPostsList = () => {
		return posts.map(elem => {
			return (
				<Fragment key={elem.id}>
					<PostCard elem={elem} />
				</Fragment>
			)
		})
	}

	if (error) {
		return <p>error</p>
	}
	if (isLoading) {
		return <Loader />
	}
	return (
		<>
			<List className={classes.list}>{renderPostsList()}</List>
		</>
	)
}
export default Home
