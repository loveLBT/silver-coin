import React,{ Component } from 'react'

import HOCHeader from '../HOC/HOCHeader'
import ListViewBar from '../components/ListViewBar'
import FlowItem from '../components/FlowItem'

@HOCHeader({
	title:"流动兑换"
})
export default class Flow extends Component {
	render() {
		return (
			<div className="flow page">
				<ListViewBar 
					getUrl="/v1/moveExchangeInfo/page"
					useBodyScroll={false}
					renderRow={(rowData,sectionID, rowID) => {
						return (
							<FlowItem key={rowID} {...rowData} />
						)
					}}
				/>
			</div>
		)
	}
}