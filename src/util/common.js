export const GetUrlParams = (name) => {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  	var r = window.location.search.substr(1).match(reg);
  	if(r!=null)return  unescape(r[2]); return null;
}

export const EncryptionPhone = (phone) => {
	let array = phone.split("")
	array.splice(3,4,'****')
	return array.join("")
}