/**
 * [styleHeaderSiblings 标题下的后辈元素添加属性]
 * @param  {[type]} tag      [要获取标签名]
 * @param  {[type]} theclass [要给tag加上的类名]
 * @return {[type]}          [返回函数是否正常运行的布尔值]
 */
"use strict";
function styleHeaderSiblings(tag, theclass){
    if(!document.getElementsByTagName) return false;
    // 先找出节点中需要的tag标签
    var elems = document.getElementsByTagName(tag);
    var elem;
    // 遍历节点集合中的所有元素
    for (var i = 0 ; i < elems.length;i++){
        // 找出文档的下一节点用nextSibling属性
        elem = getNextElement(elems[i].nextSibling);
        // elem.setAttribute("class","intro");
        // 最简单，可读可写的属性
        // elem.className = "intro";
        // 可以用className获得一个元素的class属性
        // 也可以用过赋值操作符设置class属性
        // 现在只需与css打交道就可以了
        // 通过className设置的某个元素的class属性时将替换元素原有的class设置
        // elem.className += "intro";
        addClass(elem, theclass);
    }
}

/**
 * [getNextElement 获取元素的下一个节点]
 * @param  {[type]} node [description]
 * @return {[type]}      [description]
 */
function getNextElement(node){
    if(node.nodeType == 1){//如果节点存在，返回节点
        return node;
    }
    if(node.nextSibling){//如果节点的相邻节点存在，返回相邻节点
        return getNextElement(node.nextSibling);
    }
    return null;//否则返回null
}

// 抽象
addLoadEvent(function(){
    styleHeaderSiblings("h1","intro");//tag ="h1" theclass = "intro"
    styleHeaderSiblings("h1","capitalize");
});