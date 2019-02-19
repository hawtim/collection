# privateVariate

> javascript 虽然有了很多改进，新的语法和功能一直在被增加进来，但有些东西没有改变，一切仍然是对象，几乎所有东西都可以在运行时被改变，并且没有公共、私有属性的概念。

## 这篇文章将介绍各种实现私有变量的方式

### 命名约定(并没有真正阻止变量被访问或修改，只是依赖于开发者之间的相互理解)

```js
class Shape {
    constructor(width, height) {
        this._width = width
        this._height = height
    }

    get area() {
        return this._width * this._height
    }
}

const square = new Shape(10, 10)
console.log(square.area)
// 测试代码
square._width = 100
square.area = 1000

```

### WeakMap

使用 WeakMap 来存储所有私有值，它将私有值与用户可操作的对象分开。好处是遍历属性时或者在执行JSON.stringify 时不会展示出实例的私有属性，但它依赖于一个放在类外面的可以访问和操作的 WeakMap 变量

```js
const map = new WeakMap()
// 创建一个在每个实例中存储私有变量的对象
const internal = obj => {
    if (!map.has(obj)) {
        map.set(obj, {})
    }
    return map.get(obj)
}

class Shape {
    constructor(width, height) {
        internal(this).width = width
        internal(this).height = height
    }
    get area() {
        return internal(this).width * internal(this).height
    }
}

const square = new Shape(10, 10)

```

### symbol

该实现方式与 weakMap 十分相近，我们可以使用 Symbol 作为 key 的方式创建实例上的属性，可以防止该属性在遍历或使用 JSON.stringify 时可见。不过需要给每个私有属性创建一个 Symbol。如果你在类外可以访问该Symbol，那你还是可以拿到这个私有属性。

```js
const widthSymbol = Symbol('width')
const heightSymbol = Symbol('height')
class Shape {
    constructor(width, height) {
        this[widthSymbol] = width
        this[heightSymbol] = height
    }
    get area() {
        return this[widthSymbol] * this[heightSymbol]
    }
}

const square = new Shape(10, 10)
console.log(square.area)
console.log(square.widthSymbol);  // undefined
console.log(square[widthSymbol]); // 10
// 测试代码
square[widthSymbol] = 100
square.area  // 1000
// 可以改动
```

以上几种技术仍然允许从类外访问私有属性

### 闭包(这部分需要消化)
可以将闭包与 weakMap 或 Symbol 一起使用
将数据封装在调用时创建的函数作用域内，但是从内部返回函数的结果，从而使这一作用域无法从外部访问

```js
function Shape() {
    // 私有变量集
    const this$ = {}

    class Shape {
        constructor(width, height) {
            this$.width = width
            this$.height = height
        }
        get area() {
            return this$.width * this$.height;
        }
    }
    // 将外部的 Shape 设置为返回实例的原型
    return Object.setPrototypeOf(new Shape(...arguments), this)
    // return new Shape(...argument)
}

const square = new Shape(10, 10)
console.log(square.area)

```
NOTE: 以上代码会导致 square instanceof Shape 表达式返回 false，这可能会成为代码中的问题所在

```js

function Shape() {
    // 私有变量集
    const this$ = {}

    class Shape {
        constructor(width, height) {
            this$.width = width
            this$.height = height
        }
        // 构造函数中手动指定 getter 来解决这个问题
        Object.defineProperty(this, 'area', {
            get: function() {
                return this$.width * this$.height
            }
        })
    }
    // 将外部的 Shape 设置为返回实例的原型
    return Object.setPrototypeOf(new Shape(...arguments), this)
    // return new Shape(...argument)
}

const square = new Shape(10, 10)
console.log(square.area)

```
或者
```js
function Shape() {
    // 私有变量集
    const this$ = {}

    class Shape {
        constructor(width, height) {
            this$.width = width
            this$.height = height
        }
        get area() {
            return this$.width * this$.height;
        }
    }

    const instance = new Shape(...arguments)
    // 将 this 设置为实例原型的原型
    Object.setPrototypeOf(Object.getPrototypeOf(instance), this)
    return instance
}

const square = new Shape(10, 10)
console.log(square.area) // 100

```

### Proxy

它将允许你有效地将对象包装在名为 Proxy 的对象中，并拦截与该对象的所有交互
我们将使用 Proxy 并遵照上面的命名约定来创建私有变量，但可以让这些私有变量在类外部访问受限

```js
class Shape {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }
  get area() {
    return this._width * this._height;
  }
}

const handler = {
    get: function (target, key) {
        if (key[0] === '_') {
            throw new Error('Attempt to access private property')
        } else if (key === 'toJSON') {
            const obj = {}
            for (const key in target) {
                if (key[0] !== '_') {
                    // 只复制公共属性
                    obj[key] = target[key]
                }
            }
            return () => obj
        }
        return target[key]
    },
    set: function(target, key, value) {
        if (key[0] === '_') {
            throw new Error('Attempt to modify private property')
        }
        target[key] = value
    },
    getOwnPropertyDescriptor(target, key) {
        const desc = Object.getOwnPropertyDescriptor(target, key)
        if (key[0] === '') {
            desc.enumerable = false
        }
        return desc
    }
}

const square = new Proxy(new Shape(10, 10), handler)
console.log(square.area)
console.log(square instanceof Shape); // true
square._width = 200

```

NOTE: proxy 是现阶段原文（https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651227810&idx=1&sn=1f282b80e993b7b6eb11c5ce7aec2a0a&pass_ticket=Hzc6TVbzQ0LeJL70OLMXQtmOri%2FciPmvOy0l4hM6CMI%3D）作者最喜欢的用于创建私有属性的方法，以老派 JS 开发人员熟悉的方式构建的，可以通过将他们包装在相同的 Proxy 处理器来兼容旧的现有代码