import React,{ Component } from 'react'
import { Icon } from 'antd-mobile'

import Portal from './Portal.js'
import './style.css'

export default class ModalBar extends Component {
	static defaultProps = {
	 	visible:false,
	 	title:'', 
	}
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		visible:props.visible,
	  	}
	}
	onOpen = () => {
		this.setState({
			visible:true
		})
	}
	onClose = () => {
		this.setState({
			visible:false
		})
	}
	componentDidMount() {
		if(this.props.onRef){
			this.props.onRef(this)
		}
	} 
	render() {
		const { visible } = this.state
		const { title, children } = this.props
		return (
			<Portal visible={visible}>
				<div className='modal-bar'>
					<div className="modal">
						<div className="modal-title">
							<span>{title}</span>
							<Icon 
								onClick={() => this.onClose()} 
								type="cross" 
							/>
						</div>
						<div className="modal-content">
							{children}
						</div>
					</div>
					<div className="mask"></div>
				</div>
			</Portal>
		)
	}
}