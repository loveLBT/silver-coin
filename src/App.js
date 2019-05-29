import React, { Component } from 'react';
import { Provider } from 'mobx-react'

import './App.css'
import './util/AsyncInterceptors'
import AppRouter from './AppRouter.js'
import Stores from './Stores/'

class App extends Component {
  	render() {
    	return (
	    	<Provider {...Stores}>
	    		<AppRouter />
	    	</Provider>
    	)
  	}
}

export default App;
