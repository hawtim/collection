// 抽象
function addClass(element,value){
	if(!element.className){//如果元素的className不存在，则把当前的value赋值给元素的className
		element.className = value;
	}else{
		newClassName = element.className;//新的classname等于旧的className
		newClassName += " ";//newClassName = newClassName + " "
		newClassName += value;//newClassName = newClassName + value;
		//其实可以写成一句，newClassName += " " + value
		element.className = newClassName;
	}
}
