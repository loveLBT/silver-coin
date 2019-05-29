import React,{ Component } from 'react'
import classnames from 'classnames'

import './style.css'

const AddressMangeItem = (props) => {
	return (
		<div className={classnames("address-mange-item",{"address-default":props.defaultEnable})}>
			<div className="avatar">
				<span>{props.username.slice(0,1)}</span>
				
			</div>
			<div className="info">
				<p><span style={{color:"#333",marginRight:"10px"}}>{props.username}</span><span style={{fontSize:"12px",color:"#999"}}>{props.phone}</span></p>
				<p>{props.addr}</p>
			</div>
			<div onClick={props.onClick} className="btn">编辑</div>
		</div>
	)
}

export default AddressMangeItem

/*{props.user.headImage ? 
					<img width="100%" height="100%" src="/images/avatar.jpg" alt="用户头像图标"/> : 
					<span>{props.username.slice(0,1)}</span>
				}*/