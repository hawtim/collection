1. 用 let 取代 var
var 命令存在变量提升，let 命令没有这个问题
2. 全局常量和线程安全
在 let 和 const 之间，建议优先使用 const，尤其是在全局环境，不应该设置变量，只应设置常量
const 可以提醒阅读程序的人，这个常量不应改变；const 比较符合函数式变成思想，运算不改变值，只是新建值，有利于将来的分布式运算
；javascript 编译器会对 const 进行优化，所以多使用 const， 有利于提高程序的运行效率，也就是说 let 和 const 的本质区别，是编译器内部的处理不同
3. 解构赋值
使用数组成员对变量赋值时，优先使用解构赋值
```js
const arr = [1, 2, 3, 4]
const [first, second] = arr
```
函数的参数如果是对象的成员，优先使用解构赋值
```js
function getFullName({ firstName, lastName}) {

}
```
如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值
```js
function processInput(input) {
    return {left, right, top, bottom}
}
const {left, right} = processInput(input)
```
4. 对象
如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义
```js
const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enable')]: true
}
```
对象的属性和方法，尽量采用简洁表达法
5. 数组
使用扩展运算符...拷贝数组
`const itemsCop = [...items]`
Array.from 处理类似数组的对象
6. 函数
箭头函数绑定了this
取代 Function.prototype.bind
```js
const boundMethod = (...params) => method.apply(this, params)
```
使用 `rest` 运算符 `...` 代替 `arguments`

```js
function concatenateAll(...args) {
    return args.join('')
}
```
7. map 结构
注意区分 Object 和 Map ，只有模拟现实世界的实体对象时，才使用 Object ，如果只是需要 key:value 结构，使用Map结构，因为map有内建的遍历机制

```js
arr = {
    a: 1, b: 2, c:3
}
let map = new Map(arr)
for (let key of map.keys()) {
    console.log(key)
}

for (let value of map.values()) {
    console.log(value)
}

for (let item of map.entries()) {
    console.log(...item)
}
```
8. Class
总是使用 Class，取代需要 prototype 的操作

```js
class Queue {
    constructor(contents = []) {
        this._queue = [...contents]
    }
    pop() {
        const value = this._queue[0]
        this._queue.splice(0, 1)
        return value
    }
}
```
使用 extends 实现继承，不会有破坏 instanceof 运算的危险
```js
class PeekableQueue extends Queue {
    peek() {
        return this._queue[0]
    }
}
```

9. 模块
使用import取代require。使用export取代module.exports。
```js
import React from 'react'
class Breadcrumbs extends React.Component {
    render() {
        return <nav />
    }
}

export default BreadCrumbs

```
不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。
```js
import myObject from './importModule'
```
如果模块默认输出一个函数，函数名的首字母应该小写。
```js
function makeStyleGuide() {}
export default makeStyleGuide
```
如果模块默认输出一个对象，对象名的首字母应该大写
```js
const StyleGuide = {
    es6: {}
}

export default StyleGuide
```
10. ESLint 的使用
首先，安装 ESLint。

`npm i -g eslint`
然后，安装 Airbnb 语法规则，以及 import、a11y、react 插件。

`npm i -g eslint-config-airbnb`
`npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react`
最后，在项目的根目录下新建一个.eslintrc文件，配置 ESLint。

{
  "extends": "eslint-config-airbnb"
}