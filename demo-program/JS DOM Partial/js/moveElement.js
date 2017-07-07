/**
 * [moveElement 创建元素移动的函数]
 * @param  {[type]} elementID [打算移动的元素id]
 * @param  {[type]} final_x   [元素的目的地左的位置]
 * @param  {[type]} final_y   [元素的目的地上的位置]
 * @param  {[type]} interval  [两次移动之间的停顿时间]
 * @return {[boolean]}           [函数返回]
 */
function moveElement(elementID,final_x,final_y,interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	/**
	 * [if 原本的全局变量movement会不管上次调用是否把图片移动到位，
	 * 只要moveElement函数在此被调用就会试图把这个图片移动到另外一个地方去，
	 * 于是当用户在链接之间快速移动鼠标时，movement变量就像一条拔河绳一样来回拉扯
	 * 如果用户移动鼠标的速度够快，积累在setTimeout队列里的事件就会导致动画效果产生滞后，
	 * 为了消除滞后现象，可以使用clearTimeout函数清除setTimeout队列里的事件
	 * 如果在还没有设置movement变量之前执行clearTimeo语句会得到一个错误
	 * 但又不能使用局部变量，因为那样局部变量movement在clearTimeout函数的上下文中不存在]
	 * @param  {[type]} elem.movement [所以需要过一个介乎于全局变量和局部变量之间的东西，
	 * 需要一个只与正在被移动的那个元素有关的变量只与某个特定元素有关的变量是存在的，
	 * 事实上那就是“属性” elem.property = value ]
	 * @return {[type]}               [description]
	 */
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	//elem对象对应你想要移动的任何元素
	/**
	 * [if 即使elem元素的left、top属性未被设置，也将他们的默认值设置为0px]
	 * @param  {[type]} !elem.style.left [description]
	 * @return {[type]}                  [description]
	 */
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dist = 0;
	//接下来检查是否到达目的地
	//目的地的坐标值变量由final_x and final_y提供，
	if(xpos == final_x && ypos == final_y) {
		return true;
	}
	// 接下来我们试图加快图片的移动速度
	if(xpos < final_x){
		//////////////
		// xpos ++; //
		//////////////
		dist = Math.ceil((final_x - xpos)/10);
		xpos = xpos + dist;
		// Math.ceil(number)返回不小于dist的值的一个整数
		// Math.floor(number)返回不大于dist的值的一个整数
		// Math.round(number)将把任意浮点数舍入为与之最接近的整数
	}
	if(xpos > final_x){
		//////////////
		// xpos --; //
		//////////////
		dist = Math.ceil((xpos - final_x)/10);
		xpos = xpos - dist;
	}
	if(ypos < final_y){
		//////////////
		// ypos ++; //
		//////////////
		dist = Math.ceil((final_y - ypos)/10);
		ypos = ypos + dist;
	}
	if(ypos > final_y){
		//////////////
		// ypos --; //
		//////////////
		dist = Math.ceil((ypos - final_y)/10);
		ypos = ypos - dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	// elem的movement属性，自己定义的属性，
	// 不管moveElement正在移动的是哪个元素，该元素都将获得一个名为movement的属性。
	// 如果该元素在moveElement函数开始执行时已经有了一个movement属性，就应用clearTimeout函数对它进行复位
	elem.movement = setTimeout(repeat,interval);
}