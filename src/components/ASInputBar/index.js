import React,{ Component } from 'react'
import classnames from 'classnames'

import './style.css'

const MIN_VALUE = 0
const MAX_VALUE = 99999

export default class ASInput extends Component {
	static defaultProps = {
	  	value:MIN_VALUE,
	}
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		value:props.value
	  	}
	}
	onAdd = () => {
		const { value } = this.state
		if(value < MAX_VALUE){
			this.onChangeValue(value+1)
		}
	}
	onSubtrac = () => {

		const { value } = this.state
		if(value > MIN_VALUE){
			this.onChangeValue(value-1)
		}
	}
	onInputChange = (e) => {
		let val = e.target.value
		if(val.length <= 5 && val.length > 0){
			this.onChangeValue(parseInt(val))
		}else if(val.length === 0){
			this.onChangeValue(parseInt(0))
		}
		
	}
	onChangeValue = (value) => {
		this.setState({
			value
		})
		if(this.props.onChange){
			this.props.onChange(value)
		}
	}
	render() {
		const { value } = this.state
		
		return (
			<div className="as-input">
				<span onClick={this.onSubtrac.bind(this)} className={classnames("as",{"as-disabled":value === MIN_VALUE})}>一</span>
				<input 
					type="number" 
					value={value}
					className="input" 
					onChange={this.onInputChange.bind(this)}
				/>
				<span onClick={this.onAdd.bind(this)} className={classnames("as",{"as-disabled":value === MAX_VALUE})}>十</span>
			</div>	
		)
	}
}