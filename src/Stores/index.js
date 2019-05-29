import WXStore from './WXStore'
import HomeStore from './HomeStore'

const homestore = new HomeStore()

export default {
	wxstore: new WXStore(homestore),
	homestore: homestore
}