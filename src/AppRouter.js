import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { inject, observer } from 'mobx-react'
import axios from 'axios'
import qs from 'qs'

import { GetUrlParams } from './util/common'

import TabNav from './containers/TabNav'
import Home from './containers/Home'
import CashChanger from './containers/CashChanger'
import CashChangerDetail from './containers/CashChangerDetail'
import AntiFalse from './containers/AntiFalse'
import Appointment from './containers/Appointment'
import Settlement from './containers/Settlement'
import BankDispensing from './containers/BankDispensing'
import MerchantDispensing from './containers/MerchantDispensing'
import MyDispensing from './containers/MyDispensing'
import DispensingDetail from './containers/DispensingDetail'
import OrderMange from './containers/OrderMange'
import HelpCenter from './containers/HelpCenter'
import Authentication from './containers/Authentication'
import Delivery from './containers/Delivery'
import Flow from './containers/Flow'
import AddressMange from './containers/AddressMange'
import AddressEdit from './containers/AddressEdit'
import AddAddress from './containers/AddAddress'
import OrganizationDetail from './containers/OrganizationDetail'
import PersonInfo from './containers/PersonInfo'
import ReleaseDispensing from './containers/ReleaseDispensing'
import OrderDetail from './containers/OrderDetail'
import Evaluate from './containers/Evaluate'
import ReadPhoneAuth from './containers/ReadPhoneAuth'

@inject("wxstore")
@observer
class AppRouter extends Component {
	componentDidMount () {
		this.initData()
		this.readWXJSSDK()	
	}
	initData = async () => {
		const postData = {url: window.location.href.split('#')[0]}
		const { wxstore } = this.props
		const res = await axios.post('/weixin/sign',qs.stringify(postData))
		if(res.ErrorCode === '000000') {
			wxstore.WXConfig(res.data, ['getLocation'])	
			
		}
	}
	readWXJSSDK = () => {
		const { wxstore } = this.props
		window.wx.ready(function() {
			wxstore.getWXLocation()
		})
	}
	render(){
		return (
			<Router>
				<Switch>
					<Redirect exact from='/' to={GetUrlParams("state") ? `/${GetUrlParams("state")}` : '/home'} />
					<Route exact path='/home' component={TabNav} />
					<Route exact path='/cashChanger' component={CashChanger} />
					<Route exact path='/cashChanger/:id' component={CashChangerDetail} />
					<Route exact path='/antifalse' component={AntiFalse} />
					<Route exact path='/appointment' component={Appointment} />
					<Route exact path='/settlement' component={Settlement} />
					<Route exact path='/bankDispensing' component={BankDispensing} />
					<Route exact path='/merchatDispensing' component={MerchantDispensing} />
					<Route exact path='/myDispensing' component={MyDispensing} />
					<Route exact path='/dispensing/:id' component={DispensingDetail} />
					<Route exact path='/orderMange' component={OrderMange} />
					<Route exact path='/helpCenter' component={HelpCenter} />
					<Route exact path='/authentication' component={Authentication} />
					<Route exact path='/delivery' component={Delivery} />
					<Route exact path='/flow' component={Flow} />
					<Route exact path='/addressMange' component={AddressMange} />
					<Route exact path='/address/:id' component={AddressEdit} />
					<Route exact path='/addAddress' component={AddAddress} />
					<Route exact path='/organization/:id' component={OrganizationDetail} />
					<Route exact path='/personInfo' component={PersonInfo} />
					<Route exact path='/releaseDispensing' component={ReleaseDispensing} />
					<Route exact path='/order/:id' component={OrderDetail} />
					<Route exact path='/readPhoneAuth' component={ReadPhoneAuth} />
				</Switch>
			</Router>
		)
	}
}

export default AppRouter