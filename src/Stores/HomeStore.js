import { observable, action, runInAction, computed } from 'mobx'
import axios from 'axios'
import { Toast } from 'antd-mobile'
import qs from 'qs'

const TABS = [
	{title:"首页",key:"home",icon:"/images/menu_home_icon.png",selectedIcon:"/images/menu_home_icon_active.png",hasDot:false},
	{title:"个人中心",key:"person",icon:"/images/menu_person_icon.png",selectedIcon:"/images/menu_person_icon_active.png",hasDot:false}
]

export default class Store {
	@observable selectedTab = 'home'
	@observable banners = []
	@observable phoneAuthCount = 0

	@computed get tabs () {
		let array = [...TABS]
		if(this.phoneAuthCount > 0) {
			array[1].hasDot = true
		}
		return array
	}
	@action initData = () => {
		this.getBanners()
		this.getPhoneAuthCount()
	}
	@action onTabChange = (selectedTab) => {
		this.selectedTab = selectedTab
	}
	@action getBanners = async () => {
		const postData = {
    		imgType:0
    	}
    	const res = await axios.post("/v2/displayInfo",qs.stringify(postData))
    	if(res.ErrorCode === "000000"){
    		let images = []
    		for(let item of res.data){
    			images.push(item.imgUrl)
    		}
    		runInAction(() => {
    			this.banners = images
    		})
    	}
	}
	@action getPhoneAuthCount  = async () => {
		const res = await axios.get('/adjustAuthorize/count')
		if(res.ErrorCode === "000000") {
			runInAction(() => {
				this.phoneAuthCount = res.data
			})
		}
	}
}