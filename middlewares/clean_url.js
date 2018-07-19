const clean = (url) => {
	let protocolPattern = new RegExp('(http|https)://');
	
	if(protocolPattern.test(url)){ //contains protocol
		return url.replace(protocolPattern, "");
	} else { //does not contain protocol, no need to clean url
		return url
	}
}

module.exports.clean = clean;