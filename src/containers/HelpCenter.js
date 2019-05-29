import React,{ Component } from 'react'

import HOCHeader from '../HOC/HOCHeader'

@HOCHeader({title:"帮助中心"})
export default class HelpCenter extends Component {
	render() {
		return (
			<div className="help-center page">
				<iframe 
					title="帮助中心"
					style={{width:"100%",flex:1}}
					src="/help-info.html" 
					frameBorder="0"
					ref={ref=>this.iframe=ref}
				/>
			</div>
		)
	}
}