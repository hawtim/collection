function stripeTables(){
	if(!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	var odd ,rows;//odd为奇数，even为偶数，rows为行数
	for(var i = 0; i <tables.length;i++ ){//遍历所有的table
		odd = false;//如果odd为false.  odd=false  ==> odd = 0;
		rows = tables[i].getElementsByTagName("tr");//get table 的tr标签
		for (var j = 0 ;j < rows.length;j++){//遍历table 的tr标签，j从0开始，也就是下角标从0开始
			if(odd == true){//如果odd的值是true，设置样式并把odd变量修改为false
				addClass(rows[j],"odd");
				odd = false;
			}else{//如果odd的值是false，不设置样式，但把odd变量修改为true
				odd = true;
			}
		}
	}
}
addLoadEvent(stripeTables);