/**
 * [displayAbbreviations description]
 * @return {[type]} [description]
 */
function displayAbbreviations(){
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
	var abbreviations = document.getElementsByTagName("abbr");
	// 判断文档里是否有abbr标签,
	if(abbreviations.length < 1) return false;
	//
	var defs = new Array();
	//遍历这些缩略词
	for(var i = 0;i<abbreviations.length;i++){
		current_abbr = abbreviations[i]
		// 如果当前的current_abbr的没有子节点，则跳出当前循环开始下一次循环
		if(current_abbr.childNodes.length < 1) continue;
		//definition 的值为当前缩略语的title属性的值
		var definition = current_abbr.getAttribute("title");
		//key 的值为当前缩略语的最后一个节点的节点值，也就是内容节点的值
		var key = current_abbr.lastChild.nodeValue;
		// 现在有两个变量了，所以用一对键值对来讲键和值保存到defs数组中
		defs[key] = definition;
		console.log(defs[key] = definition);
		// 通过把其中之一用做数组元素的下标（键）。另一个用做数组元素的值的方式来同时保存这两个值
	}
	// 理论上讲可以这样写，只是比较难读懂
	// for(var i = 0;i<abbreviations.length;i++){
	// defs[abbreviations[i].lastChild.nodeValue] = abbreviations[i].getAttribute("title");
	// 创建定义列表dl   diallist
	var dlist = document.createElement("dl");
	// 遍历定义
	for(key in defs){
		// 对于关联数组里的每个键，把它的值赋给变量key
		var definition = defs[key];
		// 和上面那句defs[key] = definition
		// 两个definition都是局部变量,不互相影响
		// 创建定义标题
		var dtitle = document.createElement("dt");
		//创建内容节点的值为key
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		// 创建定义描述
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		// 把它们添加到定义列表
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length < 1) return false;
	// 违背了结构化程序设计的原则，这相当于在函数中间增加了一个出口点
	// 如果不能识别abbr标签的浏览器就会生成一个空的def数组，所以将不会创建出任何dt和dd元素，
	// 如果对应于“缩略表列表”的那个dl元素没有任何子节点，则立即退出displayAbbreivations函数
	// 创建标题
	var header = document.createElement("h4");
	var header_text = document.createTextNode("Abbreviations");
	// 以下两者默认添加到页面尾部
	header.appendChild(header_text);
	// 把标题添加到页面的主体中
	document.body.appendChild(header_text);
	// 把定义列表添加到页面主体中
	document.body.appendChild(dlist);
	// window.onload = displayAbbreviations;
}
addLoadEvent(displayAbbreviations);