function highlightRows(){//强调被hover 的行数
	if(!document.getElementsByTagName) return false;
	var rows = document.getElementsByTagName("tr");
	for(var i = 0;i < rows.length; i ++){
		rows[i].onmouseover = function(){
			this.style.fontWeight = "bold";//加粗
			this.style.fontSize = "1.6em";
		}
		rows[i].onmouseout = function(){
			this.style.fontWeight = "normal";//复原
			this.style.fontSize = "1.0em";
		}
	}
}
addLoadEvent(highlightRows);