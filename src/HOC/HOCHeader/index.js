import React,{ Component } from 'react'
import { withRouter } from 'react-router'

import './style.css'

const HOCHeader = (config) => (WrapperComponent) => {
	return withRouter(class extends WrapperComponent {
		onBack = () => {
			const { history } = this.props
			if(config.onBack){
				config.onBack(this)
			}else{
				history.goBack()
			}
		}
		render(){
			const { history } = this.props
			const titleType = typeof config.title

			return (
				<div className="page">
					<div className="hoc-header">
						<div className="left" onClick={this.onBack.bind(this)}>
							<img src="/images/back.png" alt="返回图标"/>
						</div>
						<div className="center">
							{titleType === "string" && 
								<span>{config.title}</span>
							}
							{titleType === "function" && 
								config.title(this)
							}
							
						</div>
						<div className="right">{config.right && config.right(this)}</div>
					</div>
					{super.render()}
				</div>
			)
		}
	})
}

export default HOCHeader