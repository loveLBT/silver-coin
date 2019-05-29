import React,{ Component } from 'react'
import moment from 'moment'

import './style.css'
const currencyData = [
	{name:"5元纸币",key:"note5"},
	{name:"10元纸币",key:"note10"},
	{name:"20元纸币",key:"note20"},
	{name:"1角硬币卷",key:"jcoin10"},
	{name:"5角硬币卷",key:"jcoin50"},
	{name:"1元硬币卷",key:"jcoin100"}
]


export default class extends Component {
	static defaultProps = {
	  	showDispensingTypeRow:true,
	  	onClick:() => {}
	}
	render() {
		const param = this.props
		let currencyArray = []
		for(let item of currencyData){
			if(param[`${item.key}`]) currencyArray.push(item.name)
		}

		return (
			<div onClick={this.props.onClick} className="dispensing-item">
				<div className="title">
					<img src="/images/dingdan_ic.png" alt="订单图标" />
					<span>{param.title}</span>
				</div>
				<div className="content">
					<div className="content-left">
						<div className="row">
							<span className="label">兑换币种：</span>
							<span className="value">{currencyArray.join('、')}</span>
						</div>
						<div className="row">
							<span className="label">总&ensp;金&ensp;额：</span>
							<span className="value">{param.total.toFixed(1)}元</span>
						</div>
						<div className="row">
							<span className="label">下单时间：</span>
							<span className="value">{moment(param.gmtCreate).format("YYYY-MM-DD HH:mm")}</span>
						</div>
						{param.showDispensingTypeRow && 
							<div className="row">
								<span className="label">调剂类型：</span>
								<span className="value">{param.adjustType}</span>
							</div>
						}
						
					</div>
					<div className="content-right">
						<img src="/images/go.png" alt="左箭头图标"/>
					</div>
				</div>
			</div>
		)
	}
}