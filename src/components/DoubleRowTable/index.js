import React,{ Component } from 'react'

import './style.css'

export default class DoubleRowTable extends Component {
	static defaultProps = {
	  	style:{}
	}
	render () {
		const { style, columns, data } = this.props

		return (
			<div style={style} className="double-table-row">
				<div className="row">
					<span>面额</span>
					{columns.map((item,index) => 
						<span key={index}>{item.title}</span>
					)}
					
				</div>
				<div className="row">
					<span>供应</span>
					{columns.map((item,index) => 
						<span key={index}>{data[item.key]}</span>
					)}
				</div>
			</div>
		)
	}
}