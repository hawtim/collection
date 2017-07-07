/**
 * @file univesityCard js file
 * @author hawtim(hawtim_zhang@qq.com)
*/
'use strict';
var $$ = function (id) {
    // 检查浏览器是否支持函数中使用到的DOM方法
    if (!document.getElementById) {
        return false;
    }

    return document.getElementById(id);
};
function hideElement(){
	var hide = $$("moneyamount");
	hide.onclick = function(){
		hide.style.display = "none";
	}
}

// 获得选择的金额
function getSelectMoney() {
    // 检查浏览器是否支持函数中使用到的DOM方法
    if (!document.getElementsByTagName) {
        return false;
    }

    // 获得金额选择列表的id
    var btnSelect = $$("select-money");
    var curSelect = btnSelect.getElementsByTagName("span")[0];
    var oSelect = btnSelect.getElementsByTagName("select")[0];
    var aOption = btnSelect.getElementsByTagName("option");
    console.log(curSelect.innerHTML);
    console.log(oSelect.options[oSelect.selectedIndex].value);
    // 选项改变时，将选项值写入span标签中
    oSelect.onclick = function () {
        var text = oSelect.options[oSelect.selectedIndex].text;
        curSelect.innerHTML = text;
        curSelect.style.color = "#000";
        console.log(curSelect.innerHTML);
        console.log(oSelect.options[oSelect.selectedIndex].value);
    };
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    // 把现有的window.onload事件处理函数的值存入局部变量oldonload中
    if (typeof window.onload !== "function") {
        window.onload = func;
    // 如果没有绑定任何函数，就像平时一样添加新函数
    }
    else {
        window.onload = function () {
            // 如果已经绑定，就把新函数追加到现有指令的末尾
            oldonload();
            func();
        };
    }
}
addLoadEvent(hideElement);
addLoadEvent(getSelectMoney);
