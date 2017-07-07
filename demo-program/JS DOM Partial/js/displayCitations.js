/**
 * [displayCitations description]
 * @return {[type]} [description]
 */
function displayCitations(){
	if(!document.getElementsByTagName || 
		!document.createElement || !document.createTextNode) 
		return false;
	// 取得所有引用
	var quotes = document.getElementsByTagName("blockquote")
	// 遍历引用
	for (var i = 0;i<quotes.length;i++ ){
		// 测试当前节点下有无cite属性
		// 如果！.getAttribute("cite")为真，则跳出循环（没有cite属性，继续循环）
		if(!quotes[i].getAttribute("cite"))  continue;
		// 保存cite属性
		var url = quotes[i].getAttribute("cite");
		//////////////////////////
		// quotes[i].lastChild; //
		//////////////////////////
		// 取得引用中的所有元素节点
		var quoteElements = quotes[i].getElementsByTagName("*");
		// 如果没有元素节点，继续循环
		if(quoteElements.length < 1) continue;
		// 取得引用中最后一个元素节点，，数组的最后一个元素的下标不等于数组长度，而是数组长度减去1
		var elem = quoteElements[quoteElements.length - 1]
		// 创建链接标记
		var link = document.createElement("a");
		var link_text = document.createTextNode("文献来源")
		link.appendChild(link_text);
		// 给a标签添加href属性
		link.setAttribute("href" ,url );
		var superscript = document.createElement("sup")
		superscript.appendChild(link)
		// 把标记添加到引用中的最后一个元素节点
		elem.appendChild(superscript);
	}
}

addLoadEvent(displayCitations)