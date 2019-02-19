function addLoadEvent(func){
	var oldonload = window.onload;
	//把现有的window.onload事件处理函数的值存入局部变量oldonload中
	if(typeof window.onload !='function'){
		window.onload = func;
		//如果没有绑定任何函数，就像平时一样添加新函数
	}else{
		window.onload = function(){
		//如果已经绑定，就把新函数追加到现有指令的末尾
			oldonload();
			func();
		}
	}
}