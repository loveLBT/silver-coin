import React,{ Component } from 'react'
import { Button } from 'antd-mobile'
import { inject } from 'mobx-react'

import HOCHeader from '../HOC/HOCHeader'
import QQMap from '../components/QQMap'

@inject("wxstore")
export default class ChooseAddress extends Component {
	static defaultProps = {
	  	lat:0,
	  	lng:0, 
	  	addressName:""
	}
	constructor(props) {
	  	super(props)
	  	const { userInfo } = props.wxstore
	  	const { addressComponents={} } = userInfo
	  	this.state = {
	  		data: {
	  			lat:props.lat || userInfo.lat,
	  			lng:props.lng || userInfo.lng,
	  			address: props.addressName || userInfo.address,
	  			addressComponents:userInfo.addressComponents || {},
	  			location:userInfo.location || {}
	  		}
	  	}
	}
	onSearch = (e) => {
		const elem = this.searchInput
		const value = elem.value
		this.map.geocoder.getLocation(value)
	}
	onConfirm = () => {
		const { data } = this.state
		const { onConfirm } = this.props
		if(onConfirm){
			onConfirm(data)
		}
	}
	onGeocoder = (result) => {
		this.setState({
			data:result.detail
		})
	}
	render() {
		const { data } = this.state
		const { style } = this.props

		return (
			<div style={style} className="choose-address page">
				<div className="search">
					<input 
						type="text" 
						placeholder="请输入地址"
						ref={(ref)=>this.searchInput=ref}
						defaultValue={data.address}
					/>
					<a 
						href="javascript:;"
						onClick={this.onSearch.bind(this)}
						className="btn-small"
						style={{marginLeft:"10px"}}
					>
						搜索
					</a>
				</div>
				<QQMap 
					lat={data.lat}
					lng={data.lng}
					onRef={(ref)=>this.map=ref} 
					onGeocoder={this.onGeocoder.bind(this)}
				/>
				<div className="confirm">
					<span>{data.address}</span>
					<a 
						href="javascript:;"
						onClick={this.onConfirm.bind(this)}
						className="btn-small"
						style={{marginLeft:"10px"}}
					>
						确定
					</a>
				</div>
			</div>
		)
	}
}