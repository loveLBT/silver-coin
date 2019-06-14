import React,{ Component, Fragment } from 'react'
import { inject } from 'mobx-react'
import axios from 'axios'
import qs from 'qs'
import { Toast, Modal } from 'antd-mobile'

import HOCHeader from '../HOC/HOCHeader'
import DispensingInfo from '../components/Dispensing/Info'
import { EncryptionPhone } from '../util/common'

const alert = Modal.alert

@inject('wxstore')
@HOCHeader({
	title:"调剂详情"
})
export default class DispensingDetail extends Component {
	constructor(props) {
	  	super(props)
		const { location, wxstore } = props
		const { userInfo } = wxstore
		const { data = {} } = location.state

	  	this.state = {
	  		isMe: data.release_organization.id === userInfo.organization.id,
	  		isEdit: data.release_organization.id === userInfo.organization.id && data.adjustStatus === "已发布"
	  	}
	}
	onEdit = async () => {
		const { state } = this.props.location
		const { count, data } = this.dispensingInfo.state
		const postData = {
			id: state.data.id,
			...data,
			total:count,
		}

		Toast.loading("正在修改",0)
		const res = await axios.put("/adjust",qs.stringify(postData))
		if(res.ErrorCode === "000000"){
			Toast.success("修改成功")
		}
	}
	onCancelConfirm = () => {
		alert(
			"提示",
			"确认取消该条调剂吗？",
			[
				{text:"取消"},
				{text:"确认",onPress:() => this.onCancenl()}
			]
		)
	}
	onCancenl = async () => {
		const { state } = this.props.location
		const postData = {
			id: state.data.id
		}

		Toast.loading("正在取消",0)
		const res = await axios.put("/adjust/release/cancel",qs.stringify(postData))
		if(res.ErrorCode === "000000"){
			Toast.success("取消成功")
			this.setState({
				isEdit:false
			})
		}
	}
	onFinishConfirm = () => {
		alert(
			"提示",
			"确认完成该条调剂吗？",
			[
				{text:"取消"},
				{text:"确认",onPress:() => this.onFinish()}
			]
		)
	}
	onFinish = async () => {
		const { state } = this.props.location
		const postData = {
			id: state.data.id
		}

		Toast.loading("正在操作",0)
		const res = await axios.put("/adjust/complete",qs.stringify(postData))
		if(res.ErrorCode === "000000"){
			Toast.success("已完成")
			this.setState({
				isEdit:false
			})
		}
	}
	onReadPhone = async () => {
		const { state } = this.props.location
		const postData = {
			adjustId: state.data.id
		}

		Toast.loading('正在请求', 0)
		const res = await axios.get("/adjustAuthorize/check",{params:{...postData}})
		if(res.ErrorCode === "000000") {
			Toast.success('请求成功')
		}
	}
	render() {
		const { wxstore, location } = this.props
		const { data = {} } = location.state
		const { isMe, isEdit } = this.state

		return (
			<div className="dispensing-detail">
				<div className="user-info">
					<div className="row">
						<span className="label">
							发起机构：
						</span>
						<span className="value">
							{data.release_organization.organizationName}
						</span>
					</div>
					<div className="row">
						<span className="label">
							联&ensp;系&ensp;人：
						</span>
						<span className="value">
							{data.release_organization.contactUser}
						</span>
					</div>
					<div className="row">
						<span className="label">
							联系电话：
						</span>
						<span className="value">
							{isMe ? data.release_organization.phoneNum : EncryptionPhone(data.release_organization.phoneNum)}
						</span>
						{!isMe && 
							<span onClick={this.onReadPhone.bind(this)} className="right">
								查看
							</span>
						}
					</div>
					<div className="row">
						<span className="label">
							联系地址：
						</span>
						<span className="value">
							{data.release_organization.address}
						</span>
					</div>
					<div className="row">
						<span className="label">
							调剂类型：
						</span>
						<span className="value">
							{data.adjustType}
						</span>
					</div>
				</div>
				<Fragment>
					<DispensingInfo 
						count={data.total}
						isMe={isEdit}
						data={data}
						ref={ref=>this.dispensingInfo=ref}
					/>
				</Fragment>
				{isEdit && 
					<div className="action">
						<a onClick={this.onEdit.bind(this)} href="javascript:;" className="btn">
						 	<img src="/images/action_btn_edit_icon.png" alt="按钮图标"/>
							<span>修改</span>
						</a>
						<a onClick={this.onCancelConfirm.bind(this)} href="javascript:;" className="btn">
						 	<img src="/images/action_btn_cancel_icon.png" alt="按钮图标"/>
							<span>取消</span>
						</a>
						<a onClick={this.onFinishConfirm.bind(this)} href="javascript:;" className="btn">
						 	<img src="/images/action_btn_check_icon.png" alt="按钮图标"/>
							<span>完成</span>
						</a>
					</div>
				}
				
			</div>
		)
	}
}

