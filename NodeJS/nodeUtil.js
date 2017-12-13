// util.inherits(constructor, superConstructor)
// 是一个实现对象间原型继承 的函数

var util = require('util')
function Base() {
    this.name = 'dueb'
    this.base = 1994
    this.sayHello = function() {
        console.log('Hello ' + this.name)
    }
}

Base.prototype.showName = function() {
    console.log(this.name)
}

function Sub() {
    this.name = 'ass'
}

util.inherits(Sub, Base) // TODO 看不出继承在哪？

var objBase = new Base()
objBase.showName()
objBase.sayHello()

console.log(objBase)

var objSub = new Sub()
objSub.showName()
console.log(objSub)
