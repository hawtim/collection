function showPic(whichpic){
	if(!document.getElementById("placeholder")) return  false;
	//检查placeholder是否存在，如果不存在该区域则不做切换
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	if(placeholder.nodeName != "IMG") return false;
	placeholder.setAttribute("src",source);
	if(document.getElementById("des")){
	//检查是否存在图片说明文字，如果不存在则不修改
	var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
	var description = document.getElementById("des");
	if(des.firstChild.nodeType == 3)
	description.firstChild.nodeValue = text;
	}
	return true;
	// 将href作为参数传递给getAttribute，再把路径传入变量source
	// 获取id为placeholder的占位图图片
	// 并将它的来源路径改为在source里保存的路径
}

function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++){
		links[i].onclick = function(){
			return showPic(this)? false : true;
		}
		// links[i].onkeypress = links[i].onclick;
		// onkeypress带来的问题很多。onclick其实可以实现它的效果
	}
}

function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
// 测试浏览器是否支持
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","../img/pic-ep1.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","des");
	var destext = document.createTextNode("选择图片");
	description.appendChild(destext);
	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,placeholder);
	//======以下为在galley前面插入placeholder和description========
	// document.getElementsByTagName("body")[0].appendChild(placeholder);
	// document.getElementsByTagName("body")[0].appendChild(description);
	// var gallery = document.getElementById("imagegallery");
	// gallery.parentNode.insertBefore(placeholder,gallery);
	// gallery.parentNode.insertBefore(description,gallery);
}


function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	//把目标元素的parentNode属性保存到变量parent里
	if(parent.lastChild == targetElement){
	//检查目标元素是不是parent的最后一个子元素
		parent.appendChild(newElement);
		// 如果是，就用appendChild方法将新元素追加到parent上，
		// 这样新元素就恰好被插入到目标元素之后
	}else{
		// 如果不是，把新元素插入到目标元素和目标元素的下一个兄弟元素之间
		// 目标元素的下一兄弟元素即目标元素的nextSibling属性
		// 使用parent.insertBefore方法把新元素插入到目标元素的
		// 下一个兄弟元素之前
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
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
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);



// window.onload =prepareGallery;

// window.onload = function(){
// 	prepareGallery();
// }
// ===以上是三种在页面加载完之后调用函数的方法，
// 启用的一种是弹性最好的解决办法，可针对不同的变化进行修改




//以下为计算节点数的函数
// function countBodyChildren(){
// 	var body_element = document.getElementsByTagName("body")[0];
// 	body_element.childNodes;
// 	alert(body_element.nodeType);
// }
// window.onload = countBodyChildren;
