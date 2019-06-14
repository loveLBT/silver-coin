import React,{ Component } from 'react'

import constants from '../util/constants'
import HOCHeader from '../HOC/HOCHeader'

@HOCHeader({title:"帮助中心"})
export default class HelpCenter extends Component {
	render() {
		return (
			<div className="help-center page">
				<iframe 
					title="帮助中心"
					style={{width:"100%",flex:1}}
					src={`${constants.wechatLoginApi}/help-info.html`}
					frameBorder="0"
					ref={ref=>this.iframe=ref}
				/>
			</div>
		)
	}
}