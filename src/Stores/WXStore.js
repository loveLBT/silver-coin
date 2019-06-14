import { observable, action } from 'mobx'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import qs from 'qs'

import { GetUrlParams } from '../util/common'

export default class Store {
	constructor(homestore) {
		this.homestore = homestore
		this.restoreUserInfoFromStorage()
	}
	@observable userInfo = {}

	STORAGE_KEY_USER_INFO = 'FRONT_USER_INFO'

	@action wechatLogin = async () => {
		const code = GetUrlParams("code")
		if(code){
			const that = this
			const params = {
				code,
				url:window.location.href.split('#')[0]
			}
			Toast.loading("正在加载数据")
			const res = await axios.get('/wechat/login',{params})
			
			if(res.ErrorCode === "100002"){
				Toast.hide()
				this.setUserInfoStorage(res.data.user)
				sessionStorage.setItem("JESSION_ID", res.data.weixinid)
				that.homestore.getBanners()
				if(res.data.user.userType !== "app用户") {
					this.homestore.getPhoneAuthCount()
				}
			}
		}
	}
	@action WXConfig = (config, jsApiList) => {
		window.wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: config.appId, // 必填，公众号的唯一标识
			timestamp: config.timestamp, // 必填，生成签名的时间戳
			nonceStr: config.nonceStr, // 必填，生成签名的随机串
			signature: config.signature,// 必填，签名
			jsApiList: jsApiList // 必填，需要使用的JS接口列表
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
}