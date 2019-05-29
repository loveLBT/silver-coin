import React,{ Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'

import TabBar from '../components/TabBar'
import Home from './Home'
import Person from './Person'

const Item = TabBar.Item

@inject("homestore")
@observer
export default class TabNav extends Component {
	render() {
		const { homestore } = this.props
		return (
			<Fragment>
				{homestore.selectedTab === "home" && <Home />}
				{homestore.selectedTab === "person" && <Person />}
				<TabBar 
					selectedTab={homestore.selectedTab}
					tabs={homestore.tabs}
					onPress={(data) => {
						homestore.onTabChange(data.key)
					}}
				/>
			</Fragment>
		)
	}
}