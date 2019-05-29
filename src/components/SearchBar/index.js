import React,{ Component } from 'react'

import './style.css'

export default class SearchBar extends Component {
	static defaultProps = {
	  	placeholder:"请输入",
	  	onSubmit:() => {}
	}
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		value:""
	  	}
	}
	onSubmit = () => {
		const { value } = this.state
		this.props.onSubmit(value)
	}
	handleEnterKey = (e) => {
		if(e.nativeEvent.keyCode === 13){
			this.onSubmit()
		}
	}
	onChange = (e) => {
		this.setState({
			value:e.target.value
		})
	}
	render(){
		const { value } = this.state
		const { placeholder } = this.props
		return (
			<div className="search-bar">
				<input 
					placeholder={placeholder}
					onKeyPress={this.handleEnterKey.bind(this)}
					value={value}
					onChange={this.onChange.bind(this)}
				/>
				<img onClick={this.onSubmit.bind(this)} src="/images/seach.png" alt="搜素图标"/>
			</div>
		)
	}
}