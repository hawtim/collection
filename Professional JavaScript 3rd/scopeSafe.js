// 作用域安全的构造函数

// 构造函数其实就是一个使用 new 操作符调用的函数

function Person(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
}

var person = new Person('hawtim', 25, 'Software Engineer')


// 当以上的代码忽略了 new 操作符来调用构造函数时，由于 this 对象是在运行时绑定的额，所以此时 this 会映射到全局对象 window 上

// 作用域安全的构造函数在进行任何更改前，首先确认this对象是正确类型的实例

function Person(name, age, job) {
    if (this instanceof Person) {
        this.name = name
        this.age = age
        this.job = job
    } else {
        return new Person(name, age, job)
    }
}

// 以上的代码简单的避免了在全局对象上意外设置属性，组合继承（最常用的继承方法）


function Polygon(sides) {
    if (this instanceof Polygon) {
        this.sides = sides
        this.getArea = function () {
            return 0
        }
    } else {
        return new Polygon(sides)
    }
}

function Rectangle(width, height) {
    Polygon.call(this, 2)
    this.width = width
    this.height = height
    this.getArea = function() {
        return this.width * this.height
    }
}

Rectangle.prototype = new Polygon()

var rect = new Rectangle(5, 10)
console.log(rect.sides)