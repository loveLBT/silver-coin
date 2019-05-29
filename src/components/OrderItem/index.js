import React,{ Component } from 'react'

import './style.css'

const OrderItem = (props) => {
	return (
		<div 
			onClick={() => {
				if(props.onClick){
					props.onClick()
				}
			}} 
			className="order-item"
		>
			<div className="title">
				<div className="title-row">
					{props.showTitleImg && 
						<img src="/images/dingdan_ic.png" alt="订单图标" />
					}
					<span>{props.title}</span>
				</div>
				<span>{props.distance}km</span>
			</div>
			<div className="address">
				地址：{props.address}
			</div>
			<div className="phone">
				电话：{props.phoneNum}
			</div>
		</div>
	)
}

export default OrderItem