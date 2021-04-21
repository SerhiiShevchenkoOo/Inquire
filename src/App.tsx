import React from 'react'

// react-router
import { Switch, Route } from 'react-router-dom'

// material
import Container from '@material-ui/core/Container'
import { createStyles, makeStyles } from '@material-ui/core/styles'

// components
import Home from '@/components/Home'
import PostPage from '@/components/postPage'
import Footer from '@/components/footer'
//--------------------------------------------

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			height: '100%',
			position: 'relative',
			overflow: 'hidden',
		},
	}),
)

const App = (): JSX.Element => {
	const classes = useStyles()
	return (
		<Container maxWidth='md' className={classes.root}>
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
			</Switch>
			<Switch>
				<Route path='/post/:id'>
					<PostPage />
				</Route>
			</Switch>
			<Footer />
		</Container>
	)
}

export default App
