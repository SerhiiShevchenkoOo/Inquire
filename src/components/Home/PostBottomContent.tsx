import React from 'react'

// matirial
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import SendIcon from '@material-ui/icons/Send'

// react-router
import { Link } from 'react-router-dom'

// api
import { delatePost } from '@/utils/apiRequests'

// redux
import { useDispatch } from 'react-redux'
import { delelePost } from '@/redux/reducers/postListReducer'
// --------------------------------------------------

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			display: 'flex',
			width: '100%',
			justifyContent: 'space-around',
		},
	}),
)

interface StandardComponentProps {
	elem: {
		id: number
		title: string
		body: string
	}
}

const PostBottomContent = ({ elem }: StandardComponentProps): JSX.Element => {
	const classes = useStyles()
	const dispatch = useDispatch()

	const handlerDeLete = async () => {
		await delatePost(elem.id)
		dispatch(delelePost(elem.id))
	}
	return (
		<div className={classes.root}>
			<Link
				to={`/post/${elem.id}`}
				style={{
					textDecoration: 'none',
				}}>
				<Button size='small' color='primary' endIcon={<SendIcon />}>
					learn more
				</Button>
			</Link>
			<Button
				startIcon={<DeleteIcon />}
				size='small'
				color='primary'
				onClick={handlerDeLete}>
				Delete
			</Button>
		</div>
	)
}

export default PostBottomContent
