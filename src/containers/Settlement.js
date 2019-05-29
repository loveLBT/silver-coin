import React,{ Component } from 'react'
import { List } from 'antd-mobile'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import { inject } from 'mobx-react'
import qs from 'qs'

import HOCHeader from '../HOC/HOCHeader'
import SettlementItem from '../components/SettlementItem'

const Item = List.Item
const unData = {
	coin10:0,
	coin50:0,
	coin100:0,
	jcoin10:0,
	jcoin50:0,
	jcoin100:0,
	note1:0,
	note50:0,
	note100:0,
	note5:0,
	note10:0,
	note20:0
}

@inject("wxstore")
@HOCHeader({
	title:"确认订单"
})
export default class Settlement extends Component {
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		address:{},
	  		takeWay:"自行上门"
	  	}
	}
	componentDidMount() {
		this.getDefaultAddress()
	}
	getDefaultAddress = async () => {
		Toast.loading("正在加载数据")
		const res = await axios.get("/address/default")
		if(res.ErrorCode === "000000" && res.data){
			this.setState({
				address:res.data
			})
		}
	}
	onSubmit = async () => {
		const { location, history } = this.props
		const { takeWay, address } = this.state
		let postData = {
			...unData,
			takeWay,
			total:location.state.count
		}
		if(address.id){
			postData.addressId = address.id
			for(let item of location.state.items){
				if(item.value){
					if(item.dataIndex.indexOf("note") !== -1){
						postData[`${item.dataIndex}`] = item.value * 100
					}else{
						postData[`${item.dataIndex}`] = item.value
					}
					
				}
			}
			Toast.loading("请等待",0)
			const res = await axios.post("/order",qs.stringify(postData))
			if(res.ErrorCode === "000000"){
				Toast.hide()
				history.replace("/orderMange")
			}
		}else {
			Toast.info("请选择一个默认地址")
		}
	}
	render() {
		const { address, takeWay } = this.state
		const { location, wxstore, history } = this.props
		const { userInfo } = wxstore
		const { organization={} } = userInfo

		return (
			<div className="settlement">
				<div className="count">
					应付金额：<span style={{color:'red',fontSize:'12px'}}>￥</span><span style={{color:"red"}}>{location.state.count}</span>
				</div>
				{organization.book === 0 && 
					<div className="commodity-info">
						<p className="title">提取方式</p>
						<div className="adjust-type">
							<div className="type">
								<span>自行上门</span>
								<input
									checked={takeWay === "自行上门"} 
									className="sc-radio" 
									type="radio"  
									name="takeWay" 
									onChange={(e) => this.setState({takeWay:"自行上门"})} 
									value="自行上门" 
								/>
							</div>
							<div className="type">
								<span>机构配送</span>
								<input 
									checked={takeWay === "机构配送"} 
									className="sc-radio" 
									type="radio" 
									name="takeWay" 
									onChange={(e) => this.setState({takeWay:"机构配送"})} 
									value="机构配送" 
								/>
							</div>
						</div>
					</div>
				}
				
				<div className="commodity-info">
					<div className="title">商品信息</div>
					<div className="commodity-list">
						{location.state.items.map((item,index) => 
							<SettlementItem {...item} key={index} />
						)}
					</div>
				</div>
				<div className="receiving-goods-info">
					<div className="title">
						<span>收货信息</span>
						<span onClick={() => history.push("/addressMange")} style={{color:"#6a94ff"}}>导入地址</span>
					</div>
					<List className="list-bar">
						<Item>
							<div className="list-item">
								<span className="label">收货人：</span>
								<span className="value">{address.username}</span>
							</div>
						</Item>
						<Item>
							<div className="list-item">
								<span className="label">联系电话：</span>
								<span className="value">{address.phone}</span>
							</div>
						</Item>
						<Item>
							<div className="list-item">
								<span className="label">收获地址：</span>
								<span className="value">{address.addr}</span>
							</div>
						</Item>
					</List>
				</div>
				<a onClick={this.onSubmit.bind(this)} href="javascript:;" className="submit-btn">
					提交订单
				</a>
			</div>
		)
	}
}