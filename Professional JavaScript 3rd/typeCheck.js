// 由于原生数组的构造函数名与全局作用域无关，因此使用 toString() 就能保证返回一致的值，利用这一点，可以创建如下函数

function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]'
}

function isFunction(value) {
    return Object.prototype.toString.call(value) == '[object Function]'
}

function isRegExp(value) {
    return Object.prototype.toString.call(value) == '[object RegExp]'
}

// 以上的技巧不能检测非原生构造函数的构造函数名，开发人员定义的任何构造函数都将返回 [Object Object]
var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON) == '[object JSON]'

// 这个技巧可以对任何对象给出正确的结论


