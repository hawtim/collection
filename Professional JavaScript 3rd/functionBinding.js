var handler = {
    message: "Event handled",
    handleClick: function (event) {
        alert(this.message);
    }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", handler.handleClick);

// 此时为 undefined

var handler = {
    message: "Event handled",
    handleClick: function (event) {
        alert(this.message);
    }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", function (event) {
    handler.handleClick(event)
});

// 创建多个闭包可能会令代码变得难于理解和调试，一般javascript 库偶会实现一个可以将函数绑定到执行环境的函数，一般叫 bind()

function bind(fn, context) {
    return function() {
        return fn.apply(context, arguments) // 如下的例子，此时 arguments 是 event 对象
    }
}

var handler = {
    message: "Event handled",
    handleClick: function (event) {
        alert(this.message);
    }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler));

// 现在已在原生ES5 中实现
EventUtil.addHandler(btn, "click", handler.handleClick.bind(handler));












