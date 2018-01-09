// Express 简介

// express 是一个简洁而灵活的node.js web应用框架，（类似的还有koa和阿里的eggjs，这两者似乎都超过了express）
// 提供了一系列强大的特性帮助你创建各种web应用，和丰富的HTTP工具
// 使用Express 可以快速地搭建一个完整功能的网站
// Express 框架核心特性
// 可以设置中间件来响应HTTP请求
// 定义了路由表用于执行不同的HTTP请求动作
// 可以通过向模板传递参数来动态渲染 HTML 页面

var express = require('express')
var app = express()

app.get('/', function(req, res) {
  res.send('Hello World')
})

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})

// 请求和响应
// request 和 response 对象来处理请求和响应的数据

// app.get('/', (req, res) => {
//     // ...
// })

// request 和 response 对象的具体介绍
// request 对象表示HTTP请求，包含了请求查询字符串，参数，内容，HTTP头部等属性

// req.app 当 callback 为外部文件时，用 req.app 访问 express 实例
