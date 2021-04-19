import React, { useEffect, useState, Fragment } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setComments } from '@/redux/reducers/commentsReducer'

// Api
import { getAllCommets } from '@/utils/apiRequests'

// material
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

// components
import Loader from '@/components/Loader'
import CommentAddForm from './CommentAddForm'
// --------------------------------------------
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			display: 'block',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular,
		},
	}),
)

const Comment = (): JSX.Element => {
	const classes = useStyles()

	const comments = useSelector((state: RootState) => state.comments)
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const getPostsFromApi = async () => {
			setIsLoading(true)
			try {
				const result = await getAllCommets()
				dispatch(setComments(result.data))
				setIsLoading(false)
			} catch (err) {
				setIsLoading(false)
				throw new Error(err)
			}
		}
		getPostsFromApi()
	}, [dispatch])

	if (isLoading) {
		return <Loader />
	}
	return (
		<div className={classes.root}>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'>
					<Typography className={classes.heading}>Comments</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<List className={classes.root}>
						{comments.map(comment => {
							return (
								<Fragment key={comment.id}>
									<ListItem alignItems='flex-start'>
										<ListItemAvatar>
											<Avatar>{comment.id}</Avatar>
										</ListItemAvatar>
										<ListItemText
											secondary={
												<Typography
													component='span'
													variant='body2'
													color='textPrimary'>
													{comment.body}
												</Typography>
											}
										/>
									</ListItem>
									<Divider variant='inset' component='li' />
								</Fragment>
							)
						})}
					</List>
				</AccordionDetails>
				<CommentAddForm />
			</Accordion>
		</div>
	)
}
export default Comment
