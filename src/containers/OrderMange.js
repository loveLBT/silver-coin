import React,{ Component } from 'react'
import { Tabs, Toast } from 'antd-mobile'
import axios from 'axios'
import { inject } from 'mobx-react'

import HOCHeader from '../HOC/HOCHeader'
import ListViewBar from '../components/ListViewBar'
import OrderItem from '../components/Dispensing/Item'

const tabs = [
	{title:"已下单",state:1},
	{title:"已受理",state:2},
	{title:"已完成",state:3},
	{title:"已取消",state:4},
	{title:"已失效",state:5},
	{title:"已评价",state:6},
]

@inject("wxstore")
@HOCHeader({
	title:"订单管理",
	right:(ref) => <span style={{color:"#fff"}} onClick={ref.onHeaderRightClick.bind(this)}>预约兑换</span>
})
export default class OrderMange extends Component {
	constructor(props) {
	 	super(props)
	
	  	this.state = {
	  		tabIndexs:[0]
	  	}
	}
	onHeaderRightClick = async () => {
		const { wxstore, history } = this.props
		const { userInfo } = wxstore
		Toast.loading("请等待",0)
		const res = await axios.get(`/order/orderStatus/已完成/userId/${userInfo.id}`)
		Toast.hide()
		if(res.ErrorCode === "000000"){
			if(res.data.length > 0){
				Toast.offline(`你有${res.data.length}条工单未评价`)
			}else{
				history.push('/appointment')
			}
		}
	}
	onChangeTab = (tab,index) => {
		const { tabIndexs } = this.state 
		if(tabIndexs.indexOf(index) === -1){
			tabIndexs.push(index)
			this.setState({tabIndexs})
		}
	}
	render() {
		const { tabIndexs } = this.state
		const { wxstore, history } = this.props
		const wrapperStyle = {
			flex:1,
			display:"flex",
			flexDirection:"column"
		}

		return (
			<div className="order-mange page">
				<Tabs tabs={tabs}
				    initialPage={0}
				    onChange={this.onChangeTab.bind(this)}
			    >
			      	<div style={wrapperStyle}>
			        	{tabIndexs.indexOf(0) !== -1 && 
			    			<ListViewBar 
								getUrl="/order/page"
								params={{
									orderStatus:"已下单"
								}}
								useBodyScroll={false}
								renderRow={(rowData,sectionID, rowID) => {
									return (
										<OrderItem 
											onClick={() => {
												history.push({
													pathname:"/order/"+rowData.id,
													state:{data:rowData}
												})
											}} 
											showDispensingTypeRow={false} 
											key={rowID} 
											{...rowData}
											title={rowData.release_organization.organizationName} 
										/>
									)
								}}
							/>
			    		}
			      	</div>
			     	<div style={wrapperStyle}>
			        	{tabIndexs.indexOf(1) !== -1 && 
			    			<ListViewBar 
								getUrl="/order/page"
								params={{
									orderStatus:"已受理"
								}}
								useBodyScroll={false}
								renderRow={(rowData,sectionID, rowID) => {
									return (
										<OrderItem 
											onClick={() => {
												history.push({
													pathname:"/order/"+rowData.id,
													state:{data:rowData}
												})
											}} 
											showDispensingTypeRow={false} 
											key={rowID} 
											{...rowData} 
											title={rowData.release_organization.organizationName} 
										/>
									)
								}}
							/>
			    		}
			     	</div>
			      	<div style={wrapperStyle}>
			        	{tabIndexs.indexOf(2) !== -1 && 
			    			<ListViewBar 
								getUrl="/order/page"
								params={{
									orderStatus:"已完成"
								}}
								useBodyScroll={false}
								renderRow={(rowData,sectionID, rowID) => {
									return (
										<OrderItem 
											onClick={() => {
												history.push({
													pathname:"/order/"+rowData.id,
													state:{data:rowData}
												})
											}} 
											showDispensingTypeRow={false} 
											key={rowID} 
											{...rowData} 
											title={rowData.release_organization.organizationName} 
										/>
									)
								}}
							/>
			    		}
			     	</div>
			     	<div style={wrapperStyle}>
			        	{tabIndexs.indexOf(3) !== -1 && 
			    			<ListViewBar 
								getUrl="/order/page"
								params={{
									orderStatus:"已取消"
								}}
								useBodyScroll={false}
								renderRow={(rowData,sectionID, rowID) => {
									return (
										<OrderItem 
											onClick={() => {
												history.push({
													pathname:"/order/"+rowData.id,
													state:{data:rowData}
												})
											}} 
											showDispensingTypeRow={false} 
											key={rowID} 
											{...rowData} 
											title={rowData.release_organization.organizationName} 
										/>
									)
								}}
							/>
			    		}
			     	</div>
			     	<div style={wrapperStyle}>
			        	{tabIndexs.indexOf(4) !== -1 && 
			    			<ListViewBar 
								getUrl="/order/page"
								params={{
									orderStatus:"已失效"
								}}
								useBodyScroll={false}
								renderRow={(rowData,sectionID, rowID) => {
									return (
										<OrderItem 
											onClick={() => {
												history.push({
													pathname:"/order/"+rowData.id,
													state:{data:rowData}
												})
											}} 
											showDispensingTypeRow={false} 
											key={rowID} 
											{...rowData} 
											title={rowData.release_organization.organizationName} 
										/>
									)
								}}
							/>
			    		}
			     	</div>
			     	<div style={wrapperStyle}>
			        	{tabIndexs.indexOf(5) !== -1 && 
			    			<ListViewBar 
								getUrl="/order/page"
								params={{
									orderStatus:"已评价"
								}}
								useBodyScroll={false}
								renderRow={(rowData,sectionID, rowID) => {
									return (
										<OrderItem 
											onClick={() => {
												history.push({
													pathname:"/order/"+rowData.id,
													state:{data:rowData}
												})
											}} 
											showDispensingTypeRow={false} 
											key={rowID} 
											{...rowData} 
											title={rowData.release_organization.organizationName} 
										/>
									)
								}}
							/>
			    		}
			     	</div>
			    </Tabs>
			</div>
		)
	}
}