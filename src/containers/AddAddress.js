import React,{ Component, Fragment } from 'react'
import { Toast } from 'antd-mobile'
import axios from 'axios'
import qs from 'qs'

import AddressForm from '../components/AddressForm'

export default class AddAddress extends Component {
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
		Toast.loading("正在提交",0)
		const res = await axios.post("/address",qs.stringify(data))
		if(res.ErrorCode === "000000"){
			Toast.success("提交成功")
			history.goBack()
		}
	}
	render() {
		return(
			<Fragment>
				<AddressForm 
					onRef={ref=>this.addressForm=ref}
					onSubmit={this.onSubmit.bind(this)}
					headerTitle="添加地址"
				>
					<a 
						onClick={() => {
							this.addressForm.onCheckForm()
						}} 
						href="javascript:;" 
						className="submit-btn"
					>
						提交
					</a>
				</AddressForm>
				
			</Fragment>
		)
	}
}