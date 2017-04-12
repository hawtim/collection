var a = document.createElement('a')
a.href= url
if(browser.ie) {
	a.href = a.href
}
return !(a.protocol == location.protocol && a.hostname == location.hostname && (a.port == location.port || (a.port == '80' && location.port == '' ) || (a.port == '' && location.port == '80')));