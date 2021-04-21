import React from 'react'

// material
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
//------------------------------------------------------------
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			'& > * + *': {
				marginTop: theme.spacing(2),
			},
		},
	}),
)

export default function LinearIndeterminate(): JSX.Element {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<LinearProgress color='secondary' />
		</div>
	)
}
