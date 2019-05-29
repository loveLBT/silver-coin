import React,{ Component } from 'react'

import './style.css'

export default class SettlementItem extends Component {
	render() {
		const param = this.props

		return (
			<div className="settlement-item">
				<div className="money-item-info">
					<div className="money-item-info-img">
						<img src={param.moneyIcon} alt="钱币图标"/>
					</div>
					<div className="money-item-info-desc">
						<span className="money-item-info-desc-price">￥{param.price}</span>
						<span className="money-item-info-desc-util">{param.util}</span>
					</div>
				</div>
				<div className="money-item-input">
					<div className="money-item-num">
						金额：<span style={{fontSize:"12px",color:"red"}}>￥</span><span style={{color:"red"}}>{param.count}</span>
					</div>
					<div className="money-item-count">
						数量：<span style={{color:"#3ccba6"}}>{param.value}</span>
					</div>
				</div>
			</div>
		)
	}
}