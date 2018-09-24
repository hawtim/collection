// 1 修饰类本身

function testDecorator(desc) {
    return function (target) {
        target.addParam = desc
    }
}

//调用testDecorator函数之后，其又返回一个匿名函数，利用闭包的特性使用了decs变量
@testDecorator("operate  one")
class ClassA {}
console.log(ClassA)
console.log(ClassA.addParam) // operate  one

@testDecorator("operate  two")
class ClassB {}
console.log(ClassB.addParam) // operate  two

// 以上的例子添加了静态属性
// 添加实例属性可以通过 prototype 对象操作
function testable(target) {
    target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();
console.log(obj)
console.log(obj.isTestable) // true

// 通过 maxins 装饰器给类添加上新属性
function maxins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list)
    }
}

let Foo = {
    foo: () => {
        console.log('foo')
    }
}

Foo.foo()

@maxins(Foo)
class ClassC {}

let C = new ClassC()
C.foo()
console.log(C) // ClassC {}  ClassC 本身是没有 foo 属性的，因为添加的是实例属性

// 实际的React 项目开发中，常常需要写成下面这样

// class MyReactComponent extends React.Component {}
// export default connect(mapStateToProps, mapDispacthToProps)(MyReactComponent)

// 使用装饰器后，可以简化代码
// @connect(mapStateToProps, mapDispacthToProps)
// export default class MyReactComponent extends React.Component


// 2. 修饰类的属性/方法

class Person {
    @readonly
    username() {
        console.log('is readonly')
    }
}
// 接收三个参数，第一个是类的原型对象，第二个是所要修饰的属性名，第三个参数是该属性的描述对象
function readonly(target, name, descriptor) {
    console.log('name', name)
    descriptor.writable = false
    return descriptor
}

let person = new Person()
console.log(person)
person.username()

// e.g
class Math {
    @log
    add(a, b) {
        return a + b
    }
}

function log(target, name, descriptor) {
    var oldValue = descriptor.value
    console.log(oldValue)
    console.log(name, descriptor)
    descriptor.value = function() {
        console.log(name)
        console.log(`Calling ${name} with`, arguments)
        return oldValue.apply(this, arguments)
    }
    return descriptor
}

const math = new Math()

math.add(2, 4)


// // 原本是
// function add(a, b) {
//     return a + b
// }

// // 变成
// function anonymousFunction() {
//     console.log(`Calling with`, arguments)
//     return add.apply(this, arguments)
// }

// 使用 Decorator 写法的 react 组件
@Component({
    tag: 'my-component',
    styleUrl: 'my-component.scss'
})

export class MyComponent {
    @Prop() first: String
    @Prop() last: String
    @State() isVisible: Boolean = true
    render() {
        return {
            <p>Hello, my name is {this.first} {this.last}</p>
        }
    }
}


// 3 注释功能
function dec(id) {
    console.log('evaluated', id)
    return (target, property, descriptor) => console.log('executed', id)
}

class Example {
    @dec(1)
    @dec(2)
    method() {
        console.log('method')
    }
}

let example = new Example()
example.method()

// 此外装饰器还可以用来类型检查，因此这一功能相当重要

// 不能将装饰器用于函数
// 装饰器只能用于类和类方法，不能用于函数，因为存在函数提升，编译时会报错

// var counter = 0
// var add = function() {
//     counter++
// }

// @add
// function foo() {
//     console.log('xxxx')
// }

// foo()

// 如果一定要修饰函数,可以采用高阶函数的形式直接执行

function doSomething(name) {
    console.log('hello', name)
}

function loggingDecorator(wrapped) {
    return function() {
        console.log('Starting')
        const result = wrapped.apply(this, arguments)
        console.log('Finished')
        return result
    }
}