生成实例对象的传统方法是通过构造函数

```js
function Point(x, y) {
    this.x = x
    this.y = y
}

Point.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')'
}

var p = new Point(1, 2)
```
`ES6` 的 `class` 可以看做只是一个语法糖，它的绝大部分功能， `ES5` 都可以做到
新的 `class` 写法只是让对象原型的写法更加清晰，更像面向对象编程的语法而已

```js
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')'
    }
}
```

`ES5` 的构造函数 `Point`, 对应 `ES6` 的 `Point` 类的构造方法

```js
class B {}
let b = new B()
b.constructor === B.prototype.constructor === b.__proto__.constructor === B

```
`ES6` 类的所有方法都定义在类的 `prototype` 属性上面

```js
class Point {
    constructor() {

    }
    toString() {}
    toValue() {}
}
// 等同于
Point.prototype = {
    constructor() {}
    toString() {}
    toValue() {}
}
```
`prototype` 对象的 `constructor` 属性，直接指向类本身，和 `ES5` 一致
另外，类的内部所有定义的方法，都是不可枚举的，这点和 `ES5` 的行为不一致

## constructor 方法
通过 `new` 命令生成对象实例，自动调用该方法。
如果没有显式定义，一个空的 `constructor` 方法会被默认添加
默认返回实例对象 `this` ，完全可以指定返回另外一个对象

与 `ES5` 一样，实例的属性除非显式定义在其本身，否则都是定义在原型上

```js
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

var point = new Point(2, 3)
point.hasOwnProperty('x')
point.hasOwnProperty('y')
point.hasOwnProperty('toString')
point.__proto__.hasOwnProperty('toString')

```
与 `ES5` 一样，类的所有实例共享一个原型对象
```js

var p1 = new Point(2, 3)
var p2 = new Point(3, 2)
p1.__proto__ == p2.__proto__

```

类不存在变量提升

## 私有方法和私有属性

```js
// 用命名 _ 表示这是一个只限于内部使用的私有方法，但是在类的外部还是可以被调用
class Widget {

    foo(baz) {
        this._bar(baz)
    }
    _bar(baz) {
        return this.snaf = baz
    }
}
```
另一种方法就是将私有方法移出模块，因为模块内部的所有方法都是对外可见的
```js
class Widget {
    foo(baz) {
        bar.call(this, baz)
    }
}

function bar(baz) {
    return this.snaf = baz
}
```
## 私有属性/方法的提案
在属性名之前，使用 `#` 表示
因为 `@` 已经留给了 `decorator`
```js
class Foo {
    #a
    #b
    #sum() { return #a + #b}
    printSum() {
        console.log(#sum())
    }
    constructor(a, b) {
        #a = a
        #b = b
    }
}
```

## this 的指向
类的方法内部如果含有 `this` ，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
```js
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
在构造方法中绑定 `this`
```js
class Logger {
    constructor() {
        this.printName = this.printName.bind(this)
    }
}
```
使用箭头函数
```js
class Logger {
    constructor() {
        this.printName = (name = 'there') => {
            this.print(`Hello ${name}`)
        }
    }
}
```

## 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
```js
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
```

## class 的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 `static` 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为静态方法
```js
class Foo {
    static classMethod() {
        return 'hello'
    }
}
Foo.classMethod()
var foo = new Foo()
foo.classMethod()
```
如果静态方法包含 `this` 关键字，这个 `this` 指的是类，而不是实例
```js
class Foo {
    static bar() {
        this.baz()
    }
    static baz() {
        console.log('hello')
    }
    baz() {
        console.log('world')
    }
}

Foo.bar()
```
静态方法 `bar` 调用了 `this.baz`，这里的 `this` 指的是 `Foo` 类，而不是 `Foo` 的实例，等同于调用 `Foo.baz`

父类的静态方法可以被子类继承

```js
class Foo {
    static classMethod() {
        return 'hello'
    }
}

class Bar extends Foo {

}

Bar.classMethod() // 'hello'

```
静态方法可以从 `super` 对象上调用

```js
class Foo {
    static classMethod() {
        return 'hello'
    }
}
class Bar extends Foo {
    static classMethod() {
        return super.classMethod() + ', too'
    }
}

Bar.classMethod()
```

## 类的实例属性

以前我们定义实例属性，只能写在类的 `constructor` 方法里面

```js
class ReactCounter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
}
```
新的写法
```js
class ReactCounter extends React.Component {
    state = {
        count: 0
    }
}
```
最后，对于那些在 `constructor` 里面已经定义的实例属性，新写法允许直接列出

```js
class ReactCounter extends React.Component {
    state
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
}
```

## 类的静态属性

```js
class MyClass {
    static myStaticProp = 42
    constructor() {
        console.log(MyClass.myStaticProp)
    }
}
let myClass = new MyClass()
```

## new.target 属性
`new` 是从构造函数生成实例对象的命令， `es6` 为 `new` 命令引入了一个 `new.target` 属性。该属性一般用在构造函数之中返回 `new` 命令作用于的那个构造函数，如果构造函数不是通过 `new` 命令得到的，`new.target` 会返回 `undefined` ，因此这个属性可以用来确定构造函数是怎么调用的
```js
function Person(name) {
    if (new.target !== undefined) {
        this.name = name
    } else {
        throw new Error('必须使用 new 命令生成实例')
    }
}

var person = new Person('张三')
var notAPerson = Person.call(person, '张三')
```
确保只能通过 `new` 命令调用

**`Class` 内部调用 `new.target`，返回当前 `Class`**，
子类继承父类时，`new.target` 会返回子类，由此可以写出不能被实例化，只能用于继承的类

# 类的继承

```js
class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }
    toString() {
        return this.color + ' ' + super.toString()
    }
}

```

`super` 关键字表示父类的构造函数，用来新建父类的 `this` 对象。
子类必须在 `constructor` 方法中调用 `super` 方法，否则新建实例时会报错。
因为子类自己的 `this` 对象必须通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后在加上子类自己的实例属性和方法， 如果不调用 `super` 方法，子类就得不到 `this` 对象。

## ES5 继承原理
`ES5` 的继承是先创造子类的实例对象 `this` ，然后再将父类的方法添加到 `this` 上面，`Parent.apply(this)`
## ES6 继承原理
`ES6` 的继承是先将父类实例对象的属性和方法加到 `this` 上面，然后用子类的构造函数修改 `this`

```js
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y) // 相当于 Point.prototype.constructor.call(this, x, y)，此时 this 指向 ColorPoint
        this.color = color
    }
}

let cp = new ColorPoint(25, 8, 'green')
cp instanceof ColorPoint
cp instanceof Point

// 实例对象 cp 同时是 ColorPoint 和 Point 两个类的实例，这与 ES5 的行为完全一致

Object.getPrototypeOf(ColorPoint) === Point

// 从子类获取父类，用于判断一个类是否继承了另一个类

```

`super` 作为对象时，在普通方法中，指向父类的原型对象，在静态方法中，指向父类

```js

class A {
    p() {
        return 2
    }
}

class B extends A {
    constructor() {
        super()
        console.log(super.p())
    }
}

let b = new B()
// super 当做对象使用，在普通方法之中，指向 A.prototype 相当于 A.prototype.p()
// 由于指向父类的原型对象，定义在父类实例上的方法或属性，是无法通过super 调用的
class A {
    constructor() {
        this.p = 2
    }
}

class B extends A {
    // constructor() {
    //     super()
    //     console.log(super.p)
    // }
    m() {
        return super.p;
    }
}

let b = new B()
b.m() // undefined
```

`ES6` 规定在子类普通方法中通过 `super` 调用父类的方法时，**方法内部的 `this` 指向当前的子类实例**
```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print(); // 实际上执行的是 A.prototype.print.call(this)
  }
}

let b = new B();
b.m() // 2
```
如果 `super` 做为对象，用在静态方法之中，这是 `super` 将指向父类，而不是父类的原型对象

```js

class Parent {
    // 静态方法定义在类上
    static myMethod(msg) {
        console.log('static', msg)
    }
    // 实例属性定义在类的原型上
    myMethod(msg) {
        console.log('instance', msg)
    }
}

class Child extends Parent {
    static myMethod(msg) {
        super.myMethod(msg) // 静态方法之中的 super 将指向父类，也即是访问 Parent.myMethod(msg)
    }
    myMethod(msg) {
        super.myMethod(msg) // 普通方法，访问方式 Parent.prototype.myMethod.call(this, msg)
    }
}

Child.myMethod(1) // 访问 static myMethod 输出 static 1

var child = new Child()

child.myMethod(2) // instance 2 子类普通方法中通过 super 调用父类的方法，super 指向分类的原型对象，方法内部的 this 指向当前子类的实例
// 所以实际执行的是 Parent.prototype.myMethod.call(this, 2)

```

在子类的静态方法中通过 `super` 调用父类的方法时，方法内部的 `this` 指向当前的子类，而不是子类的实例
```js
class A {
    constructor() {
        this.x = 1
    }
    static print() {
        console.log(this.x)
    }
}

class B extends A {
    // 或者 static x = 3; 浏览器暂时还不支持这种写法
    constructor() {
        super()
        this.x = 2
    }
    static m() {
        super.print()
    }
}

B.x = 3 // 给子类 B 定义了一个静态属性 x

B.m() // 3，如果是子类的实例的话，输出是 2
let b = new B()
b.x // 2
b.__proto__.constructor.x === 3 // true

```
最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用 super 关键字
```js
var obj = {
    toString() {
        return "MyObject: " + super.toString()
    }
}

obj.toString() // MyObject: [object Object]
```

总结： super 中的 this 指向情况有三种
1. 子类普通方法中通过 super 调用父类的方法时，**方法内部的 this 指向当前的子类实例**
2. 如果 super 做为对象，用在子类静态方法之中，**super 将指向父类，而不是父类的原型对象**
3. 子类静态方法中通过 super 调用父类的方法时，**如果父类的方法内部有 this 将指向当前的子类，而不是子类的实例**

## 类的 prototype 属性和 __proto__ 属性

Class 作为构造函数的语法糖，同时有 prototype 属性和 __proto__ 属性，因此同时存在两条继承链
1. 子类的 __proto__ 属性，表示构造函数的继承，总是指向父类
2. 子类 prototype 属性的 __proto__ 属性，表示方法的继承，总是指向父类的 prototype 属性

```js
class A {}
class B extends A {}
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```
类的继承模式如下
```js

Object.setPrototypeOf = function (obj, proto) {
    obj.__proto__ = proto
    return obj
}

class A {}
class B {}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype)
// 等同于 B.prototype.__proto = A.prototype

// B 继承 A 的静态属性
Object.setPrototypeof(B, A)
// 等同于 B.__proto__ = A

const b = new B()

```

## 实例的 __proto__ 属性
子类实例的 __proto__ 属性的 __proto__ 属性，指向父类实例的 __proto__ 属性
子类的原型的原型，是父类的原型
因此通过子类实例的 __proto__.__proto__ 属性，可以修改父类实例的行为
```js
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};

p1.printName() //Ha
```

## 原生构造函数的继承

原生构造函数是指语言内置的构造函数，通常用来生成数据结构
`ES5` 无法做到继承原生构造函数，`ES5` 是先新建子类的实例对象 `this` ， 再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生构造函数
`ES6` 是先新建父类的实例对象 `this` ， 再用子类的构造函数修饰 `this` ，使得父类所有行为都可以继承

带版本功能的数组
```js
class VersionedArray extends Array {
    constructor() {
        super()
        this.history = [[]]
    }
    commit() {
        this.history.push(this.slice())
    }
    revert() {
        this.splice(0, this.length, ...this.history[this.history.length - 1])
    }
}

var x = new VersionedArray()


```

自定义 `Error` 子类的例子，定制报错时的行为
```js

class ExtendableError extends Error {
    constructor(message) {
        super()
        this.message = message
        this.stack = (new Error()).stack
        this.name = this.constructor.name
    }
}
class MyError extends ExtendableError {
    constructor(m) {
        super(m)
    }
}

var myError = new MyError('111')
myError.message
myError instanceof Error
myError.name
myError.stack
```

继承 `Object` 子类，有一个行为差异。 `ES6` 改变了 `Object` 构造函数的行为，一旦发现 `Object` 方法不是通过 `new Object()` 这种形式调用， `ES6` 规定 `Obejct` 构造函数会忽略参数
```js
class NewObj extends Object {
    constructor() {
        super(...arguments)
    }
}
var o = new NewObj({attr: true})
o.attr === true // false

```

## Mixin 模式的实现
`mixin` 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口
将多个类的接口混入另一个类

```js
function mix(...mixins) {
    class Mix {}
    for (let mixin of mixins) {
        copyProperties(Mix.prototype, mixin)
        copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin))
    }
    return Mix
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== "constructor" && key !== "prototype" && key !== "name") {
            let desc = Object.getOwnPropertyDescriptor(source, key)
            Object.defineProperty(target, key, desc)
        }
    }
}
```
上面代码的 `mix` 函数，可以将多个对象合成为一个类，使用的时候，只要继承这个类即可

```js
class DistributedEdit extends mix(Loggable, Serializable) {}
```