import React, { StrictMode } from 'react'
import { render } from 'react-dom'

// router
import { BrowserRouter as Router } from 'react-router-dom'

// material
import { ThemeProvider as MatirialProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { rootStyle } from '@/style'

// style
import 'normalize.css'

// redax
import { Provider } from 'react-redux'
import store from './redux/store'

// components
import App from './App'
//-------------------------------

render(
	<StrictMode>
		<CssBaseline />
		<Provider store={store}>
			<MatirialProvider theme={rootStyle}>
				<Router>
					<App />
				</Router>
			</MatirialProvider>
		</Provider>
	</StrictMode>,
	document.getElementById('root'),
)
