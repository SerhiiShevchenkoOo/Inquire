import React, { Fragment } from 'react'

// api
import { getAllposts } from '@/utils/apiRequests'

// material
import List from '@material-ui/core/List'
import { createStyles, makeStyles } from '@material-ui/core/styles'

// redux
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setPosts } from '@/redux/reducers/postListReducer'

// hooks
import useDataApi from '@/utils/useDataApi'

// components
import Loader from '@/components/Loader'
import PostCard from './postCard'
// ------------------

const useStyles = makeStyles(() =>
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
	const classes = useStyles()
	const [{ isLoading, isError }] = useDataApi(getAllposts, [], setPosts)

	const renderPostsList = () => {
		return posts.map(elem => {
			return (
				<Fragment key={elem.id}>
					<PostCard elem={elem} />
				</Fragment>
			)
		})
	}

	if (isError) {
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
