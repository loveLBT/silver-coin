import React,{ Component } from 'react'

import HOCHeader from '../HOC/HOCHeader'
import QQMap from '../components/QQMap'
import DoubleRowTable from '../components/DoubleRowTable'

const doubleRowData = [
	[
		{title:"1元（枚）",key:"cashDispenserCoin100"},
		{title:"5角（枚）",key:"cashDispenserCoin50"},
		{title:"1角（枚）",key:"cashDispenserCoin10"}
	],
	[
		{title:"1元（卷）",key:"cashDispenserJcoin100"},
		{title:"5角（卷）",key:"cashDispenserJcoin50"},
		{title:"1角（卷）",key:"cashDispenserJcoin10"}
	],
	[
		{title:"1元（张）",key:"cashDispenser1"},
		{title:"5元（张）",key:"cashDispenser5"},
		{title:"10元（张）",key:"cashDispenser10"}
	],
	[
		{title:"20元（张）",key:"cashDispenser20"},
		{title:"50元（张）",key:"cashDispenser50"},
		{title:"100元（张）",key:"cashDispenser100"}
	]
]

@HOCHeader({
	title:"兑换机详细"
})
export default class CashChangerDetail extends Component {
	render(){
		const { location } = this.props
		const { data } = location.state

		return (
			<div className="cash-changer-detail">
				<div className="info">
					<span>所属机构：{data.device.organization.organizationName}</span>
					<span>安装地址：{data.device.organization.address}</span>
					<span>设备型号：{data.device.deviceType}</span>
					<span>设&ensp;备&ensp;名：{data.device.deviceName}</span>
					<span>联系我们：{data.device.deviceManager.mobileNo}</span>
				</div>
				<div className="map">
					<QQMap 
						lat={data.device.lat}
						lng={data.device.lng}
						onRef={(ref)=>this.map=ref} 
					/>
				</div>
				<div className="table-list">
					{doubleRowData.map((item,index) => 
						<DoubleRowTable 
							key={index}
							style={{marginTop:"10px"}}
							columns={item}
							data={data}
						/>
					)}
				</div>
			</div>
		)
	}
}