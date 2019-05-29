import React,{ Component, Fragment } from 'react'
import { List, InputItem, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import axios from 'axios'
import { inject } from 'mobx-react'
import qs from 'qs'

import HOCHeader from '../HOC/HOCHeader'
import ChooseAddress from './ChooseAddress'
const Item = List.Item

@createForm()
@inject('wxstore')
@HOCHeader({
	title:(ref) => ref._rederHeaderTitle(),
	onBack:(ref) => ref._onHeaderBack()
})
export default class Authentication extends Component {
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		viewPage:1
	  	}
	}
	componentDidMount() {
		const { wxstore, form } = this.props
		const { userInfo } = wxstore
		const { organization } = userInfo
		if(organization){
			let addressData = {
				address: organization.address,
				province: organization.province,
				city: organization.city,
				district: organization.district,
				lat: organization.lat,
				lng: organization.lng
			}
			form.setFieldsValue({
				address:addressData
			})
		}
	}
	_rederHeaderTitle() {
		const { viewPage } = this.state
		if(viewPage === 1){
			return <span>认证信息</span>
		}else if(viewPage === 2){
			return <span>选择地址</span>
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
	_onChooseAddress() {
		this.setState({
			viewPage: 2
		})
	}
	_onAddressConfirm(data) {
		const { form } = this.props
		form.setFieldsValue({
			address:data
		})
		this._onHeaderBack()
	}
	_onSubmit() {
		const { wxstore, form } = this.props
		const { validateFields } = form

		validateFields(async (err,values) => {
			if(!err){
				let data = {}
				for(let key in values) {
					if(values[key]){
						if(key === "address") {
							data.address = values[key].address
							data.province = values[key].addressComponents.province
							data.city = values[key].addressComponents.city
							data.district = values[key].addressComponents.district
							data.lat = values[key].location.lat
							data.lng = values[key].location.lng
						}else{
							data[key] = values[key]//.replace(/\s*/g,"")
						}
					}
				}
				Toast.loading("正在处理",0)
				const res = await axios.post('/organization/authentication',qs.stringify(data))
				if(res.ErrorCode === "000000"){
					Toast.success("认证成功")
					wxstore.setUserInfoStorage({organization:data,userType:"商家用户"})
				}
			}else{
				for(let key in err){
					if(key){
						Toast.info(err[key].errors[0].message)
						break 
					}
					
				}
			}
		})
	}

	render() {
		const { form, wxstore } = this.props
		const { getFieldProps, getFieldValue } = form
		const { viewPage } = this.state
		const { userInfo } = wxstore
		const { organization = {} } = userInfo

		return (
			<Fragment>
				<div style={viewPage === 1 ? {display:"block"} : {display:"none"}} className="authentication">
					<List>
						<InputItem
				            {...getFieldProps('organizationCode', {
				              initialValue: organization.organizationCode || "",
				              rules: [{required:true,message:"请输入机构代码"}]
				            })}
				            type="number"
				            placeholder="请输入机构代码"
				        >
				        	机构代码
				        </InputItem>
				        <InputItem
				            {...getFieldProps('organizationName', {
				            	initialValue: organization.organizationName || "",
				            	rules: [{required:true,message:"请输入机构名称"}]
				            })}
				            type="text"
				            placeholder="请输入机构名称"
				        >
				          	机构名称
				        </InputItem>
				        <InputItem
				            {...getFieldProps('shortName', {
				            	initialValue: organization.shortName || "",
				            })}
				            type="text"
				            placeholder="请输入机构简称"
				        >
			          		机构简称
				        </InputItem>
			          	<Item
				        	arrow="horizontal"
				        	onClick={this._onChooseAddress.bind(this)}
				        	 {...getFieldProps('address', {
				            	initialValue: organization.address || "",
				            	rules: [{required:true,message:"请选择详细地址"}]
				            })}
				        >
				        	<div className="horizontal-item">
				        		<div className="label">详细地址</div>
				        		
				        		{getFieldValue("address") ? 
				        			<div className="value">{getFieldValue("address").address}</div> :
				        			<div className="placehodler">请选择详细地址</div>
				        		}
				        	</div>
				        </Item>
			          	<InputItem
				            {...getFieldProps('postCode', {
				            	initialValue: organization.postCode || "",
				            })}
				            type="number"
				            placeholder="请输入邮编"
			          	>
			          		邮编
			          	</InputItem>
			          	<InputItem
				            {...getFieldProps('email', {
				            	initialValue: organization.email || ""
				            })}
				            type="text"
				            placeholder="请输入邮箱"
			          	>
			          		邮箱
			          	</InputItem>
			          	<InputItem
				            {...getFieldProps('contactUser', {
				            	initialValue: organization.contactUser || "",
				            	rules:[{required:true,message:"请输入联系人"}]
				            })}
				            type="text"
				            placeholder="请输入联系人"
			          	>
			          		联系人
			          	</InputItem>
			          	<InputItem
				            {...getFieldProps('phoneNum', {
				            	initialValue: organization.phoneNum || "",
				            	rules:[{required:true,message:"请输入联系电话"}]
				            })}
				            type="phone"
				            placeholder="请输入联系电话"
			          	>
			          		联系电话
			          	</InputItem>
			          	<InputItem
				            {...getFieldProps('accountNum', {
				            	initialValue: organization.accountNum || "",
				            	rules:[{required:true,message:"请输入银行卡号"}]
				            })}
				            type="bankCard"
				            placeholder="请输入银行卡号"
			          	>
			          		银行卡号
			          	</InputItem>
			          	<InputItem
				            {...getFieldProps('businessLicenceNum', {
				            	initialValue: organization.businessLicenceNum || "",
				            	rules:[{required:true,message:"请输入营业执照号"}]
				            })}
				            type="text"
				            placeholder="请输入营业执照号"
			          	>
			          		营业执照号
			          	</InputItem>
			          	<InputItem
				            {...getFieldProps('remark', {
				            	initialValue: organization.remark || "",
				            })}
				            type="text"
				            placeholder="请输入备注"

			          	>
			          		备注
			          	</InputItem>
					</List>
					<a onClick={this._onSubmit.bind(this)} href="javascript:;" className="submit-btn">
						提交资料
					</a>
				</div>
				<ChooseAddress 
					lat={organization.lat}
					lng={organization.lng}
					addressName={organization.address}
					style={viewPage === 2 ? {display:"block"} : {display:"none"}} 
					onConfirm={this._onAddressConfirm.bind(this)}
				/>
			</Fragment>
		)
	}
}