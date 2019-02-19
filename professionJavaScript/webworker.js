var worker = new Worker('stufftodo.js')
// 会下载stufftodo.js但只有接收到消息的时候才会实际执行文件中的代码

worker.postMessage({
    type: "command",
    message: "start! "
});

// 一般来说，可以序列化为 JSON 结构的任何值都可以作为参数传递给 postMessage。值是被复制到 worker 中
// worker 是通过 message 和 error 事件与页面通信的

worker.onmessage = function (event) {
    var data = event.data
    // 对数据进行处理
}

worker.onerror = function(event) {
    console.log('ERROR: ' + event.filename + ' (' + event.lineno + '):' + event.message)
}

// 任何时候，只要调用 terminate() 方法就可以停止 Worker 的工作，后续的所有过程都不会再发生


// Worker 全局作用域

// Web Worker 中的全局对象是 worker 对象本身，在这个特殊的全局作用域中， this 和 self 引用都是 worker 对象，为了便于处理数据，Web Worker 本身也是一个最小化的运行环境

// 最小化的 navigator 对象，包括 onLine， appName, appVersion, userAgent 和 platform
// 只读的 location 对象
// setTimeout()、setInterval()、clearTimeout() 和 clearInterval()
// XMLHttpRequest 构造函数

self.onmessage = function(event) {
    var data = event.data
    data.sort(function(a, b) {
        return a - b
    })
    self.postMessage(data)
}
