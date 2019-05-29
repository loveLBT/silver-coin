import React,{ Component, Fragment } from 'react'
import { List, InputItem, Toast } from 'antd-mobile'
import axios from 'axios'
import qs from 'qs'

import AdressForm from '../components/AddressForm'

export default class AddressEdit extends Component {
	onSubmit = async (values) => {
		const { history } = this.props
		let data = {}

		for(let key in values) {
			if(values[key]){
				if(key === "address") {
					data.addr = values[key].address
					data.province = values[key].addressComponents.province
					data.city = values[key].addressComponents.city
					data.district = values[key].addressComponents.district
					data.lat = values[key].location.lat
					data.lng = values[key].location.lng
				}else{
					data[key] = values[key]
				}
			}
		}
		Toast.loading("正在保存",0)
		const res = await axios.put("/address",qs.stringify(data))
		if(res.ErrorCode === "000000"){
			Toast.success("保存成功")
			history.goBack()
		}
	}
	onDefaultAddress = async () => {
		const { location } = this.props

		Toast.loading("正在操作",0)
		const res = await axios.put(`/address/default/${location.state.data.id}`)
		if(res.ErrorCode === "000000"){
			Toast.success("设置成功")
		}
	}
	onRemoveAddress = async () => {
		const { location, history } = this.props

		Toast.loading("正在操作",0)
		const res = await axios.delete(`/address?id=${location.state.data.id}`)
		if(res.ErrorCode === "000000"){
			Toast.success("删除成功")
			history.goBack()
		}
	}
	renderHeaderRight = () => {
		return (
			<span 
				onClick={() => {this.addressForm.onCheckForm()}} 
				style={{color:"#fff"}}
			>
				保存
			</span>
		)
	}
	render() {
		const { location } = this.props
		const { data = {} } = location.state
		return (
			<Fragment>
				<AdressForm 
					onRef={(ref)=>this.addressForm=ref}
					onSubmit={this.onSubmit.bind(this)}
					renderHeaderRight={this.renderHeaderRight.bind(this)}
					headerTitle="编辑地址"
					data={data}
				>
					<a 
						style={{marginBottom:"10px",marginTop:"20px"}}
						className="btn-default btn-edit"
						href="javascript:;" 
						onClick={this.onDefaultAddress.bind(this)}
					>
						设为默认
					</a>
					<a 
						className="btn-default btn-remove"
						href="javascript:;" 
						onClick={this.onRemoveAddress.bind(this)}
					>
						删除收获地址
					</a>
				</AdressForm>
			</Fragment>
		)
	}
}