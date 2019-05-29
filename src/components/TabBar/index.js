import React,{ Component } from 'react'
import classnames from 'classnames'

import './style.css'

export default class TabBar extends Component {
	static defaultProps = {
	  	tabs:[],
	  	selectedTab:'',
	  	onPress:() => {}
	}
	render() {
		const { tabs, selectedTab, onPress } = this.props
		return (
			<div className="tab-bar">
				{tabs.map((item,index) =>
					<div key={index} onClick={() => onPress(item)} className={classnames("tab",{"active":selectedTab === item.key})}>
						<img src={selectedTab === item.key ? item.selectedIcon : item.icon} alt="tab图标"/>
			            <p>{item.title}</p>
			            {item.hasDot && 
			            	<span className='dot'></span>
			            }
					</div>
				)}
			</div>
		)
	}
} 