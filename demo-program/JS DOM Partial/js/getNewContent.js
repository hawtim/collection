function getNewContent(){
	var request = getHTTPObject();
	if(request){
		//XMLHttpRequest对象有许多的方法，
		//其中最有用的是open方法，用来指定服务器上将要发送的文件
		request.open("GET","gallery.html", true );
		//第三个参数用于指定请求是否异步发送和处理
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				alert("Response Received");
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appendChild(txt);
				// var divnew = ;
				document.getElementById('new').appendChild(para);
			}
			};
			request.send(null);
	// XMLHttpRequest cannot load 
	// file:///K:/WebLearning/bs3test/page/ajaxgettext.txt. 
	// Cross origin requests are only supported for protocol schemes: 
	// http, data, chrome, chrome-extension, https, chrome-extension-resource.
	// 运行时出现了同源策略错误，限制了Ajax请求使用的协议
	//Uncaught NetworkError: 
	//Failed to execute 'send' on 'XMLHttpRequest': 
	//Failed to load 'file:///K:/WebLearning/bs3test/page/ajaxgettext.txt'.
		}else{
			alert('sorry,your browser doesn\'t support XMLHttpRequest');
		}
		alert("Function Done");
	}
addLoadEvent(getNewContent);