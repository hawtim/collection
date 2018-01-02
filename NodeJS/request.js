// GET POST 请求
// 获取 GET 请求内容


var http = require('http')
var url = require('url')
var util = require('util')

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})

    // 解析 url 参数
    var params = url.parse(req.url, true).query
    res.write('网站名：' + params.name)
    res.write('\n')
    res.write('网站 URL：' + params.url)
    res.end()

    // res.end(util.inspect(url.parse(req.url, true)))
}).listen(3000)

// 获取POST 请求内容
// POST 请求的内容全部都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作

var http = require('http')
var querystring = require('queryString')

http.createServer((req, res) => {
    var post = ''
    req.on('data', chunk => {
        post += chunk
    })
})

