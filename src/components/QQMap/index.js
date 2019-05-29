import React,{ Component } from 'react'

import './style.css'

export default class QQMap extends Component {
	static defaultProps = {
	  	lat:39.916527,
	  	lng:116.397128,
	  	isEdit:true,
	  	onGeocoder:()=>{}
	}
	_initMap() {
		const { lat, lng, isEdit } = this.props
		const myLatlng = new window.QMap.LatLng(lat,lng)
		const map = this._createMap(myLatlng)
		this.centerMarker = this._createMaker(map,myLatlng)
		if(isEdit) {
			this._addListen(map)
	   		this.geocoder = this._geocoder(map)
		}
	}
	_createMap(latLng) {
		const myOptions = {
			zoom: 13,               //设置地图缩放级别
		    center: latLng,      	//设置中心点样式
		    mapTypeControlOptions: {
		    	mapTypeIds: []
		    },
		   	zoomControl:false
		}
		//获取dom元素添加地图信息
		const map = new window.QMap.Map(document.getElementById("map"), myOptions)

		return map
	}
	_createMaker(map,latLng) {
		if(this.centerMarker){
			this.centerMarker.setMap(null)
		}
		const marker = new window.QMap.Marker({
	        position: latLng,
	        map: map
	    })
	    return marker
	}
	_addListen(map) {
		const that = this
		//绑定地图点击事件
	    window.QMap.event.addListener(
	    	map,
	    	"click",
	    	function(event) {
	    		map.setCenter(event.latLng)
	    		that.centerMarker = that._createMaker(map,event.latLng)
	    		that.geocoder.getAddress(event.latLng)
	    	}
	    )
	}
	_geocoder(map) {
		const that = this
		const geocoder = new window.QMap.Geocoder({
	        complete : function(result){
	        	that.props.onGeocoder(result)
	            map.setCenter(result.detail.location);
	            that.centerMarker = that._createMaker(map,result.detail.location)
	        }
	    })
	    return geocoder
	}
	componentWillMount() {
		if(this.props.onRef){
			this.props.onRef(this)
		}
	}
	componentDidMount () {
		this._initMap()
	}
	render(){
		return (
			<div id="map">

			</div>
		)
	}
}