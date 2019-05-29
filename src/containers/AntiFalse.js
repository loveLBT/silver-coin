import React,{ Component } from 'react'
import { Carousel, Toast } from 'antd-mobile'
import axios from 'axios'
import qs from 'qs'

import HOCHeader from '../HOC/HOCHeader'

@HOCHeader({
	title:"反假知识"
})
export default class AntiFalse extends Component {
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		imgHeight:"auto",
	  		images:[]
	  	}
	}
	componentDidMount() {
		this.getImages()
	}
	getImages = async () => {
		const postData = {
    		imgType:1
    	}
    	Toast.loading("正在加载",0)
    	const res = await axios.post("/v2/displayInfo",qs.stringify(postData))
    	if(res.ErrorCode === "000000"){
    		Toast.hide()
    		let images = []
    		for(let item of res.data){
    			images.push(item.imgUrl)
    		}
    		this.setState({images})
    	}
	}
	render () {
		const { images, imgHeight } = this.state
		return (
			<div className="anti-false page">
				<Carousel
			        autoplay={false}
			        vertical
			        dots={false}
		        >
		        	{images.map((img,index) => 
		        		<img 
							key={index}
							src={img}
							alt={`反假知识图片${index}`}
							style={{width:"100%",height:imgHeight}}
							onLoad={() => {
			                  	window.dispatchEvent(new Event('resize'));
			                  	this.setState({ imgHeight: 'auto' });
			                }}
						/>
		        	)}
		        </Carousel>
			</div>
		)
	}
}

{/**/}