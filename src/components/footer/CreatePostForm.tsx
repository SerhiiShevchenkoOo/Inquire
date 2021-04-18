import React from 'react'

// matirial
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

// redux
import { postAdded } from '@/redux/postReducer'
import { useDispatch } from 'react-redux'

// apiRequests
import { createPost } from '@/utils/apiRequests'

// castomHooks
import { useFormState } from 'react-use-form-state'
//-------------------------------------
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			zIndex: 1,
			position: 'fixed',
			borderRadius: 50,
			bottom: '5rem',
			left: 0,
			height: '50vh',
			width: '100%',
			display: 'flex',
			flexDicoration: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			background: 'rebeccapurple',
			transition: 'all 1s',
			transformOrigin: 'center',
			transform: ({ isOpen }: { isOpen: boolean }) =>
				!isOpen ? 'translateY(150%) scale(0.3)' : 'translateY(0) scale(1)',
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
type openForm = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Footer = ({ isOpen, setIsOpen }: openForm): JSX.Element => {
	const classes = useStyles({ isOpen })

	const [formState, { text, textarea, label }] = useFormState()
	const dispatch = useDispatch()

	const handlerSubmit = async (e: any) => {
		e.preventDefault()
		try {
			await createPost(formState.values.title, formState.values.body)
			dispatch(
				postAdded({
					title: formState.values.title,
					body: formState.values.body,
				}),
			)
		} catch (err) {
			console.log(err)
		}
		setIsOpen(false)
	}

	return (
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
	)
}

export default Footer
