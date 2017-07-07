function prepareSlideshow(){
	//检测浏览器是否支持dom
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	//确保元素存在
	if(!document.getElementById("linklist")) return false;
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src","img/topics.jpg");
	preview.setAttribute("alt","building blocks of web design");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	var list =document.getElementById("linklist");
	insertAfter(slideshow,list);
	//获得列表中所有的链接
	var links = list.getElementsByTagName("a");
	// 为mouseover事件添加动画效果
	links[0].onmouseover = function(){
		moveElement("preview",0,0,10);
	}
	links[1].onmouseover = function(){
		moveElement("preview",-241,0,10);
	}
	links[2].onmouseover = function(){
		moveElement("preview",-482,0,10);
	}
}



addLoadEvent(prepareSlideshow);