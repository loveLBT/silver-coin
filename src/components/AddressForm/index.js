import React,{ Component, Fragment } from 'react'
import { List, InputItem, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'

import HOCHeader from '../../HOC/HOCHeader'
import ChooseAddress from '../../containers/ChooseAddress'

const Item = List.Item

@createForm()
@HOCHeader({
	title:(ref) => ref.rederHeaderTitle(),
	onBack:(ref) => ref.onHeaderBack(),
	right:(ref) => ref.renderHeaderRight()
})
export default class AddressForm extends Component {
	static defaultProps = {
		headerTitle:"编辑地址",
	  	onSubmit:() => {}
	}
	constructor(props) {
	  	super(props)
	
	  	this.state = {
	  		viewPage:1
	  	}
	}
	componentWillMount() {
		if(this.props.onRef){
			this.props.onRef(this)
		}
	}
	componentDidMount() {
		const { data, form } = this.props
		if(data) {
			let addressData = {
				address: data.addr,
				province: data.province,
				city: data.city,
				district: data.district,
				lat: data.lat,
				lng: data.lng
			}
			form.setFieldsValue({
				address:addressData
			})
		}
		
	}
	rederHeaderTitle = () => {
		const { headerTitle } = this.props
		const { viewPage } = this.state
		if(viewPage === 1){
			return <span>{headerTitle}</span>
		}else if(viewPage === 2){
			return <span>选择地址</span>
		}
	}
	renderHeaderRight = () => {
		if(this.props.renderHeaderRight){
			return this.props.renderHeaderRight()
		}else{
			return null
		}
	}
	onHeaderBack = () => {
		const { viewPage } = this.state
		const { history } = this.props
		if(viewPage === 1) {
			history.goBack()
		}else if(viewPage === 2){
			this.setState({
				viewPage:1
			})
		}
	}
	onCheckForm = () => {
		const { validateFields } = this.props.form
		validateFields((err,values) => {
			if(!err){
				this.props.onSubmit(values)
			}else{
				for(let key in err){
					if(key){
						Toast.info(err[key].errors[0].message)
						break 
					}
					
				}
			}
		})
	}
	onChooseAddress = (data) => {
		this.setState({
			viewPage:2
		})
	}
	onAddressConfirm = (data) => {
		const { form } = this.props
		form.setFieldsValue({
			address:data
		})
		this.onHeaderBack()
	}
	render() {
		const { form, data= {} } = this.props
		const { getFieldProps, getFieldValue } = form
		const { viewPage } = this.state
		
		return (
			<Fragment>
				<div style={viewPage === 1 ? {display:"block"} : {display:"none"}}>
					<List>
						<InputItem
				            {...getFieldProps('username', {
				              initialValue: data.username || "",
				              rules: [{required:true,message:"请输入收货人"}]
				            })}
				            type="text"
				            placeholder="请输入收货人名字"
				        >
				        	收货人
				        </InputItem>
				        <InputItem
				            {...getFieldProps('phone', {
				            	initialValue: data.phone || "",
				            	rules: [{required:true,message:"请输入联系电话"}]
				            })}
				            type="number"
				            placeholder="请输入联系电话"
				        >
				          	联系电话
				        </InputItem>
				        <Item
				        	arrow="horizontal"
				        	onClick={this.onChooseAddress.bind(this)}
				        	 {...getFieldProps('address', {
				            	initialValue: "",
				            	rules: [{required:true,message:"请选择收货地址"}]
				            })}
				        >
				        	<div className="horizontal-item">
				        		<div className="label">收货地址</div>
				        		
				        		{getFieldValue("address") ? 
				        			<div className="value">{getFieldValue("address").address}</div> :
				        			<div className="placehodler">请选择收货地址</div>
				        		}
				        	</div>
				        </Item>
					</List>
					{this.props.children}
				</div>
				<ChooseAddress 
					lat={data.lat}
					lng={data.lng}
					addressName={data.addr}
					style={viewPage === 2 ? {display:"block"} : {display:"none"}} 
					onConfirm={this.onAddressConfirm.bind(this)}
				/>
			</Fragment>
			
		)
	}
}