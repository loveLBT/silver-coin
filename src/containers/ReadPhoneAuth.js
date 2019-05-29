import React,{ Component } from 'react'
import { Tabs, Toast } from 'antd-mobile'
import moment from 'moment'
import axios from 'axios'
import qs from 'qs'

import HOCHeader from '../HOC/HOCHeader'
import ListViewBar from '../components/ListViewBar'
const tabs = [
	{title:"已授权"},
	{title:"未授权"},
	{title:"已拒绝"}
]

class ListItem extends Component {
	static defaultProps = {
	  isChecked: false
	}
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		checked: false
	  	}
	}
	onChange = () => {
		this.setState({
			checked: !this.state.checked
		},() => {
			this.props.onChange(this.state.checked)
		})
	}
	render() {
		const { checked } = this.state
		const prop = this.props

		return (
			<div onClick={this.onChange.bind(this)} className='list-item'>
				<div className='txt'>
					{`您于【${moment(prop.gmtCreate).format('YYYY-MM-DD HH:mm:ss')}】发布得调剂【${prop.id}】,用户【${prop.receiveUser.username}】请求查看您的联系方式`}
				</div>
				{prop.isChecked && 
					<input
						checked={checked} 
						className="sc-radio" 
						type="radio" 
						onChange={() => {}} 
					/>
				}
			</div>
		)
	}
}
@HOCHeader({
	title:"调剂授权"
})
export default class ReadPhoneAuth extends Component {
	constructor(props) {
	 	super(props)
	
	  	this.state = {
	  		tabIndexs:[0],
	  		noAuthIds:[],
	  		currentTab: 0
	  	}
	}
	onChangeTab = (tab,index) => {
		const { tabIndexs } = this.state 
		if(tabIndexs.indexOf(index) === -1){
			tabIndexs.push(index)
			this.setState({tabIndexs,currentTab:index})
		}
	}
	onListItemChange = (val, checked) => {
		let array = [...this.state.noAuthIds]
		if(checked) {
			array.push(val)
		}else {
			const i = array.indexOf(val)
			if(i !== -1) {
				array.splice(i,1)
			}
		}
		this.setState({
			noAuthIds: array
		})
		
	}
	onCancelConfirm = async () => {
		const { noAuthIds } = this.state
		const postData = {
			ids: noAuthIds.join(',')
		}
		Toast.loading('正在处理',0)
		const res = await axios.put('/adjustAuthorize/refuse', qs.stringify(postData))
		if(res.ErrorCode === '000000') {
			Toast.success("拒绝成功")
		}
	}
	onFinishConfirm = async () => {
		const { noAuthIds } = this.state
		const postData = {
			ids: noAuthIds.join(',')
		}
		Toast.loading('正在处理',0)
		const res = await axios.put('/adjustAuthorize/authorize', qs.stringify(postData))
		if(res.ErrorCode === '000000') {
			Toast.success("已同意")
		}
	}
	renderTabWrap = () => {
		const { tabIndexs } = this.state

		return tabs.map((item,index) => {
			let params = {
				authorizeStatus:item.title
			}

			return (
				<div key={index} className="tab-wrapper">
		    		{tabIndexs.indexOf(index) !== -1 && 
		    			<ListViewBar 
							getUrl="/adjustAuthorize/page"
							params={params}
							useBodyScroll={false}
							renderRow={(rowData,sectionID, rowID) => {
								return (
									<ListItem 
										key={rowID}
										{...rowData}
										onChange={this.onListItemChange.bind(this, rowData.id)}
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
			<div className='read-phone-auth page'>
				<Tabs 
					tabs={tabs}
			      	initialPage={this.state.currentTab}
			      	onChange={this.onChangeTab.bind(this)}
			    >
			    	{this.renderTabWrap()}
			    </Tabs>
			    {this.currentTab === 1 && 
			    	<div className="action">
						<a onClick={this.onCancelConfirm.bind(this)} href="javascript:;" className="btn">
						 	<img src="/images/action_btn_cancel_icon.png" alt="按钮图标"/>
							<span>拒绝</span>
						</a>
						<a onClick={this.onFinishConfirm.bind(this)} href="javascript:;" className="btn">
						 	<img src="/images/action_btn_check_icon.png" alt="按钮图标"/>
							<span>同意</span>
						</a>
					</div>
			    }
				
			</div>
		)
	}
}