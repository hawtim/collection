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


// 请求和响应
// request 和 response 对象来处理请求和响应的数据

// app.get('/', (req, res) => {
//     // ...
// })

// request 和 response 对象的具体介绍
// request 对象表示HTTP请求，包含了请求查询字符串，参数，内容，HTTP头部等属性

// req.app 当 callback 为外部文件时，用 req.app 访问 express 实例

// ...

// response 对象表示 HTTP 响应，即在接受到请求时向客户端发送 HTTP 响应数据。常见属性有

// res.app 和 req.app 一样
// res.append() 追加指定HTTP头
// res.set() 在res.append() 后将重置之前设置的头
// res.cookie(name, value [, option]) 设置cookie
// option  domain / expires / httpOnly / maxAge / path / secure/ signed
// res.clearCookie() 清除Cookie
// res.download() 传送指定路径的文件
// res.get() 返回指定的HTTP头
// res.json() 传送JSON响应
// res.jsonp() 传送JSONP响应
// res.location() 只设置响应的Location HTTP 头，不设置状态码或 close Response
// res.redirect() 设置响应Location HTTP 头，并且设置状态码 302
// res.render(view, [local], callback) 渲染一个view，同事向callback传递渲染后的字符串，如果在渲染过程中有错误，next(err)将会被自动调用
// callback 将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出
// res.send() 传送HTTP响应
// res.sendFile(path[, options][, fn]) 传送指定路径的文件，会自动根据文件extension 设定Content-TypeError
// res.set() 设置 HTTP 头，传入object可以一次设置多个头
// res.status() 设置HTTP状态码
// res.type() 设置 Content-Type 的 MIME 类型

// 路由
// 路由决定了由谁去响应客户端请求
// 在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数

app.get('/home', (req, res) => {
  console.log('主页 GET 请求')
  res.send('Hello GET')
})

app.post('/home', (req, res) => {
  console.log('主页 POST 请求')
  res.send('Hello POST')
})

app.get('/del_user', (req, res) => {
  console.log('/del_user 响应 DELETE 请求')
  res.send('删除页面')
})

app.get('/list_user', (req, res) => {
  console.log('/list_user GET 请求')
  res.send('用户列表页面')
})

app.get('/ab*cd', (req, res) => {
  console.log('/ab*cd GET 请求')
  res.send('正则匹配')
})


// 静态文件

// Express 提供了内置的中间件 express.static 来设置静态文件，如图片，CSS，javascript
// 你可以使用express.static 中间件来设置静态文件路径

app.use(express.static('./public'))


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
 if (host == '::') {
     host = 'http://localhost'
 }
  console.log(`应用实例，访问地址为${host}:${port}`)
})
