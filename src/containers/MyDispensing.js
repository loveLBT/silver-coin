import React,{ Component } from 'react'
import { inject } from 'mobx-react' 

import HOCHeader from '../HOC/HOCHeader'
import Dispensing from '../components/Dispensing'

@inject('wxstore')
@HOCHeader({
	title:"我的调剂",
	right:(ref) => <span onClick={() =>ref.onRelease()} style={{color:"#fff"}}>发布</span>
})
export default class MyDispensing extends Component {
	onRelease = () => {
		const { history } = this.props
		history.push('/releaseDispensing')
	}
	render() {
		const { wxstore } = this.props
		const { userInfo } = wxstore

		return (
			<Dispensing 
				userId={userInfo.id}
			/>
		)
	}
}