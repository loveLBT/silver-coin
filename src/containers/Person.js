import React,{ Component } from 'react'
import { List } from 'antd-mobile'
import { withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'

const Item = List.Item

@withRouter
@inject("wxstore","homestore")
@observer
export default class Person extends Component {
	render() {
		const { history, wxstore, homestore } = this.props
		const { userInfo } = wxstore

		return (
			<div className="person">
				<div className="logo">
					<img src="/images/img_icon.png" alt="logo"/>
					<p>{userInfo.organization.organizationName}</p>
				</div>
				<div className="menu-list">
					<List>
						<Item
				            thumb="/images/person_01_icon.png"
				            onClick={() => {history.push("/personInfo")}}
				            arrow="horizontal"
				        >
				          	用户信息
				        </Item>
						<Item
				            thumb="/images/person_07_icon.png"
				            onClick={() => {history.push("/authentication")}}
				            arrow="horizontal"
				        >
				          	认证信息
				        </Item>
				        <Item
				            thumb="/images/person_08_icon.png"
				            onClick={() => {history.push("/readPhoneAuth")}}
				            arrow="horizontal"
				        >
				        	<div className="list-item">
				        		调剂授权
				        		{homestore.phoneAuthCount > 0 && 
				        			<span className='dot'>{homestore.phoneAuthCount}</span>
				        		}
				        		
				        	</div>
				        </Item>
				        <Item
				        	thumb="/images/person_03_icon.png"
				            onClick={() => {history.push("/myDispensing")}}
				            arrow="horizontal"
				        >
				          	我的调剂
				        </Item>
				        <Item
				        	thumb="/images/person_04_icon.png"
				            arrow="horizontal"
				            onClick={() => {history.push("/delivery")}}
				        >
				        	开通配送
				        </Item>
				        <Item
				        	thumb="/images/person_05_icon.png"
				            arrow="horizontal"
				            onClick={() => {history.push("/addressMange")}}
				        >
				        	地址管理
				        </Item>
				        <Item
				        	thumb="/images/person_06_icon.png"
				            onClick={() => {history.push('/helpCenter')}}
				            arrow="horizontal"
				        >
				          	帮助中心
				        </Item>
			      	</List>
				</div>
			</div>
		)
	}
} 