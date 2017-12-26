import { Array } from 'core-js/library/web/timers';

var util = require('util')

function Base() {
    this.name = 'base'
    this.base = 1991
    this.sayHello = function() {
        console.log('Hello ' + this.name)
    }
}

Base.prototype.showName = function() {
    console.log(this.name)
}

function Sub() {
  this.name = 'sub'
}

util.inherits(Sub, Base)
console.log(Sub)

var objBase = new Base()
objBase.showName()
objBase.sayHello()
console.log(objBase)
var objSub = new Sub()
objSub.showName()
// objSub.sayHello()
console.log(objSub)
// 注意：Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属性
// 和 sayHello 函数都没有被 Sub 继承。



// util.inspect(object, [showHidden], [depth], [colors]) 是一个将任意对象转换为字符串的方法，
// 通常用于调试和错误输出，它至少接受一个参数Object，即要转换的对象。

// showHidden 是一个可选参数，如果值为true 将会输出更多隐藏信息
// depth表示最大递归的层数，如果对象很复杂， 你可以指定层数以控制输出信息的多少。
// 如果不指定depth，默认会递归2层，指定为null表示将不限递归层数完成遍历对象
// 如果color值为true，输出格式将以ANSI颜色编码，通常用于在终端显示更漂亮的效果

function Person() {
    this.name = 'hawtim'
    this.toString = function() {
        return this.name
    }
}
var obj = new Person()
console.log(util.inspect(obj))
console.log(util.inspect(obj, true))

// util.isArray(object)
// 如果给定的参数object 是一个数组返回true否则返回false
// util.isArray([])
// util.isArray(new Array)


// util.isRegExp(object)

// util.isDate(object)

// util.isError(object)

