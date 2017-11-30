var http = require('http')
var events = require('events')
var fs = require('fs')
// 所有的异步IO操作在完成时都会发送一个事件到事件队列
// Nodejs 里面的许多对象都会分发事件
// 一个net.server 对象会在每次有新连接时分发一个事件
// 一个fs.readStream 对象会在文件被打开时发出一个事件
// 所有这些产生事件的对象都是events.EventEmitter的实例
var eventEmitter = new events.EventEmitter()

http.createServer(function (request, response) {
  // 发送 HTTP 头部
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  })

  // 发送响应数据 "Hello World"
  response.end('Hello World\n')
}).listen(8888)

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/')

// Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高
// 每一个API都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发
// 基本上所有事件机制都是用设计模式中观察者模式实现
// 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有时间发生就调用该回调函数

// 创建事件处理程序
var connectHandler = function connected() {
  console.log('连接成功。')

  // 触发 data_received 事件
  eventEmitter.emit('data_received')
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler)

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function () {
  console.log('数据接收成功。')
})

// 触发 connection 事件
eventEmitter.emit('connection')


// Nodejs 异步编程的直接体现就是回调
// 异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了

fs.readFile('./NodeJS/input.txt', function (err, data) {
  if (err) {
    console.log(err.stack)
    return
  }
  console.log(data.toString())
})

console.log('程序执行完毕')