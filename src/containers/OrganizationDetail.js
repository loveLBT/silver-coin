import React,{ Component } from 'react'

import HOCHeader from '../HOC/HOCHeader'
import QQMap from '../components/QQMap'
import DoubleRowTable from '../components/DoubleRowTable'

@HOCHeader({
	title:"机构详情"
})
export default class OrganizationDetail extends Component {
	render(){
		const { location } = this.props
		const { data } = location.state

		return (
			<div className="cash-changer-detail page">
				<div className="info">
					<span>所属机构：{data.organizationName}</span>
					<span>机构地址：{data.address}</span>
					<span>联系我们：{data.phoneNum}</span>
				</div>
				<div style={{flex:1,marginBottom:"15px"}} className="map">
					<QQMap 
						lat={data.lat}
						lng={data.lng}
						onRef={(ref)=>this.map=ref} 
					/>
				</div>
			</div>
		)
	}
}