import React,{ Component } from 'react'
import { Carousel, Toast } from 'antd-mobile'
import { withRouter } from 'react-router'
import { inject, observer } from 'mobx-react'
import axios from 'axios'

import OrderItem from '../components/OrderItem'
import ListViewBar from '../components/ListViewBar'
import ModalBar from '../components/ModalBar'

@withRouter
@inject("wxstore","homestore")
@observer
export default class Home extends Component {
	onAppointmentClick = async () => {
		const { wxstore, history } = this.props
		const { userInfo } = wxstore
		Toast.loading("请等待",0)
		const res = await axios.get(`/order/orderStatus/已完成/userId/${userInfo.id}`)
		Toast.hide()
		if(res.ErrorCode === "000000"){
			if(res.data.length > 0){
				Toast.offline(`你有${res.data.length}条工单未评价`)
			}else{
				history.push('/appointment')
			}
		}
	}
	onAddressClick = () => {
		this.modalBar.onOpen()
	}
	onItemClick = (item) => {
		const { history } = this.props
		history.push({
			pathname:`/organization/${item.id}`,
			state:{
				data:item
			}
		})
	}
	onAvatarClick = () => {
		const { history } = this.props
		history.push("/personInfo")
	}
	render(){
		const { history, wxstore, homestore } = this.props
		const { userInfo } = wxstore
		return (
			<div className="home">
				<div className="header">
					<div className="userinfo" onClick={this.onAvatarClick.bind(this)}>
						<div className="avatar">
							<img src={userInfo.headImage} alt="头像"/>
						</div>
						<span>{userInfo.username}</span>
					</div>
					
				</div>
				<div className="slider">
					{(homestore.banners && homestore.banners.length > 0) &&
						<Carousel 
							autoplay={true}
	          				infinite
	          				dotStyle={{backgroundColor:"#fff",marginBottom:"10px"}}
	          				dotActiveStyle={{backgroundColor:"#ffb901",marginBottom:"10px"}}
						>
							{homestore.banners.map((val,index) => (
								<img 
									key={index}
									src={`https://xn--uir4ul0kqufkqaj2d966dg6h5iw.com:8088${val}`} 
									alt={`轮播图-${index}`}
									style={{width:"100%",height:"150px"}}
								/>
							))}
						</Carousel>
					}
					
				</div>
				<div className="menu">
					<ul>
						<li onClick={() => history.push('/flow')}>
							<img src="/images/menu-1.png" alt="流动兑换"/>
							<span>流动兑换</span>	
						</li>
						{["银行用户","商家用户"].indexOf(userInfo.userType) !== -1 &&
							<li onClick={this.onAppointmentClick.bind(this)}>
								<img src="/images/menu-2.png" alt="预约兑换"/>
								<span>预约兑换</span>	
							</li>
						}
						{["银行用户"].indexOf(userInfo.userType) !== -1 && 
							<li onClick={() => history.push('/bankDispensing')}>
								<img src="/images/menu-3.png" alt="银行调剂"/>
								<span>银行调剂</span>	
							</li>
						}
						{["银行用户","商家用户"].indexOf(userInfo.userType) !== -1 &&
							<li onClick={() => history.push('/merchatDispensing')}>
								<img src="/images/menu-4.png" alt="商户调剂"/>
								<span>商户调剂</span>	
							</li>
						}
						
						<li onClick={() => history.push('/cashChanger')}>
							<img src="/images/menu-5.png" alt="兑换机查询"/>
							<span>兑换机查询</span>	
						</li>
						<li onClick={() => history.push('/antifalse')}>
							<img src="/images/menu-6.png" alt="反假知识"/>
							<span>反假知识</span>	
						</li>
						{["银行用户","商家用户"].indexOf(userInfo.userType) !== -1 && 
							<li onClick={() => history.push('/orderMange')}>
								<img src="/images/menu-7.png" alt="订单管理"/>
								<span>订单管理</span>	
							</li>
						}
					</ul>
				</div>
				{(userInfo.lat && userInfo.lng) && 
					<div className="list-view-tip">
						<img src="/images/fj-right.png" alt="箭头点右"/>
						<span>附近机构</span>
						<img src="/images/fj-left.png" alt="箭头点左"/>
					</div>
				}
				
				<div className="list-view">
					{(userInfo.lat && userInfo.lng) && 
						<ListViewBar 
							getUrl="/v1/organization/page"
							params={{
								lat:userInfo.lat,
								lng:userInfo.lng
							}}
							useBodyScroll={true}
							renderRow={(rowData,sectionID, rowID) => {
								return (
									<OrderItem 
										onClick={this.onItemClick.bind(this,rowData.organization)}
										key={rowID} 
										distance={rowData.distance} 
										title={rowData.organization.organizationName}
										address={rowData.organization.address}
										phoneNum={rowData.organization.phoneNum}
										data={rowData}
									/>
								)
							}}
							
						/>
					}
				</div>
			</div>
		)
	}
}

{/*<div 
						className="address" 
						onClick={this.onAddressClick.bind(this)}
					>
						<img src="/images/point.png" alt="地址图标"/>
						<span>温州</span>
						<img src="/images/down-up.png" alt="下拉图标"/>
					</div>

<ModalBar 
					title="切换城市"
					onRef={(ref)=>this.modalBar=ref} 
				>
				</ModalBar>
				*/}