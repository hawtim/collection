// 函数传递是如何让http服务器工作的

var http = require("http")
var url = require("url")

// 拓展 start 函数
function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname
    console.log('Request for ' + pathname + ' received')

    route(pathname)
    // 因此我们将使用依赖注入的方式较松散地添加路由模块
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write('<p style="font-size: 20px;">Hello World!</p>')
    response.end()
  }
  http.createServer(onRequest).listen(8888)
  console.log('Server has started')
}

exports.start = start

