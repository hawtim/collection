// 什么是web服务器

// 目前最主流的三个web服务器时apache，nginx，iis


// Web 应用架构常见为四层，
// 客户端  一般指浏览器，通过各种协议向服务器请求数据
// 服务端  一般指web服务器，接受客户端请求，并向客户端发送响应数据
// 业务层  通过web服务器处理程序，如与数据库交互，逻辑运算，调用外部程序
// 数据层  数据层， 一般由数据库组成


// 使用Node 创建web服务器

var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname
    console.log('request for ' + pathname + ' received')
    fs.readFile('./NodeJS/' + pathname.substr(1), (err, data) => {
        if (err) {
            console.log(err)
            res.writeHead(404, {'Content-Type': 'text/html'})
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data.toString())
        }
        res.end()
    })
}).listen(8081)

console.log('Server running at http://127.0.0.1:8080/')

// 使用 Node 创建 Web 客户端

var http = require('http')

var options = {
    host: 'localhost',
    port: '8081',
    path: '/index.html'
}

var callback = (res) => {
    var body = ''
    res.on('data', (data) => {
        body += data
    })
    res.on('end', () => {
        console.log(body)
    })
}

var req = http.request(options, callback)
req.end()

// 先创建一个服务器，存放index.html
// 再创建一个客户端，请求存放再服务器上的index.html
