import React,{ Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'

import HOCHeader from '../HOC/HOCHeader'
import DispensingInfo from '../components/Dispensing/Info'

@HOCHeader({
	title:"发布调剂"
})
export default class ReleaseDispensing extends Component {
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		adjustType: "供应" 
	  	}
	}
	onRelease = async () => {
		const { history } = this.props
		const { adjustType } = this.state
		const { count, data } = this.dispensingInfo.state
		const postData = {
			...data,
			total:count,
			adjustType
		}
		Toast.loading("正在发布",0)
		const res = await axios.post("/adjust",qs.stringify(postData))
		if(res.ErrorCode === "000000"){
			Toast.success("发布成功")
			history.goBack()
		}
	}
	render() {
		const { adjustType } = this.state

		return (
			<div className="release-dispensing">
				<p className="title">调剂类型</p>
				<div className="adjust-type">
					<div className="type">
						<span>供应</span>
						<input
							checked={adjustType === "供应"} 
							className="sc-radio" 
							type="radio"  
							name="adjustType" 
							onChange={(e) => this.setState({adjustType:"供应"})} 
							value="供应" 
						/>
					</div>
					<div className="type">
						<span>需求</span>
						<input 
							checked={adjustType === "需求"} 
							className="sc-radio" 
							type="radio" 
							name="adjustType" 
							onChange={(e) => this.setState({adjustType:"需求"})} 
							value="需求" 
						/>
					</div>
				</div>
				<p className="title">调剂类型</p>
				<DispensingInfo 
					isMe={true}
					ref={ref=>this.dispensingInfo=ref}
				/>
				<a 
					onClick={this.onRelease.bind(this)} 
					href="javascript:;" 
					className="submit-btn"
				>
					发布
				</a>
			</div>
		)
	}
}