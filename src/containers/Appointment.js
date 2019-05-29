import React,{ Component } from 'react'
import { Tabs, Button } from 'antd-mobile'
import { Toast } from 'antd-mobile'

import HOCHeader from '../HOC/HOCHeader'
import MoneyItem from '../components/MoneyItem'

const tabs = [
	{title:"硬币"},
	{title:"纸币"}
]
const silverCoinItems = [
	{price:5,util:"50枚/卷（1角）",moneyIcon:"/images/jcoin10.png",ref:"1jiao",dataIndex:"jcoin10"},
	{price:25,util:"50枚/卷（5角）",moneyIcon:"/images/jcoin50.png",ref:"5jiao",dataIndex:"jcoin50"},
	{price:50,util:"50枚/卷（1元）",moneyIcon:"/images/jcoin100.png",ref:"1yuan",dataIndex:"jcoin100"}
]
const notesItems = [
	{price:500,util:"100张/把（5元）",moneyIcon:"/images/note5.png",ref:"5yuan",dataIndex:"note5"},
	{price:1000,util:"100张/把（10元）",moneyIcon:"/images/note10.png",ref:"10yuan",dataIndex:"note10"},
	{price:2000,util:"100张/把（20元）",moneyIcon:"/images/note20.png",ref:"20yuan",dataIndex:"note20"}
]

@HOCHeader({
	title:"预约兑换"
})
export default class Appointment extends Component {
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		count:0
	  	}
	}
	onSubmit = () => {
		let items = []
		const { history } = this.props
		const { count } = this.state
		
		for(let item of [...silverCoinItems,...notesItems]){
			let elem = this[`${item.ref}`]
			if(elem && elem.state.count > 0){
				items.push({...item,count:elem.state.count,value:elem.state.count/item.price})
			}
		}
		if(count > 0 || items.length > 0){
			history.push({
				pathname:"/settlement",
				state:{
					items,
					count
				}
			})
		}else{
			Toast.info("请选择要兑换的币种")
		}
		
	}
	onChange = () => {
		let count = 0
		for(let item of [...silverCoinItems,...notesItems]){
			let elem = this[`${item.ref}`]
			if(elem){
				count += elem.state.count
			}
		}
		this.setState({
			count
		})
	}
	render() {
		const { count } = this.state
		return (
			<div className="appointment">
				<Tabs tabs={tabs}
			      	initialPage={0}
			    >
			      	<div className="tab-wrapper">
			      		{silverCoinItems.map((item,index) => 
			      			<MoneyItem 
			      				key={index} 
			      				{...item} 
			      				ref={(ref) => this[`${item.ref}`] = ref}
			      				onChange={this.onChange.bind(this)}
			      			/>
			      		)}

			      	</div>
			      	<div className="tab-wrapper">
			      		{notesItems.map((item,index) => 
			      			<MoneyItem 
			      				key={index} 
			      				{...item} 
			      				ref={(ref) => this[`${item.ref}`] = ref}
			      				onChange={this.onChange.bind(this)}
			      			/>
			      		)}			      		
			      	</div>
			    </Tabs>
			    <div className="foo">
			    	<div className="count">
			    		合计：<span style={{color:'red'}}>￥{count.toFixed(1)}</span>
			    	</div>
			    	<div className="btn">
			    		<Button onClick={this.onSubmit.bind(this)} size="small" type="primary">结算</Button>
			    	</div>
			    </div>
			</div>
		)
	}
}