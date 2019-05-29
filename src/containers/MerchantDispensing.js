import React,{ Component } from 'react'

import HOCHeader from '../HOC/HOCHeader'
import Dispensing from '../components/Dispensing'

@HOCHeader({
	title:"商户调剂",
	right:(ref) => <span onClick={() =>ref.onRelease()} style={{color:"#fff"}}>发布</span>
})
export default class MerchantDispensing extends Component {
	onRelease = () => {
		const { history } = this.props
		history.push('/releaseDispensing')
	}
	render() {
		return (
			<Dispensing 
				userType="商家用户"
			/>
		)
	}
}