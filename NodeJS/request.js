// GET POST 请求
// 获取 GET 请求内容


var http = require('http')
var url = require('url')
var util = require('util')

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})

    // 解析 url 参数
    var params = url.parse(req.url, true).query
    res.write('网站名：' + params.name)
    res.write('<br>')
    res.write('网站 URL：' + params.url)
    res.write('<br>')
    // 将任意对象转换为字符串
    res.end(util.inspect(url.parse(req.url, true)))

    // res.end(util.inspect(url.parse(req.url, true)))
}).listen(3000)

// 获取POST 请求内容
// POST 请求的内容全部都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，
// 原因是等待请求体传输可能是一件耗时的工作

var http = require('http')
var querystring = require('querystring')

http.createServer((req, res) => {
    var post = ''
    req.on('data', chunk => {
        post += chunk
    })
    req.on('end', () => {
        post = querystring.parse(post)
        res.end(util.inspect(post))
    })
}).listen(3001)

var postHTML =
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>'

http.createServer((req, res) => {
    var body = ''
    req.on('data', (chunk) => {
        body += chunk
    })
    req.on('end', () => {
        body = querystring.parse(body)
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'})
        if (body.name && body.url) {
            // 输出提交的数据
            res.write('网站名:' + body.name)
            res.write('<br>')
            res.write('网站URL：' + body.url)
        } else {
            res.write(postHTML)
        }
        res.end()
    })
}).listen(3002)