import React from 'react'

// matirial
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

// redux
import { RootState } from '@/redux/store'
import { commentsAdded } from '@/redux/reducers/commentsReducer'
import { useSelector, useDispatch } from 'react-redux'

// apiRequests
import { createComment } from '@/utils/apiRequests'

// castomHooks
import { useFormState } from 'react-use-form-state'
//-------------------------------------
const useStyles = makeStyles(() =>
	createStyles({
		root: {
			width: '100%',
			display: 'flex',
			flexDicoration: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			transformOrigin: 'center',
			paddingBottom: '5rem',
		},
		textarea: {
			height: '100%',
			width: '100%',
			fontSize: '1.2rem',
		},
		form: {
			width: '90%',
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'column',
			background: '333',
			color: '#fff',
			fontSize: '1.5rem',
			'& input': {
				borderRadius: 5,
				paddingBottom: 5,
			},
		},
		buttons: {
			width: '100%',
			display: 'flex',
			justifyContent: 'space-around',
		},
	}),
)

const Footer = (): JSX.Element => {
	const classes = useStyles()
	const post = useSelector((state: RootState) => state.postPage)
	const [formState, { textarea }] = useFormState()
	const dispatch = useDispatch()

	const handlerSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		try {
			const result = await createComment(post.id, formState.values.body)
			dispatch(
				commentsAdded({
					postId: post.id,
					body: formState.values.body,
					id: result.data.id,
				}),
			)
		} catch (err) {
			throw new Error(err)
		}
	}

	return (
		<div className={classes.root}>
			<form className={classes.form} onSubmit={handlerSubmit}>
				<textarea {...textarea('body')} className={classes.textarea} required />
				<Button type='submit'>Submit</Button>
			</form>
		</div>
	)
}

export default Footer
