import React,{ Component } from 'react'
import HOCHeader from '../HOC/HOCHeader'

@HOCHeader({
	title:"开通配送"
})
export default class Delivery extends Component {
	render() {
		return (
			<div className="delivery">
				<img src="/images/delivery.png" alt="配送图标"/>
				<p>请在帮助中心中联系客服或者拨打当地热心电话开通配送功能</p>
				<p>总部电话：</p>
				<p>总部客服热线：</p>
			</div>
		)
	}
}