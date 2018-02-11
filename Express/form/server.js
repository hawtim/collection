var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({ extended: false})

app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/process_post', (req, res) => {
    console.log(req.body)
    var response = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name
    }
    console.log(response)
    res.end(JSON.stringify(response))
})

var server = app.listen(8100, () => {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s%s", host, port)
})