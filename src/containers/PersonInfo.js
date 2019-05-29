import React,{ Component } from 'react'
import { List, InputItem, Toast } from 'antd-mobile'
import { inject } from 'mobx-react'
import { createForm } from 'rc-form'
import axios from 'axios'
import qs from 'qs'

import HOCHeader from '../HOC/HOCHeader'

@createForm()
@inject("wxstore")
@HOCHeader({
	title:"个人中心",
	right:(ref) => <span onClick={() =>ref.onSubmit()} style={{color:"#fff"}}>完成</span>
})
export default class PersonInfo extends Component {
	onSubmit = () => {
		const { wxstore, form } = this.props
		const { validateFields } = form
		const { userInfo } = wxstore
		validateFields(async (err,values) => {
			if(!err){
				let data = {}
				for(let key in values) {
					if(values[key]){
						data[key] = values[key].replace(/\s*/g,"")
					}
					
				}
				data.id = userInfo.id

				Toast.loading("正在处理",0)
				const res = await axios.put('/user',qs.stringify(data))
				if(res.ErrorCode === "000000"){
					Toast.success("修改成功")
					wxstore.setUserInfoStorage(data)
				}
			}
		})
	}
	render() {
		const { form, wxstore } = this.props
		const { getFieldProps } = form
		const { userInfo } = wxstore

		return (
			<div className="person-info">
				<List>
					<InputItem
			            {...getFieldProps('username', {
			              initialValue: userInfo.username || ""
			            })}
			            type="text"
			            placeholder="请输入用户名"
			        >
			        	用户名
			        </InputItem>
			        <InputItem
			            {...getFieldProps('mobileNum', {
			            	initialValue: userInfo.mobileNum || ""
			            })}
			            type="phone"
			            placeholder="请输入手机号码"
			        >
			          	手机号码
			        </InputItem>
		          	<InputItem
			            {...getFieldProps('email', {
			            	initialValue: userInfo.email || ""
			            })}
			            type="text"
			            placeholder="请输入邮箱"
		          	>
		          		邮箱
		          	</InputItem>
		          	<InputItem
			            {...getFieldProps('postCode', {
			            	initialValue: userInfo.postCode || ""
			            })}
			            type="number"
			            placeholder="请输入邮编"
		          	>
		          		邮编
		          	</InputItem>
		          	<InputItem
			            {...getFieldProps('phoneNum', {
			            	initialValue: userInfo.phoneNum || ""
			            })}
			            type="number"
			            placeholder="请输入联系电话"
		          	>
		          		联系电话
		          	</InputItem>
		          	<InputItem
			            {...getFieldProps('address', {
			            	initialValue: userInfo.address || ""
			            })}
			            type="text"
			            placeholder="请输入地址"
		          	>
		          		地址
		          	</InputItem>
		          	<InputItem
			            {...getFieldProps('faxNo', {
			            	initialValue: userInfo.faxNo
			            })}
			            type="number"
			            placeholder="请输入传真"
		          	>
		          		传真
		          	</InputItem>
				</List>
			</div>
		)
	}
}