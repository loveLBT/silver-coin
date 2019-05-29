import { observable, action } from 'mobx'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import qs from 'qs'

import { GetUrlParams } from '../util/common'

export default class Store {
	constructor(homestore) {
		this.homestore = homestore
		this.restoreUserInfoFromStorage()
		this.restorageWXInfoFromStorage()
		this.readWXJSSDK()
	}
	@observable userInfo = {}

	STORAGE_KEY_USER_INFO = 'FRONT_USER_INFO'
	STORAGE_KEY_WX_INFO = 'FRONT_WX_INFO'

	@action wechatLogin = async () => {
		const code = GetUrlParams("code")
		if(code){
			const params = {
				code,
				url:window.location.href.split('#')[0]
			}
			Toast.loading("正在加载数据")
			const res = await axios.get('/wechat/login',{params})
			
			if(res.ErrorCode === "100002"){
				Toast.hide()
				this.setUserInfoStorage(res.data.user)
				this.setWXInfoStorage(res.data.config)
				this.homestore.initData()
			}
		}
	}
	@action initWX = (data) => {
		window.wx.config({
			debug:true,
			appId:data.appId,
			timestamp:data.timestamp,
			nonceStr:data.nonceStr,
			signature:data.signature,
			jsApiList: ["getLocation"] 
		})
	}
	@action readWXJSSDK = () => {
		const that = this
		window.wx.ready(function() {
			that.getWXLocation()
		})
	}
	@action getWXLocation = () => {
		const that = this
		window.wx.getLocation({
			type:"wgs84",
			success:function(res) {
				const data = {
					lat: res.latitude,
					lng: res.longitude 
				}
				const geocoder = new window.QMap.Geocoder({
					complete : function(result){
						that.setUserInfoStorage({...data,...result.detail})
					}
				})
				const latLng = new window.QMap.LatLng(res.latitude,res.longitude)
				geocoder.getAddress(latLng)
			}
		})
	}
	@action setUserInfoStorage = (data) => {
        const value = sessionStorage.getItem(this.STORAGE_KEY_USER_INFO)
        let newData = {}
        if (value) {
            const jsValue = JSON.parse(value)
            newData = {...jsValue, ...data}
        } else {
            newData = data
        }
        this.userInfo = newData
        sessionStorage.setItem(this.STORAGE_KEY_USER_INFO, JSON.stringify(newData))
    }
    @action restoreUserInfoFromStorage = () => {
        const value = sessionStorage.getItem(this.STORAGE_KEY_USER_INFO)
        if (value) {
            this.userInfo = JSON.parse(value)
            this.homestore.initData()
        }else{
        	this.wechatLogin()
        }
    }
    @action setWXInfoStorage = (data) => {
        sessionStorage.setItem(this.STORAGE_KEY_WX_INFO, JSON.stringify(data))
        this.initWX(data)
    }

    @action restorageWXInfoFromStorage = () => {
        const value = sessionStorage.getItem(this.STORAGE_KEY_WX_INFO)
        if (value) {
            this.systemInfo = JSON.parse(value)
            this.initWX(JSON.parse(value))
        }
    }
}