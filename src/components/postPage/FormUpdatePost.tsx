import React, { useState } from 'react'

// matirial
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

// redux
import { setPost } from '@/redux/reducers/postReducer'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
// apiRequests
import { updatePost } from '@/utils/apiRequests'

// castomHooks
import { useFormState } from 'react-use-form-state'
//-------------------------------------
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			zIndex: 1,
			position: 'absolute',
			borderRadius: 50,
			right: 0,
			top: 0,
			height: '100%',
			width: '100%',
			display: 'flex',
			flexDicoration: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			background: 'rebeccapurple',
			transition: 'all 1s',
			transformOrigin: 'center',
			transform: ({ isOpen }: { isOpen: boolean }) =>
				!isOpen ? 'translateX(100%) scale(0.3)' : 'translateX(0) scale(1)',
		},
		textarea: {
			height: '100%',
			minHeight: '15vh',
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

const FormUpdatePost = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false)
	const classes = useStyles({ isOpen })
	const post = useSelector((state: RootState) => state.postPage)
	const [formState, { text, textarea, label }] = useFormState({
		title: post.title,
		body: post.body,
	})
	const dispatch = useDispatch()
	const handlerSubmit = async (e: any) => {
		e.preventDefault()
		try {
			await updatePost(formState.values.title, formState.values.body, post.id)
			dispatch(
				setPost({
					title: formState.values.title,
					body: formState.values.body,
					id: post.id,
				}),
			)
		} catch (err) {
			console.log(err)
		}
		setIsOpen(false)
	}

	return (
		<>
			<Button
				onClick={() => setIsOpen(!isOpen)}
				variant='outlined'
				size='small'>
				Update
			</Button>
			<div className={classes.root}>
				<form className={classes.form} onSubmit={handlerSubmit}>
					<label {...label('title')}>title</label>
					<input {...text('title')} required />
					<label {...label('body')}>postInfo</label>
					<textarea {...textarea('body')} className={classes.textarea} />
					<ButtonGroup
						disableElevation
						variant='contained'
						color='primary'
						className={classes.buttons}>
						<Button type='submit'>Submit</Button>
						<Button color='secondary' onClick={() => setIsOpen(false)}>
							back
						</Button>
					</ButtonGroup>
				</form>
			</div>
		</>
	)
}

export default FormUpdatePost
