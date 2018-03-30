`prototype` 属性

显式原型属性，只有函数才拥有该属性，基本上所有函数都有这个属性，但也有一个例外
`let fun = Function.prototype.bind()`

`prototype` 是如何产生的？

`function Foo() {}`
`constructor` 对应着构造函数，也就是 `Foo`
`Foo.prototype.constructor === Foo`
`constructor` 是一个公有且不可枚举的属性，
一旦我们改变了函数的 `prototype`，那么新对象就没有这个属性了

`constructor` 属性有什么用？
1. 让实例对象知道是什么函数构造了它
2. 如果想让某些类库中的构造函数增加一些自定义的方法， 就可以通过 `xx.constructor.method` 来扩展

`__proto__`
这是每个对象都有得隐式原型属性，指向了创建该对象的构造函数的原型
因为js中没有类的概念，为了实现类似继承的方式，通过 `__proto__` 将对象和原型联系起来组成原型链，得以让对象可以访问到不属于自己的属性

实例对象的 `__proto__` 如何产生的

`function foo() {}`
这个函数是 `Function` 的实例对象
`function` 就是一个语法糖
内部调用了 new Function()

所以可以说在 `new` 的过程中，新对象被添加了 `__proto__` 并且链接到构造函数的原型上

`Function.proto === Function.prototype`