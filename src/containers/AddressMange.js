import React,{ Component } from 'react'
import axios from 'axios'
import { Toast } from 'antd-mobile'

import HOCHeader from '../HOC/HOCHeader'
import AddressMangeItem from '../components/AddressMangeItem'

@HOCHeader({
	title:"我的收货地址"
})
export default class AddressMange extends Component {
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		data:[]
	  	}
	}
	componentDidMount() {
		this.getData()
	} 
	getData = async () => {
		Toast.loading("正在加载，请等待",0)
		const res = await axios.get("/address")
		if(res.ErrorCode === "000000"){
			this.setState({data:res.data})
			Toast.hide()
		}
	}
	onItemClick = (data) => {
		const { history } = this.props
		history.push({
			pathname:`/address/${data.id}`,
			state:{
				data
			}
		})
	}
	render() {
		const { history } = this.props
		const { data } = this.state  

		return (
			<div className="address-mange">
				{data.length > 0 ?
					data.map((item,index) => 
						<AddressMangeItem 
							onClick={this.onItemClick.bind(this,item)}
							key={index}
							{...item}
						/>
					) :

					<div className="loading-view">
						<img src="/images/list_view_null_icon.png" alt="空数据图标"/>
						<p>数据空空如也</p>
					</div>
				}
				

				<a 
					onClick={() => {
						history.push('/addAddress')
					}} 
					href="javascript:;" 
					className="submit-btn"
				>
					添加地址
				</a>
			</div>
		)
	}
}