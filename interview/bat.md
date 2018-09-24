# 必问

## 闭包理解

函数 A 返回了一个函数 B，并且函数 B 中使用、读取了函数 A 的变量，函数 B 就被称为闭包。
闭包作用在于可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。

> GC回收 通过 A = null 可以让内存回收掉

常见面试题
```js
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i)
    }, i * 1000)
}
// 隔一秒输出一个 6
```
使用闭包
```js
for (var i = 1; i <= 5; i++) {
    (function(j) {
        setTimeout(function timer() {
            console.log(j)
        }, j * 1000)
    })(i)
}
// 隔一秒输出对应的数字
```
使用setTimeout的第三个参数
```js
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(j) {
        console.log(j)
    }, i * 1000, i)
}
```
使用 let
```js
for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i)
    }, i * 1000)
}
// 创建了块级作用域
{
    let i = 0
    {
        let ii = i
        setTimeout(() => {
            console.log(i)
        }, i * 1000)
    }
    i++
    // 循环以上的过程
}

```

## 原型链理解，如何实现继承

每个函数都有 `prototype` 属性，除了` Function.prototype.bind()`，该属性指向原型。
每个对象都有 `__proto__` 属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 `[[prototype]]`，但是 `[[prototype]]` 是内部属性，我们并不能访问到，所以使用 `__proto__` 来访问。
对象可以通过 `__proto__` 来寻找不属于该对象的属性，`__proto__` 将对象连接起来组成了原型链。

其本质是子类的原型设置为父类的实例

`ES5` 的继承是先创造子类的实例对象 `this` ，然后再将父类的属性和方法添加到 `this` 上面 `Parent.apply(this)`
```js
function Super() {}
function Sub() {}
Sub.prototype = new Super()
Sub.prototype.constructor = Sub
var sub = new Sub()
```

`ES6` 的继承是先将父类实例对象的属性和方法加到 `this` 上面，然后用子类的构造函数修改 `this` `Children.call(this)`
```js
class Super {}
class Sub extends Super {}
var sub = new Sub()
```

# 常规问题

## 服务端渲染，以及页面加载，各标签，js, css 顺序和过程，img过程, 为什么说服务端渲染更快
服务端渲染指的是用后台语言通过一些模板引擎生成 html，为了让单页面应用利于 seo，让服务器和客户端同构，也使用 react/vue 的渲染方案
**浏览器渲染**：单页面应用，使用浏览器渲染在请求数多而且有一定先后顺序的时候用户等待时间变长了
**服务端渲染**：服务器接到用户请求后，计算出用户需要的数据，然后将数据更新成视图发给客户端，客户端直接将这串字符串塞进页面即可，响应快，用户体验好，seo良好
**客户端渲染路线**
请求一个 html
服务端返回 html
浏览器下载 js/css
等待js加载并初始化
执行js代码向后端发送请求数据
等待后端数据返回
客户端从无到完整地，把数据渲染为响应页面
**服务端渲染路线**
请求一个html
服务端请求数据（内网）
服务端初始渲染（服务端性能好）
服务端返回正确内容的页面
客户端请求js/css
等待js文件下载完成
等待js加载并初始化完成
客户端把剩下一部分渲染完成

**在首屏、重复较多的公共页面可以考虑使用服务端渲染，减少ajax请求和提升用户体验**
为什么快？
数据在内网传输，无需在不同网络环境下进行数据请求，且外网http请求开销大
服务端不用等待js代码下载完成再请求数据，就可以返回一个有内容的页面
如果服务端性能比客户端高，那么可以理解渲染速度快
服务端渲染把可视部分先渲染再给客户端做部分渲染


## 假设一个页面20w数据，前端做排序，不是数据驱动而是 dom 操作，how

首先这个情况，还是适合后端去做的，后端可以缓存排序结果
但如果真要前端做排序，涉及到dom操作的话，
排序的算法

```js
// 稳定排序
const INDEX = Symbol('index');
function getComparer(compare) {
    return function (left, right) {
        let result = compare(left, right);
        return result === 0 ? left[INDEX] - right[INDEX] : result;
    };
}
function sort(array, compare) {
    array = array.map(
        (item, index) => {
            if (typeof item === 'object') {
                item[INDEX] = index;
            }
            return item;
        }
    );
    return array.sort(getComparer(compare));
}
```
可以用 `document.createDocumentFragment()` 的 `webapi`
配合 `requestAnimationFrame` 确保排序结束后重新渲染的时候不会导致页面卡顿
```js
setTimeout(() => {
      // 插入十万条数据
      const total = 100000
      // 一次插入 20 条，如果觉得性能不好就减少
      const once = 20
      // 渲染数据总共需要几次
      const loopCount = total / once
      let countOfRender = 0
      let ul = document.querySelector("ul");
      function add() {
        // 优化性能，插入不会造成回流
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < once; i++) {
          const li = document.createElement("li");
          li.innerText = Math.floor(Math.random() * total);
          fragment.appendChild(li);
        }
        ul.appendChild(fragment);
        countOfRender += 1;
        loop();
      }
      function loop() {
        if (countOfRender < loopCount) {
          window.requestAnimationFrame(add);
        }
      }
      loop();
    }, 0);
```


## cookie的理解和作用，假设我假设我在 qq.com, 我能拿到qzone.qq.com的信息吗，请求 www.baidu.com 的图片时，cookie 会传递吗（TODO）

第一次访问网站的时候，浏览器发出请求，服务器响应请求后，会将cookie 放入到响应请求中，在客户端第二次发请求的时候，会把cookie 带过去，服务端可以用于辨别用户身份
cookie 不可跨域
cookie 有有效期
服务端通过 set-cookie 来设置 cookie，设置多个的话要写多个

value	如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识
http-only	不能通过 JS 访问 Cookie，减少 XSS 攻击
secure	只能在协议为 HTTPS 的请求中携带
same-site	规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击

## 谈谈事件模型和事件委托

JS 的事件模型是观察者模式的体现，观察者模式是这么一个概念：可以让多个观察者对象同时监听某一个主题对象，这个主题对象的状态变化时会通知所有的订阅者，所以在js中，当对应的事件被触发时，监听该事件的所有监听函数都会被调用

DOM Level 0 events 事件不会传播，没有事件流的概念

DOM Level 2 Events(事件模型)：捕获阶段-目标阶段-冒泡阶段
捕获阶段 window 往事件触发处传播，遇到注册的捕获事件会触发
事件处理阶段 事件到达目标元素，触发注册的事件
事件冒泡阶段 从事件触发处往 window 传播，遇到注册的冒泡事件会触发

如果给一个目标节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。

```js
/*
 *eventType 指定事件类型
 *handler 是事件处理函数
 *useCapture 是一个 boolean 用于指定是否在捕获阶段进行处理，一般设置为 false 与 IE 浏览器保持一致。
 */
addEventListener(eventType, handler, useCapture)

```

事件委托
1. 节省内存占用，减少事件注册
2. 适合动态添加元素，无需注销子节点事件

比如 vue 循环一个列表，直接在父节点上绑定点击事件即可，通过判断点击事件的来源进行处理，可以做到减少事件注册，节省内存
在 jq 下适合动态添加元素需要绑定事件的场景

```js
dom.onclick = function (event) {
    var event = event || window.event
    var curTarget = event.target || event.srcElement
    if (curTarget.tagName.toLowerCase() == 'li') {

    }
}
```

## 如何实现一个对象或数组的深度复制

如果没有对象的键值都是基本类型值，则可以使用 `Object.assign` 或者 `$extend()` 或者 lodash 库 的 `clone` 或者 es6 展开运算符` ...`
深拷贝的话通常可以使用 `JSON.parse(JSON.stringify(object))` 会忽略函数和undefined，无法处理循环引用
如果不能忽略函数和undefined以及循环引用，可以使用 lodash 的 `deepClone`

## 如何实现一个观察者模式
//主题监听函数
var handler = function(info) {
    console.log(info);
}
//订阅hello主题
events.subscribe('hello', handler);

//发布hello主题
events.publish('hello', 'hello world');

## 如何实现数组扁平

1. 循环数组 + 递归
```js
function flatten(arr) {
    var result = []
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        } else {
            result.push(arr[i])
        }
        return result
    }
}
```
2. 利用 apply + 递归
```js
[].concat.apply([], arr)
function flatten(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat.apply([], arr)
        // or es6 展开运算符加递归
        arr = [].concat(..arr)
    }
    return arr
}

```
原理基本上都是通过某些方法将数组进行扁平+递归，然后用数组的concat方法连接起来返回

## 什么是函数柯里化，实现和作用

实现函数只有一个参数
通过 bind 和 apply 实现

## typeof 作用和坏处

`typeof` 用于变量类型的判断

`typeof` 对基本类型（null, undefined, boolean, symbol, string, number） 除了 `null` 都能显示正确的类型

`typeof` 对于对象，除了 `function` 都会显示 `object`

如果想正确获得一个变量的正确类型，可以通过 `Object.prototype.toString.call(xx)`， 可以得到 类似 `[object Type]` 的字符串


## sessionStorage, localStorage, cookie区别

`sessionStorage` 最大 5M，同 `localStorage` 一样，刷新还存在，关闭浏览器页面的时候消失
`localStorage` 最大5M，本地存储，持久存储，关闭浏览器还存在
`cookie` 最大4k，每次http请求的时候会带上，可通过服务端设置cookie过期时间

## new 到底做了什么

在调用 new 的过程中会发生以下四件事情：
- 新生成了一个对象
- 链接到原型
- 绑定 this
- 返回新对象

推荐使用字面量的方式创建对象，因为这样避免了通过作用域链去找到 `Object`


## 函数节流防抖

两者的区别在于
如果用户一直触发一个函数，且每次触发函数的间隔小于 wait
**防抖**的情况下只会调用一次
**节流**是每隔一定时间调用函数
