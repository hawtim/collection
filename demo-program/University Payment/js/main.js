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
/**
 * [myFunction 条件检测和判断，当满足所有条件时，链接启用;
 * 当不满足时，页面不跳转，同时display：block警告信息]
 * @return {[string]} [返回字符型数据]
 */

function myFunction() {
    // 检测dom方法
    if (!document.getElementById) {
        return false;
    }
    // 检测dom方法
    if (!document.getElementsByTagName) {
        return false;
    }
    //<a id="tijiao" submit="submit"  class="btn" href="./pages/confirm.html" >立即充值</a>
    var tijiao = $$('tijiao');
    //警告信息，<em class="alert" id="alert" style="display:none;">姓名或学号有误</em>
    var para = $$('alert');
    //姓名输入框
    var xingming = $$('name');
    //学号输入框
    var xuehao = $$('id');
    //<a class="select-money" id="select-money" >
    var btnSelect = $$("select-money");
    // <span class="moneyamount" name="moneyamount" id="moneyamount">充值金额(元)</span>
    var curSelect = btnSelect.getElementsByTagName("span")[0];
    // <select class="css" id="momey">
    var oSelect = btnSelect.getElementsByTagName("select")[0];
    /*<option value ="none" selected disabled>&nbsp;</option>
    <option value ="30">30元</option>
    <option value ="50">50元</option>
    <option value ="100">100元</option>
    <option value ="300">300元</option>*/
    var aOption = btnSelect.getElementsByTagName("option");
    // 当前span里的文字
    console.log(curSelect.innerHTML);
    //金额选择框的值
    console.log(oSelect.options[oSelect.selectedIndex].value);
    //输出名字的值
    console.log(xingming.value);
    //输出学号的值
    console.log(xuehao.value);
/**
 * 以下这段代码要达到的结果就是姓名和学号的布尔值都是true，
而金额的选项的value值不为none的时候，条件成立，提交按钮的链接属性值变成可点击   oSelect.options[oSelect.selectedIndex].value
 * [if description]
 * @param  {[type]} xingming.value &&            xuehao.value ! [description]
 * @return {[type]}                [description]
 */
    if (xingming.value && xuehao.value != 0 && oSelect.options[oSelect.selectedIndex].value != "none") {
        tijiao.href = './pages/confirm.html';
        para.style.display = 'none';
    }
    else {
        tijiao.href = 'javascript:;';
        para.style.display = 'block';
        console.log('false');
    }
}
