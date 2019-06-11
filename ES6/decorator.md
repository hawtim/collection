# 装饰器

## 添加静态属性(修饰类本身)

```js
function testDecorator(desc) {
    return function (target) {
        target.addParam = desc
    }
}
// 调用 testDecorator 函数之后，其又返回一个作用于描述符的匿名函数，利用闭包的特性使用了 decs 变量
@testDecorator("operate  one")
class ClassA {}
console.log(ClassA) // class ClassA {}
console.log(ClassA.addParam) // operate  one

@testDecorator("operate  two")
class ClassB {}
console.log(ClassB.addParam) // operate  two

```

## 添加实例属性(通过 prototype 对象操作)

```js
function testable(target) {
    target.prototype.isTestable = true;
}

@testable
class MyTestableClass {}

let obj = new MyTestableClass();

console.log(obj.isTestable) // true
```

## 通过 mixins 装饰器给类添加上新属性

```js
function mixins(...mixin) {
    return function (target) {
        Object.assign(target.prototype, ...mixin)
    }
}

let Foo = {
    foo: () => {
        console.log('foo')
    }
}

Foo.foo()

@mixins(Foo)

let C = new ClassC()
C.foo()
// ClassC {}  ClassC 本身是没有 foo 属性的，因为添加的是实例属性
console.log(C)
```

## 实际的 React 项目开发中，常常需要写成下面这样

```js
class MyReactComponent extends React.Component {}
export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent)
```

### 使用装饰器后，可以简化代码

```js
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component
```

## 修饰类的属性/方法

接收三个参数，**类的原型对象 要修饰的属性名 属性的描述对象**

```js
function readonly(target, name, descriptor) {
    console.log('name', name)
    descriptor.writable = false
    return descriptor
}
class Person {
    @readonly
    username() {
        console.log('is readonly')
    }
}
let person = new Person()
console.log(person)
person.username() // name /n is readonly
```

## 另外一个例子

```js
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

// 原本是
function add(a, b) {
    return a + b
}

// 变成
function anonymousFunction() {
    console.log(`Calling with`, arguments)
    return add.apply(this, arguments)
}
```

### 使用 Decorator 写法的 react 组件

```js
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

```

### 注释功能

```js
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
```

### 类型检查

不能将装饰器用于函数，装饰器只能用于类和类方法，不能用于函数，因为存在函数提升，编译时会报错

```js
var counter = 0
var add = function() {
    counter++
}

@add
function foo() {
    console.log('xxxx')
}

foo()
```

如果一定要修饰函数,可以采用**高阶函数**的形式直接执行

```js
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

loggingDecorator(doSomething)('hawtim') // Starting \n hello hawtim \n Finished
```
