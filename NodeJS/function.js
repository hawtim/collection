// 函数传递是如何让http服务器工作的

var http = require("http")

http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.write('Hello world')
    res.end()
}).listen(8888)