import React,{ Component, Fragment } from 'react'
import { Modal, Toast, List, DatePicker } from 'antd-mobile'
import axios from 'axios'
import { inject } from 'mobx-react'
import qs from 'qs'
import { toJS } from 'mobx'

import HOCHeader from '../HOC/HOCHeader'
import DispensingInfo from '../components/Dispensing/Info'
import Evaluate from './Evaluate'

const alert = Modal.alert
const Item = List.Item
const DataPickerChildren = ({extra, onClick, children}) => (
	<a style={{width:"130px",height:"50px"}} onClick={onClick} href="javascript:;" className="btn">
	 	<img src="/images/action_btn_time_icon.png" alt="按钮图标"/>
		<span>修改时间</span>
	</a>
)
class HeaderRight extends Component {
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		hour:0,
	  		minute:0,
	  		second:0
	  	}
	}
	componentWillMount = () => {
		const param = this.props
		
		if(param.orderStatus === "已受理") {
			this.CountDown(param.deadline)
		}
	}
	componentWillUnmount() {
		if(this.timer){
			clearInterval(this.timer)
		}
	}
	CountDown = (time) => {
		let end_time = new Date(time).getTime()
		let sys_second =  end_time - new Date().getTime()
		this.timer = setInterval(() => {
		  	if(sys_second > 1000) {
		  		sys_second -= 1000
		  		let hour = Math.floor((sys_second / 1000 / 3600))
		  		let minute = Math.floor((sys_second / 1000 / 60) % 60)
		  		let second = Math.floor(sys_second / 1000 % 60)

		  		this.setState({
		  			hour: hour < 10 ? "0"+hour : hour,
		  			minute: minute < 10 ? "0" + minute : minute,
		  			second: second < 10 ? "0" + second : second
		  		})
		  	}else{
		  		clearInterval(this.timer)
		  	}
		}, 1000)
	}
	render() {
		const param = this.props
		const { hour, minute, second } = this.state
		if(param.orderStatus === "已受理" && parseInt(hour) && parseInt(minute) && parseInt(second)){
			return (
				<span style={{color:"#fff"}}>{hour}:{minute}:{second}</span>
			)
		}else{
			return null
		}
	}
}

@inject("wxstore")
@HOCHeader({
	title:(ref) => ref._rederHeaderTitle(),
	onBack:(ref) => ref._onHeaderBack(),
	right:(that) => {
		const { orderStatus } = that.state
		const { location } = that.props
		return (
			<HeaderRight 
				orderStatus={orderStatus} 
				deadline={location.state.data.deadline} 
				ref={ref=>that.right=ref}
			/>
		)
	}
})
export default class OrderDetail extends Component {
	constructor(props) {
	  	super(props)
	  	const { location, wxstore } = props
		const { userInfo } = wxstore
		const { data } = location.state
	  	this.state = {
	  		address:{},
	  		isMe: data.release_organization.id === userInfo.organization.id,
	  		orderStatus:data.orderStatus,
	  		time:new Date(),
	  		viewPage:1
	  	}
	}
	componentDidMount() {
		this.getDefaultAddress()
	}
	_rederHeaderTitle() {
		const { viewPage } = this.state
		if(viewPage === 1){
			return <span>订单详情</span>
		}else if(viewPage === 2){
			return <span>评价</span>
		}
	}
	_onHeaderBack() {
		const { viewPage } = this.state
		const { history } = this.props
		if(viewPage === 1) {
			history.goBack()
		}else if(viewPage === 2){
			this.setState({
				viewPage:1
			})
		}
	}
	getDefaultAddress = async () => {
		Toast.loading("正在加载数据",0)
		const res = await axios.get("/address/default")
		if(res.ErrorCode === "000000"){
			this.setState({
				address:res.data
			})
		}
		Toast.hide()
	}
	onEdit = async () => {
		const { address } = this.state
		const { location } = this.props
		const { count, data } = this.dispensingInfo.state
		const postData = {
			id:location.state.data.id,
			...data,
			total:count,
			addressId:address.id
		}

		Toast.loading("正在修改",0)
		const res = await axios.put("/order",qs.stringify(postData))
		if(res.ErrorCode === "000000"){
			Toast.success("修改成功")
		}
	}
	onCancenl = async () => {
		const { isMe } = this.state
		const { location } = this.props
		let api = ""
		if(isMe) {
			api="/order/release/cancel"
		}else {
		 	api="/order/receive/cancel"
		}

		const postData = {
			id:location.state.data.id,
		}
		Toast.loading("正在取消",0)
		const res = await axios.put(api,qs.stringify(postData))
		if(res.ErrorCode === "000000"){
			Toast.success("已取消")
			this.setState({
				orderStatus:"已取消"
			})
		}
	}
	onCancelConfirm = () => {
		alert(
			"提示",
			"确认取消该条工单吗？",
			[
				{text:"取消"},
				{text:"确认",onPress:() => this.onCancenl()}
			]
		)
	}
	onFinish = async () => {
		const { location } = this.props
		const postData = {
			id:location.state.data.id,
		}

		Toast.loading("正在操作",0)
		const res = await axios.put("/order/complete",qs.stringify(postData))
		if(res.ErrorCode === "000000"){
			Toast.success("已完成")
			this.setState({
				orderStatus:"已完成"
			})
		}
	}
	onFinishConfirm = () => {
		alert(
			"提示",
			"确认取消该条工单吗？",
			[
				{text:"取消"},
				{text:"确认",onPress:() => this.onFinish()}
			]
		)
	}

	onEvaluate = (fn) => {
		this.setState({
			viewPage:2
		})
	}
	onEvaluateSaveOK = () => {
		this.setState({
			viewPage:1,
			orderStatus:"已评价"
		})
	}
	onAcceptance = async () => {
		const { location } = this.props
		const postData = {
			id:location.state.data.id,
		}

		Toast.loading("正在操作",0)
		const res = await axios.put("/order/receive",qs.stringify(postData))
		if(res.ErrorCode === "000000"){
			Toast.success("受理成功")
			this.setState({orderStatus:"已受理"})
			this.right.CountDown(Date.now()+3600*3*1000)
		}
	}
	onDeadLineChange = async (date) => {
		const that = this
		const { location } = this.props
		const postData = {
			id:location.state.data.id,
			deadline:date.getTime()
		}
		Toast.loading("正在操作",0)
		const res = await axios.put("/order/deadline",qs.stringify(postData))
		if(res.ErrorCode === "000000"){
			Toast.success("修改成功")
			if(this.right.timer){
				clearInterval(this.right.timer)
			}
			this.setState({
				time:date
			})
			setTimeout(() => {
				that.rights.CountDown(date)
			},0)
		}
	}	
	render() {
		const { location, history } = this.props
		const { address={}, isMe, orderStatus, time, viewPage } = this.state
		const { data } = location.state

		if(viewPage === 1) {
			return (
				<div className="order-detail settlement">
					<div className="count" style={{marginBottom:"10px"}}>
						订单编号：{data.orderNum}
					</div>
					<Fragment>
						<DispensingInfo 
							count={data.total}
							isMe={isMe && ["已下单"].indexOf(orderStatus) !== -1}
							data={data}
							ref={ref=>this.dispensingInfo=ref}
						/>
					</Fragment>
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
					{(["已下单","已受理"].indexOf(orderStatus) !== -1 || (["已完成"].indexOf(orderStatus) !== -1 && isMe)) &&
						<div className="action">
							{(["已下单"].indexOf(orderStatus) !== -1 && isMe) &&
								<a onClick={this.onEdit.bind(this)} href="javascript:;" className="btn">
								 	<img src="/images/action_btn_edit_icon.png" alt="按钮图标"/>
									<span>修改</span>
								</a>
							}
							{["已下单","已受理"].indexOf(orderStatus) !== -1 && 
								<a onClick={this.onCancelConfirm.bind(this)} href="javascript:;" className="btn">
								 	<img src="/images/action_btn_cancel_icon.png" alt="按钮图标"/>
									<span>取消</span>
								</a>
							}
							{(["已受理"].indexOf(orderStatus) !== -1 && isMe) &&
								<a onClick={this.onFinishConfirm.bind(this)} href="javascript:;" className="btn">
								 	<img src="/images/action_btn_check_icon.png" alt="按钮图标"/>
									<span>完成</span>
								</a>
							}
							{(["已完成"].indexOf(orderStatus) !== -1 && isMe) &&
								<a onClick={this.onEvaluate.bind(this)} href="javascript:;" className="btn">
								 	<img src="/images/action_btn_evaluate_icon.png" alt="按钮图标"/>
									<span>评价</span>
								</a>
							}
							{(["已下单"].indexOf(orderStatus) !== -1 && !isMe) && 
								<a onClick={this.onAcceptance.bind(this)} href="javascript:;" className="btn">
								 	<img src="/images/action_btn_accept_icon.png" alt="按钮图标"/>
									<span>受理</span>
								</a>
							}
							{(["已受理"].indexOf(orderStatus) !== -1 && !isMe) &&
								<DatePicker
	          						format="YYYY-MM-DD HH:mm"
	          						value={time}
	          						minDate={new Date()}
									onChange={this.onDeadLineChange.bind(this)}
								>
									<DataPickerChildren />
								</DatePicker>
								
							}
						</div>
					}
				</div>
			)
		}else if(viewPage === 2) {
			return (
				<Evaluate id={data.id} saveOK={this.onEvaluateSaveOK.bind(this)} />
			)
		}
	}
}