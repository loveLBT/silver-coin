import axios from 'axios'
import { Toast } from 'antd-mobile'

import constants from '../util/constants'

//	拦截异步请求
axios.interceptors.request.use((config)=>{
	config.baseURL = constants.wechatLoginApi
	config.crossDomain = true
	config.withCredentials = true
	config.headers['X-Requested-With'] = 'XMLHttpRequest'
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	config.headers['weixinid'] = sessionStorage.getItem('JESSION_ID')
	/*config.headers={
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type':'application/x-www-form-urlencoded',
		'Cookie': sessionStorage.getItem('JESSION_ID')
	}*/
	return config
},(error) => {
	return Promise.reject(error)
})

//拦截异步响应
axios.interceptors.response.use((response)=>{

	if(["100002", "000000"].indexOf(response.data.ErrorCode) === -1){
		Toast.offline(response.data.ErrorMsg || "网络请求失败")
	}

	return response.data
},(error)=>{
	if(error && error.response){
		MessageError(error.response.status)
	}else{
		Toast.offline("网络请求失败")
	}
	return Promise.reject(error)
})

const MessageError=(errorCode)=>{
	let msg = ''
	switch(errorCode) {
		case 400:
			msg = '请求参数错误';
			break;
		case 401:
			msg = '请求权限错误';
			break;
		case 404:
			msg = '请求的api没有找到';
			break;
		case 500:
			msg = '与服务器连接断开';
			break;
		default:
			msg = "网络请求失败"
	}

	Toast.offline(msg)
}