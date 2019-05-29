import React,{ Component } from 'react'
import { Tabs } from 'antd-mobile'
import { withRouter } from 'react-router'

import './style.css'
import ListViewBar from '../ListViewBar/'
import DispensingItem from './Item'

const tabs = [
	{title:"已发布"},
	{title:"已完成"},
	{title:"已取消"}
]

@withRouter
export default class Dispensing extends Component {
	static defaultProps = {
	 	 userType:"",
	 	 userId:""
	}
	constructor(props) {
	 	super(props)
	
	  	this.state = {
	  		tabIndexs:[0]
	  	}
	}
	onChangeTab = (tab,index) => {
		const { tabIndexs } = this.state 
		if(tabIndexs.indexOf(index) === -1){
			tabIndexs.push(index)
			this.setState({tabIndexs})
		}
	}
	onDispensingItemClick = (data) => {
		const { history } = this.props
		history.push({
			pathname:`/dispensing/${data.id}`,
			state:{
				data
			}
		})
	}
	renderTabWrap = () => {
		const { tabIndexs } = this.state
		const { userType, userId } = this.props

		return tabs.map((item,index) => {
			let listViewBarParams = {
				adjustStatus:item.title
			}
			if(userType) listViewBarParams["release_user.userType"] = userType
			if(userId) listViewBarParams["release_user.id"] = userId

			return (
				<div key={index} className="tab-wrapper">
		    		{tabIndexs.indexOf(index) !== -1 && 
		    			<ListViewBar 
							getUrl="/adjust/page"
							params={listViewBarParams}
							useBodyScroll={false}
							renderRow={(rowData,sectionID, rowID) => {
								return (
									<DispensingItem 
										onClick={this.onDispensingItemClick.bind(this,rowData)} 
										key={rowID} 
										{...rowData} 
										title={rowData.release_organization.organizationName} 
									/>
								)
							}}
						/>
		    		}
		    	</div>
			)
		})
	}
	render() {

		return (
			<div className="dispensing page">
				<Tabs 
					tabs={tabs}
			      	initialPage={0}
			      	onChange={this.onChangeTab.bind(this)}
			    >
			    	{this.renderTabWrap()}
			    </Tabs>
			</div>
		)
	}
}