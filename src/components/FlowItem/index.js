import React,{ Component } from 'react'
import moment from 'moment'

import './style.css'

const FlowItem = (props) => {
	return (
		<div className="flow-item">
			<p>
				<span className="label">发布机构：</span>
				<span className="value">{props.release_organization.organizationName}</span>
			</p>
			<p>
				<span className="label">举办地址：</span>
				<span className="value">{props.address}</span>
			</p>
			<p>
				<span className="label">举办时间：</span>
				<span className="value">{`${moment(props.starttime).format("YYYY-MM-DD")}至${moment(props.endtime).format("YYYY-MM-DD")}`}</span>
			</p>
			<p style={{color:"#333"}}>
				{props.remark}
			</p>
		</div>
	)
}

export default FlowItem