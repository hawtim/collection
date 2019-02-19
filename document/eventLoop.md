# 前端早读课 1219 期 读文笔记

## 总结下js的运行机制

- 执行一个 macrotask （栈中没有就从事件队列中获取）
- 执行过程中如果遇到microtask，将它添加到 microtask 的任务队列中
- macrotask 执行完毕后，立即执行当前 microtask 任务队列中的所有 microtask，依次执行
- 当前 macrotask 执行完毕，开始检查渲染，然后 GUI 线程接管渲染
- 渲染完毕后，js线程继续接管，开始下一个 macrotask

```js
// Vue 2.4 及之前 源码的实现
var counter = 1
var observer = new MutationObserver(nextTickHandler)
var textNode = document.createTextNode(String(counter))

Observer.observe(textNode, {characterData: true})
timerFuc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
}

// vue 2.5 + 使用了 MessageChannel 属于宏任务，优先级是 setImmediate -> MessageChannel -> setTimeout
```