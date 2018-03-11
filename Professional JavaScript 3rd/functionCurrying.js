function add(num1, num2) {
    return num1 + num2
}

function curriedAdd(num2) {
    return add(5, num2)
}

// 调用另一个函数并为它传入要柯里化的函数和必要的参数

function curry(fn) {
    // 此时 arguments 是 curry(add, xxx, xxx, xxxx)
    var args = Array.prototype.slice.call(arguments, 1)
    // args 获取 xxx, xxx, xxxx
    return function() {
        // 此时 arguments 是返回的函数传入的参数 
        // 例如 curriedAdd(3) 
        // 此时 arguments 是 3
        var innerArgs = Array.prototype.slice.call(arguments)
        // 所以最后参数就是 xxx, xxx, xxxx, 3
        var finalArgs = args.concat(innerArgs)
        // 也即是 add(xxx, xxx, xxxx, 3)
        return fn.apply(null, finalArgs)
    }
}

// 可以用以下两种方式

function add(num1, num2) {
    return num1 + num2
}

var curriedAdd = curry(add, 5)
curriedAdd(3)

// 或

function add(num1, num2) {
    return num1 + num2
}

var curriedAdd = curry(add, 5, 12)
curriedAdd()

// 使用 curry 构造更为复杂的 bind() 函数

function bind(fn, context) {
    var args = Array.prototype.slice.call(arguments, 2)
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments)
        var finalArgs = args.concat(innerArgs)
        return fn.apply(context, finalArgs)
    }
}

// 当使用 bind() 时， 它会返回绑定到给定环境的函数，某些函数参数已经被设好
// 当你想除了 event 对象再额外给事件处理程序传递参数时，这非常有用

var handler = {
    message: 'Event handled',
    handleClick: function(name, event){
        alert(this.message + ":" + name + ":" + event.type);
    }
}
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler, "my-btn"));

// ES5 的 bind 函数也实现函数柯里化
var btn = document.getElementById('my-btn')
EventUtil.addHandler(btn, 'click', handler.handleClick.bind(handler, 'my-btn'))

// 闭包的有哪些使用，bind 和 curry

// javascript 中的柯里化函数和绑定函数提供了强大的动态函数创建功能，
// 使用 bind 和 curry 要根据是否需要 object 对象响应来决定
// NOTE： “两者的区别在于，当函数被调用时，返回的函数还需要设置一些传入的参数”
// 都能用于创建复杂的算法和功能，每个函数都会带来额外的开销
