import React from 'react'

// matirial
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

// components
import PostBottomContent from './PostBottomContent'
// --------------------------------------------------
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			backgroundColor: theme.palette.background.paper,
			overflowX: 'hidden',
			overflowY: 'auto',
		},
		avatar: {
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
		},
		text: {
			width: '100%',
			maxHeight: 200,
			overflow: 'auto',
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

const PostCard = ({ elem }: StandardComponentProps): JSX.Element => {
	const classes = useStyles()

	return (
		<>
			<ListItem className={classes.root} alignItems='flex-start'>
				<ListItemAvatar className={classes.avatar}>
					<Avatar>{elem.id}</Avatar>
				</ListItemAvatar>
				<ListItemText
					className={classes.text}
					primary={elem.title}
					secondary={
						<React.Fragment>
							<Typography
								component='span'
								variant='body2'
								className={classes.text}
								color='textSecondary'>
								{elem.body}
							</Typography>
						</React.Fragment>
					}
				/>
				<PostBottomContent elem={elem} />
			</ListItem>
			<Divider variant='inset' component='li' />
		</>
	)
}

export default PostCard
