function myFunction1(){
	// var para = document.createElement("p");
	// var info = "nodeName : ";
	// info += para.nodeName;
	// info += " nodeType: ";
	// info += para.nodeType;
	// alert(info);
	var para = document.createElement("p");
	var txt = document.createTextNode("Hello world");
	para.appendChild(txt);
	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);
}

function myFunction2(){
	var para = document.createElement("p");
	var txt1 = document.createTextNode("This is ");
	var emphasis = document.createElement("em");
	var txt2 = document.createTextNode("my");
	var txt3 = document.createTextNode(" content.")
	para.appendChild(txt1);
	emphasis.appendChild(txt2);
	para.appendChild(emphasis);
	para.appendChild(txt3);
	var testdiv = document.getElementById("testdiv");
	testdiv.appendChild(para);

}

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
addLoadEvent(myFunction1);
addLoadEvent(myFunction2);

