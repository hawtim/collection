## 数据类型
基本数据类型 null undefined boolean number string symbol
数据类型 object，array，function， map set

function 比较特殊
js 解释器认为 null 是 object 数据类型的一种特殊形式，function则是function类型，认为函数也是一种基本数据类型，而不是 object的特殊形式，在《js权威指南》、《js高程》中都把函数视为对象，而不是基本数据类型，又有一些书籍，把 function 当做基本数据类型，把 null 当做 object 特殊形式

## typeof 的缺点
typeof null 结果为 object
typeof [] 结果为 object

对 typeof 的理解为，对于原型链上的实现的判断会呈现统一的结果，object

instanceof 不能完全精确的判断 object 类的具体数据类型，只能判断一个变量是否为某个对象的实例

## cookie 的构成
名称（区分大小写）、
url 编码值
域：对于那个域是有效的
路径：对于指定域中的哪个路径应该向服务器发送
失效时间：合适应该被删除的时间戳


## RTT
从发送端发出数据到接到接收端的确认经历的时延

## BEM
不是一种面向对象的css方案
block element modifier
Block是页面中独立存在的区块，可以在不同场合下被重用。每个页面都可以看做是多个Block组成。
Element是构成Block的元素，只有在对应Block内部才具有意义，是依赖于Block的存在。
Modifier是描述Block或Element的属性或状态。同一Block或Element可以有多个Modifier。
这三部分结合在一起，可以体现在class命名上，从而为开发者提供更友好、更有意义的css组织方式。其形式是：
```css
.block { }
.block_modifier { }
.block__element { }
.block__element_modifier { }
```
缺点在于：
1. 命名难度，词汇选择
2. 类名显得冗长
3. block 的颗粒度，可复用样式使用 oocss

## BFC
块级格式上下文，是一个独立渲染的区域，规定了内部块级 box 如何布局，并且不影响这个区域外部的元素

特点：
1. 内部box垂直方向排列
2. 垂直方向距离由margin决定
3. 两个相邻box会发生 margin 重叠
4. bfc 内部元素与 bfc 的border-box左边对其
5. BFC 不会与  float 重叠
6. 内外不相互影响
7. BFC 会计算内部浮动元素的高度

## nodeType
web api
元素是 1
文本是 3
注释是 8
documentFragment 是 11

## 强缓存和协商缓存
强缓存使用 cache-control 和 expires
协商缓存使用 E-tag 和 if-none-match；last-modified 和 if-modified-since

## 算法基础
O(1) 表示执行时间恒定
O(logn) 总的执行时间和值的数量相关，但不一定要获取每个值
O(n)线性，遍历所有元素，时间和值相关
O(n^2)每个值至少要获取 n 次
使用变量和数组O(1), 访问对象的属性O(n)
注意避免 全局查找 和 不必要的属性查找

## 优化 DOM 交互
createDocumentFragment()
替换整个节点内容使用 innerHTML
事件绑定尽可能使用事件代理
操作 HTMLCollection

## 继承
ES5 的继承，新建子类的实例对象this，再将父类的属性方法添加到子类上
ES6 的继承，新建父类的实例对象this，再用子类构造函数修饰this
在ES5的实现中，存在父类内部属性无法获取的情况，例如在数组中，存在 [[DefineOwnProperty]] 用在定义新属性时，更新 length 属性
另外，ES5 无法实现继承原生构造函数

## MVVM 架构模式
view 和 view-model 通过 binder 双向绑定
model 和 view-model 的关系
vm update 到 model
model notify 到 vm 再通过双向绑定触发 view 变化

关键词：观察者模式-双向绑定

## JS 执行机制
同步任务进入主线程执行，形成一个执行栈，异步任务进入 Event Queue(事件队列)
主线程任务执行空了，会去 Event Queue 读取对应的事件函数进入主线程执行，此过程不断执行，形成 Event Loop 
多个待执行的任务串联在一起形成队列 task queue
很多队列先后按照顺序执行任务形成 Event Loop
浏览器环境
1. 检查 macrotask 队列，运行最前面的任务，如果队列为空，前往第二步
2. 检查 microtask 队列，一直运行队列中的任务直到该队列为空
3. 渲染过程
    3.1 执行 resize， scroll， 媒体查询，动画，全屏等事件代码
    3.2 运行 animation frame （requestAnimationFrame）回调
    3.3 运行 intersectionObserver 回调
4. 回到第一步

常见的 macrotask 有
setTimeout、setInterval
requestAnimationFrame
解析 HTML
执行主线程js代码
修改 url
页面加载
用户交互

常见的 microtask 有
promise
mutation.observer
process.nextTick

## 滚动事件
获取滚动条的位置
`var scrollTop = document.body.scrollTop + document.documentElement.scrollTop` 只有一个值会生效，一个有值，另一个就为0

1. 然后注意使用（节流，防抖）requestAnimationFrame 自动帮你处理了
2. 使用 pointer-events: none; 滚动期间不触发鼠标事件，滚动结束后移除
3. window.addEventListener('scroll', onScroll, false)

## 媒体查询检查什么？
最大最小宽度，横竖屏，设备像素密度等

## viewport 是什么
在 html 中，通过 meta 标签对 viewport 进行控制，理解为设备上用来显示网页的区域
可以控制初始缩放值，最大，最小缩放值，是否允许进行缩放，`width="device-width"`

## 路由实现模式
hash 模式，通过 hashChange 监听变化
history 模式，通过 popState 监听变化
原生通过location对象获取 url 及参数

## HTTP，前端，网络方面可做的优化
1. 合并请求
2. 减少重定向
3. gzip 压缩
4. CDN
5. HTTP2.0
6. CSS,js 压缩
7. 前端缓存

## 利用构建工具实现异步组件
在大型应用中，将应用拆分为多个小模块，按需从服务器下载
```js
const example = Vue.component('async-example', function(resolve) {
    require(['./my-async-component'], resolve)
})

new Vue({
    components: {
        example
    }
})
```
达到的效果，一开始只加载能把项目运行起来的框架代码
在需要时才加载异步组件
加载失败的话可以通过异步组件工厂函数返回定制了 loading， error 等样式的代码
将页面的核心功能打包成一个模块，将框架进行优先加载，避免入口文件过大

## webpack 优化
提取第三方库
代码压缩
代码分割
异步组件
插件的实现可以是一个类，在使用时传入相关配置来创建实例，然后配置到 plugins 字段中

## gzip 配置
指定类型压缩
设置压缩等级
开启缓存
expires

## 新技术相关
PWA
WebAssembly
HTTP2.0


## tree-shaking

## target 和 currentTarget
1.target: 触发事件的某个具体对象，只会出现在事件流的目标阶段，谁触发谁命中
2.currentTarget: 绑定事件的对象，恒等于this,可能出现在事件流的任意一个阶段中
3.通常情况下target和currentTarget是一致的，我们只要使用target即可
父子嵌套关系中，父元素绑定了事件，然而单击子元素触发事件。则根据事件流，在不阻止事件流的前提下currentTarget会传递至父元素因为currentTarget是绑定事件的对象，而target由于是触发事件的具体对象，它会指向子元素


