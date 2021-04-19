import React from 'react'
import { render } from 'react-dom'

// router
import { BrowserRouter as Router } from 'react-router-dom'

// material
import { ThemeProvider as MatirialProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

// style
import { rootStyle } from '@/style'
import '@/style/index.css' // eslint-disable-line  import/extensions
import 'normalize.css'

// redax
import { Provider } from 'react-redux'
import store from './redux/store'

// components
import App from './App'
//-------------------------------

render(
	<Provider store={store}>
		<MatirialProvider theme={rootStyle}>
			<CssBaseline />
			<Router>
				<App />
			</Router>
		</MatirialProvider>
	</Provider>,
	document.getElementById('root'),
)
