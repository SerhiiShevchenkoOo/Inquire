import React, { useState } from 'react'

// matirial
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'

// router
import { useLocation } from 'react-router-dom'

// components
import CreatePostForm from './CreatePostForm'
//---------------------------------

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			width: '100%',
			zIndex: 3,
			borderTopLeftRadius: 100,
			borderTopRightRadius: 100,
			top: 'auto',
			bottom: 0,
			left: 0,
		},
		grow: {
			flexGrow: 1,
		},
		fabButton: {
			position: 'absolute',
			zIndex: 1,
			top: -30,
			left: 0,
			right: 0,
			margin: '0 auto',
		},
	}),
)

const Footer = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false)
	const classes = useStyles()
	const isHome = useLocation().pathname === '/'

	return (
		<>
			<AppBar position='fixed' color='primary' className={classes.appBar}>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='open drawer'>
						<HomeIcon />
					</IconButton>
					{isHome && (
						<Fab
							onClick={() => setIsOpen(!isOpen)}
							color='secondary'
							aria-label='add'
							className={classes.fabButton}>
							<AddIcon />
						</Fab>
					)}
					<div className={classes.grow} />
					<Typography variant='h6' color='inherit'>
						Inquire
					</Typography>
				</Toolbar>
			</AppBar>
			<CreatePostForm isOpen={isOpen} setIsOpen={setIsOpen} />
		</>
	)
}

export default Footer
