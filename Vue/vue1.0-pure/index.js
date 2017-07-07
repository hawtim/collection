Vue.http.options.root = 'http://10.17.65.43:3000'
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.http.options.credentials = true
Vue.http.options.params = {
	key:'a',
	xxx:'xxx'
}
Vue.http.options.timeout = 10000


//  基于全局 Vue 对象使用 http


// ES6 lambda写法
Vue.http.get('/someUrl',[options]).then((response)=>{
	// 响应成功后的回调
	console.log("状态码对应的值:" + res.ok + "状态码:" + res.status + "状态文本:" + res.statusText + "响应头:" + res.header)
},(response)=> {
	// 响应错误回调
});
// ES5 写法
Vue.http.get('/someUrl',[options]).then(function(response){
	// 响应成功后的回调
},function(response) {
	// 响应错误回调
});

Vue.http.post('/someUrl',[body],[options]).then(successCallback, errorCallback);

// 在一个 Vue 实例内使用 $http

this.$http.get('/someUrl',[options]).then(successCallback, errorCallback);
this.$http.post('/someUrl',[body],[options]).then(successCallback, errorCallback);




