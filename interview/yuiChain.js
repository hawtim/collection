// https://www.cnblogs.com/youxin/p/3410185.html
// 在Node类提供了importMethods方法来导入Dom中相同的方法并支持链式调用
//Dom类及静态方法
function Dom(id) {
    this.dom = document.getElementById(id);
}

Dom.setStyle = function (node, name, value) {
    node.dom.style[name] = value;
}

Dom.setAttribute = function (node, name, v) {
    node.dom.setAttribute(name, v);
}


//Node类
function Node(id) {
    this.dom = document.getElementById(id);
}

//添加方法的函数
Node.addMethod = function (method, fn) { //,context
    Node.prototype[method] = function () {
        var me = this;
        arguments = Array.prototype.slice.call(arguments); //Array.prototype.unshift.call(arguments,me);
        arguments.unshift(me);
        fn.apply(me, arguments);
        return me;
    }
}


//批量添加方法的函数
Node.importMethods = function (host, methods) {
    for (var i in methods) {
        var m = methods[i];
        var fn = host[m];
        Node.addMethod(m, fn);
    }
}


//定义需要给Node类添加的方法名 列表
var methods = ['setStyle', 'setAttribute'];

//使用批量添加方法的函数将Dom中的相关方法添加到Node中
Node.importMethods(Dom, methods);

//可以在Node中进行链式调用
var n = new Node('log').setStyle('border', '2px solid red').setAttribute('t', 22);