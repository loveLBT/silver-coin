import React,{ Component } from 'react'
import { Icon } from 'antd-mobile'

import constants from '../constants.js'
import './style.css'

export default class Footer extends Component {
	static defaultProps = {
	  	footerRefreshingText: "努力加载中",
	    footerLoadMoreText: "上拉加载更多",
	    footerFailureText: "数据加载出错",
	    footerNoMoreDataText: "已全部加载完毕",
	    footerNullDataText: "数据空空如也"
	}
	render() {
		const { state } = this.props
		let footer = null
		console.log(state)
		switch (state) {	
			case constants.refreshState.Idle:

				break
			case constants.refreshState.Refreshing:
				footer = (
					<div className="loading-view">
						<Icon type="loading" />
						<span className="refreshing-text">{this.props.footerRefreshingText}</span>
					</div>
				)
				break;
			case constants.refreshState.CanLoadMore:
				footer = (
					<div className="loading-view">
						<p className="footer-text">{this.props.footerLoadMoreText}</p>
					</div>
				)
				break;
			case constants.refreshState.NoMoreData:
				footer = (
					<div className="loading-view">
						<p className="footer-text">{this.props.footerNoMoreDataText}</p>
					</div>
				)
				break;
			case constants.refreshState.NulllData:
				footer = (
					<div className="loading-view">
						<img src="/images/list_view_null_icon.png" alt="长列表底部空数据图标"/>
						<p>{this.props.footerNullDataText}</p>
					</div>
				)
				break;
			case constants.refreshState.Failure:
				footer = (
					<div className="loading-view">
						<img src="/images/list_view_failure_icon.png" alt="长列表底部错误图标"/>
						<p>{this.props.footerFailureText}</p>
					</div>
				)
				break;
		}
		return footer
	}
}