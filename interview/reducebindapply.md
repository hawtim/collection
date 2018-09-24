## 手写 reduce bind map实现
call 和 apply 都是为了解决改变 this 的指向问题，作用是相同的，只是传参的形式不同
除了第一个参数外，call 是一个参数列表， apply 是一个参数数组
bind 的作用也是一致的，只是该方法会返回一个函数，可以通过 bind 函数实现柯里化

```js
let a = {
    value: 1
}
function getValue(name, age) {
    console.log(name, age)
    console.log(this.value)
}
getValue.call(a, 'yck', 24)
getValue.apply(a, ['yck', 24])
```
模拟实现 call 和 apply
不传入第一个参数，那么默认为window，改变了this 指向，让新的对象可以执行该函数
**思路变成给新的对象添加一个函数，然后在执行完以后删除**
```js
Function.prototype.myCall = function (context) {
    var context = context || window
    // 当执行 getValue.myCall(a, 'yck', 24)， this 指向 getValue，
    //  context 是 a，所以效果就是 getValue.myCall(a, 'yck', 24) 
    //  a.fn = getValue
    context.fn = this
    // 将 context 后面的参数取出来
    var args = [...arguments].slice(1)
    var result = context.fn(...args)
    delete context.fn
    return result // 返回 getValue 返回的值
}
```
apply 的实现也类似
```js
Function.prototype.myApply = function (context) {
    var context = context || window
    //  a.fn = getValue
    context.fn = this
    var arg = arguments[1]
    if (arg) {
        context.fn(...arg)
    } else {
        context.fn()
    }
    delete context.fn
    return result
}
// getValue.myApply(a, ['yck', 24])
```
bind 的作用也是一致的，只是该方法会返回一个函数，可以通过 bind 函数实现柯里化
```js
Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    var _this = this
    var args = [...arguments].slice(1)
    // 闭包实现柯里化
    return function F() {
         // 因为返回了一个函数，我们可以 new F()，所以需要判断
        //  一个绑定函数也能使用 new 操作符创建对象， 这种行为就像把原函数当成构造器，提供的 this 值被忽略，同时调用时的参数被提供给模拟函数
        if (this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context, args.concat(...arguments))
    }
}

var module = {
  x: 42,
  getX: function(a, b) {
      console.log(a, b)
    return this.x;
  }
}
var getx = module.getX // this 指向全局

getx.bind(module, 1, 2) // => getX，此时 this 指向 module 而不是全局

new (getx.bind(module, 1, 2), 1)

```

```js
// 用原型对象来扩展方法会出现 方法可以被 for...in 遍历出来的问题
Array.prototype._map = function(callback, /*, thisArg*/) {
    if (this == null) {
        throw new TypeError('null or undefined')
    }
     if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    var oldArr = Object(this)
    var len = oldArr.length >>> 0
    // var len = +oldArr.length || 0
    var thisArg
    if (argumets.length > 1) {
        thisArg = arguments[1]
    }
    var newArr = new Array(len)
    var k = 0
    while (k < len) {
        if (k in oldArr) {
            newArr[k] = callback.call(thisArg, oldArr[k], k, oldArr) // element, index, array
        }
        k++
    }
    return newArr

}
// 用 ES5 的 Object.defineProperty 实现不可遍历
Object.defineProperty(Array.prototype, '_map', {
    value(callback) {
        if (this == null) {
        throw new TypeError('null or undefined')
    }
     if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    var oldArr = Object(this)
    var len = oldArr.length >>> 0
    // var len = +oldArr.length || 0
    var thisArg
    if (arguments.length > 1) {
        thisArg = arguments[1]
    }
    var newArr = new Array(len)
    var k = 0
    while (k < len) {
        if (k in oldArr) {
            newArr[k] = callback.call(thisArg, oldArr[k], k, oldArr) // element, index, array
        }
        k++
    }
    return newArr
    }
})

```