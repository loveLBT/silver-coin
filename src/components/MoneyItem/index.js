import React,{ Component } from 'react'

import './style.css'
import ASInputBar from '../ASInputBar'

export default class MoneyItem extends Component {
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		count:0
	  	}
	}
	onChange = (val) => {
		this.setState({
			count:val
		},() => {
			if(this.props.onChange){
				this.props.onChange()
			}
		})
		
	}
	render() {
		const { price, util, moneyIcon } = this.props
		const { count } = this.state

		return (
			<div className="money-item">
				<div className="money-item-info">
					<div className="money-item-info-img">
						<img src={moneyIcon} alt="钱币图标"/>
					</div>
					<div className="money-item-info-desc">
						<span className="money-item-info-desc-price">￥{price}</span>
						<span className="money-item-info-desc-util">{util}</span>
					</div>
				</div>
				<div className="money-item-input">
					<div className="money-item-num">
						<ASInputBar 
							onChange={(val) => this.onChange(price*val)} 
						/>
					</div>
					<div className="money-item-count">
						金额：<span style={{color:'red'}}>￥{count.toFixed(1)}</span>
					</div>
				</div>
			</div>
		)
	}
} 