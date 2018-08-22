前端路由主要实现了两个功能
1. 记录当前页面的状态
2. 可以使用浏览器的前进后退功能

作为开发者，需要实现
1. 改变 url 不向服务器发出请求
2. 监测 url 的变化
3. 截获 url 并解析出需要的信息来匹配路由规则

我们路由常用的 hash 模式和 history 模式就是实现了上面的功能

## Hash 模式

由于 hash 值的变化不会导致浏览器向服务器发出请求，而且 hash 改变会触发 hashChange 事件，浏览器的前进后退都能对其进行控制

```js
window.location.hash = 'qq'
var hash = window.location.hash
window.addEventListener('hashchange', function() {
    // 监听 hash 变化，点击浏览器的前进后退会触发
})
```

## history 模式

hash 兼容到 IE8 history 兼容到 IE10
hash 本来是用来做页面定位的，如果拿来做路由的话，原来的锚点功能就不能用了
hash 传参是基于 url 的，所以不适合传递复杂的数据，因为体积限制1k
history 模式不仅可以在 url 里放参数，还可以将数据存放在一个特定对象中

```js
window.history.pushState(state, title, url)
// state 需要保存的数据，在触发 popState 事件时，可以在 event.state 里获取
// title 一般传 null
// url 设定新的历史记录的 url，新的 url 与 当前 url 的 origin 必须是一致的，否则会报错，可以是相对路径，也可以是绝对路径
window.history.replaceState(state, title, url)
// 与 pushState 基本相同，但它是修改当前历史记录，而 pushState 是创建新的历史记录
window.addEventListener("popstate", function() {
    // 监听浏览器前进后退事件，pushState 与 replaceState 方法不会触发
})
window.history.back() // 后退
window.history.forward() // 前进
window.history.go(1) // 前进一步，-2为后退两步，window.history.length 可以查看当前历史堆栈中页面的数量
```
history 模式改变 url 的方式会导致浏览器向服务器发送请求，需要在服务端设置，如果匹配不到任何静态资源，则应该始终返回同一个 html 页面