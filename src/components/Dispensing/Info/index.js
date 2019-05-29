import React,{ Component } from 'react'

import './style.css'

const rowData = [
	{price:5,util:"卷",moneyIcon:"/images/jcoin10.png",ref:"1jiao",dataIndex:"jcoin10",value:0},
	{price:25,util:"卷",moneyIcon:"/images/jcoin50.png",ref:"5jiao",dataIndex:"jcoin50",value:0},
	{price:50,util:"卷",moneyIcon:"/images/jcoin100.png",ref:"1yuan",dataIndex:"jcoin100",value:0},
	{price:5,util:"张",moneyIcon:"/images/note5.png",ref:"5yuan",dataIndex:"note5",value:0},
	{price:10,util:"张",moneyIcon:"/images/note10.png",ref:"10yuan",dataIndex:"note10",value:0},
	{price:20,util:"张",moneyIcon:"/images/note20.png",ref:"20yuan",dataIndex:"note20",value:0}
]
const unData = {
	coin10:0,
	coin50:0,
	coin100:0,
	note1:0,
	note50:0,
	note100:0
}

class Row extends Component {
	static defaultProps = {
	  	isMe: false,
	  	value:0,
	  	price:0
	}

	constructor(props) {
	  	super(props)
	
	 	this.state = {
	 		value:props.value
	 	}
	}
	onChange = (e) => {

		this.setState({
			value:e.target.value
		},() => {
			if(this.props.onChange){
				this.props.onChange()
			}
		})
	}
	render() {
		const { isMe, moneyIcon, price, util } = this.props
		const { value } = this.state

		return(
			<div className="row">
				<img src={moneyIcon} alt="money图标"/>
				<div className="money-num">
					<span>数量：</span>
					{isMe ? 
						<input 
							onChange={this.onChange.bind(this)} 
							placeholder="请输入数量" 
							type="number" 
							value={value}
							onFocus={() => {
								if(value === 0){
									this.setState({
										value:""
									})
								}
								
							}} 
						/>
						: 
						<span>{value}</span>
					}
					<span>{util}</span>
				</div>
				<div className="money-count">
					金额：<span style={{color:"red",fontSize:"16px"}}>￥{(value*price).toFixed(1)}</span>
				</div>
			</div>
		)
	}
}

export default class extends Component {
	static defaultProps = {
	  	isMe:false,
	  	count:0,
	  	data:{}
	}
	constructor(props) {
	  	super(props)
		let data = {...unData}
		for(let item of rowData){
			if(props.data[`${item.dataIndex}`]){
				data[`${item.dataIndex}`] = props.data[`${item.dataIndex}`]
			}else{
				data[`${item.dataIndex}`] = item.value
			}
		}

	  	this.state = {
	  		count:props.count,
	  		data:{...data}
	  	}
	}
	onChange = () => {
		let data = {}
		let count = 0
		for(let item of rowData){
			let elem = this[`${item.ref}`]
			if(elem){
				count += parseInt(elem.state.value) * elem.props.price
				data[`${item.dataIndex}`] = parseInt(elem.state.value)
			}

		}
		this.setState({
			count,
			data:{...this.state.data,...data}
		})
	}
	render() {
		const { isMe } = this.props
		const { count, data } = this.state

		return (
			<div className="dispensing-info">
				{rowData.map((item,index) => {
					if(isMe){
						return (
							<Row 
								key={index}
								{...item}
								isMe={true}
								onChange={this.onChange.bind(this)}
								ref={(ref) => this[`${item.ref}`] = ref}
								value={data[item.dataIndex]}
							/>
						)
					}else{
						if(data[item.dataIndex]){
							return (
								<Row 
									key={index}
									{...item}
									isMe={false}
									ref={(ref) => this[`${item.ref}`] = ref}
									value={data[item.dataIndex]}
								/>
							)
						}
					}
				})}
				<div className="count">
					总金额：<span style={{color:"red",fontSize:"16px"}}>￥{count.toFixed(1)}元</span>
				</div>
			</div>
		)
	}
}