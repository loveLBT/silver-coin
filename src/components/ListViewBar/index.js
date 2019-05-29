import React,{ Component } from 'react'
import { PullToRefresh, ListView, Icon } from 'antd-mobile'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'

import Store from './Store.js'
import Footer from './Footer'

@observer
export default class ListViewBar extends Component {
	static defaultProps = {
	  	renderHeader: () => {return null},
	  	renderRow: () => <span>this is children component</span>,
	  	renderSeparator: () => {return null},
	  	dataSource: new ListView.DataSource({
	     	 rowHasChanged: (row1, row2) => row1 !== row2,
	    }),
	  	getUrl: '',
	  	params: {},
	  	useBodyScroll: false,
	  	style:{flex:1}
	}
	componentWillMount() {
		const { getUrl, params, onRef } = this.props
		if(onRef){
			onRef(this)
		}
		this.store = new Store({
			getUrl,
			params
		})
	}
	componentDidMount() {
		this.store.beginHeaderRefresh()
	}
	render() {
		const { renderHeader, renderSeparator, renderRow, useBodyScroll, style, dataSource } = this.props
		if(this.store.loadCount === 1) {
			return <div style={{textAlign:'center',paddingTop:"15px"}}><Icon type="loading" /></div>
		}else {
			return (
				<ListView
					key={useBodyScroll ? '0' : '1'}
			        ref={el => this.listview = el}
			        dataSource={dataSource.cloneWithRows(this.store.data)}
			        renderHeader={() => renderHeader()}
			        renderFooter={() => <Footer state={this.store.footerState} />}
			        renderRow={(rowData, sectionID, rowID) => renderRow(toJS(rowData), sectionID, rowID)}
			        renderSeparator={(sectionID, rowID) => renderSeparator(sectionID, rowID)}
			        useBodyScroll={useBodyScroll}
			        style={useBodyScroll ? {} : {...style}}
			        pullToRefresh={
			        	<PullToRefresh
				          	refreshing={this.store.isHeaderRefreshing}
				          	onRefresh={() => this.store.beginHeaderRefresh()}
				        />
			    	}
			        onEndReached={() => this.store.beginFooterRefresh()}
			        pageSize={5}
		      	/>
			)
		}
		
	}
}