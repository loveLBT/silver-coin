import React,{ Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'

export default class Evaluate extends Component {
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		assessmentStatus:"好评",
	  		assessmentText:""
	  	}
	}
	onRadioChange = (e) => {
		this.setState({
			assessmentStatus:e.target.value
		})
	}
	onTextareaChange = (e) => {
		this.setState({
			assessmentText:e.target.value
		})
	}
	onEvaluate = async () => {
		const { location, history, saveOK, id } = this.props
		const { assessmentStatus, assessmentText } = this.state
		const postData = {
			id,
			assessmentStatus,
			assessmentText
		}
		Toast.loading("正在提交",0)
		const res = await axios.put("/order/assess",qs.stringify(postData))
		if(res.ErrorCode === "000000"){
			Toast.success("评价成功")
			if(saveOK){
				saveOK()
			}
		}
	}
	render() {
		const { assessmentStatus, assessmentText } = this.state

		return (
			<div className="evaluate">
				<div onChange={this.onRadioChange.bind(this)} className="evaluate-icon-bar">
					<div className="radio" >
						<input type="radio" id="radio1" value="好评" name="radio" />
						<label htmlFor="radio1">
							<img src={assessmentStatus === "好评" ? "/images/prefect_active.png" : "/images/prefect.png"} alt="好评图标"/>
						</label>
					</div>
					<div className="radio">
						<input type="radio" id="radio2" value="中评" name="radio" />
						<label htmlFor="radio2">
							<img src={assessmentStatus === "中评" ? "/images/good_active.png" : "/images/good.png"} alt="中评图标"/>
						</label>
					</div>
					<div className="radio">
						<input type="radio" id="radio3" value="差评" name="radio" />
						<label htmlFor="radio3">
							<img src={assessmentStatus === "差评" ? "/images/bad_active.png" : "/images/bad.png"} alt="差评图标"/>
						</label>
					</div>
				</div>
				<div className="evaluate-input-bar">
					<textarea onChange={this.onTextareaChange.bind(this)} value={assessmentText} placeholder="请填写你的评价内容" maxLength="100"></textarea>
					<p>还可以输入{100-assessmentText.length}字</p>
				</div>
				<a onClick={this.onEvaluate.bind(this)} href="javascript:;" className="submit-btn">
					提交资料
				</a>
			</div>
		)
	}
}