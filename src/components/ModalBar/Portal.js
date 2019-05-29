import React,{ Component } from 'react'
import ReactDOM from 'react-dom'

export default class Portal extends Component {
	constructor(props) {
	  	super(props)
	
	  	this.node = document.body
	}
	render() {
		const { visible, children } = this.props
		if(visible){
			return (
				ReactDOM.createPortal(
			      children,
			      this.node,
			    )
			)
		}else{
			return null
		}
	}
}