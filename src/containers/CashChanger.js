import React,{ Component } from 'react'
import { inject, observer } from 'mobx-react'

import HOCHeader from '../HOC/HOCHeader'
import OrderItem from '../components/OrderItem'
import SearchBar from '../components/SearchBar'
import ListViewBar from '../components/ListViewBar'

@inject('wxstore')
@HOCHeader({
	title:'兑换机查询'
})
@observer
export default class CashChanger extends Component {
	onSubmit = (val) => {
		const { wxstore } = this.props
		const { userInfo } = wxstore
		const listViewParams = {
			lat:userInfo.lat,
			lng:userInfo.lng
		}
		if(val) {
			listViewParams.organizationName = val
		}

		this.listViewBar.store.setParams(listViewParams)
		setTimeout(() => {
		  	this.listViewBar.store.beginHeaderRefresh()
		}, 0)
	}
	onItemClick = (item) => {
		const { history } = this.props
		history.push({
			pathname:`/cashChanger/${item.id}`,
			state:{
				data:item
			}
		})
	}
	render() {
		const { wxstore } = this.props
		const { userInfo } = wxstore

		return (
			<div className="cash-changer page">
				<div className="header">
					<SearchBar 
						placeholder="请输入兑换名称"
						onSubmit={this.onSubmit.bind(this)}
					/>
					<div className="address">
						<img src="/images/point-gray.png" alt="地址图标"/>
						<span>{userInfo.addressComponents && userInfo.addressComponents.city}</span>
					</div>
				</div>
				{(userInfo.lat && userInfo.lng) && 
					<ListViewBar 
						onRef={(ref)=>this.listViewBar=ref}
						getUrl="/v1/deviceStatus/page"
						useBodyScroll={false}
						params={{
							lat:userInfo.lat,
							lng:userInfo.lng
						}}
						renderRow={(rowData,sectionID, rowID) => {
							return (
								<OrderItem 
									onClick={this.onItemClick.bind(this,rowData.deviceStatus)}
									showTitleImg={true}
									key={rowID} 
									distance={rowData.distance} 
									title={rowData.deviceStatus.device.organization.organizationName}
									address={rowData.deviceStatus.device.organization.address}
									phoneNum={rowData.deviceStatus.device.organization.phoneNum}
									data={rowData}
								/>
							)
						}}
					/>
				}
				
			</div>
		)
	}
}