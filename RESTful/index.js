// REST即表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。

// 表述性状态转移是一组架构约束条件和原则
// 满足这些约束条件和原则的应用程序或设计就是RESTful

// REST 通常使用 JSON 数据格式

// HTTP 方法

// RESTful Web Services

// Web service 是一个平台独立的，低耦合的，自包含的，基于可编程的web的应用程序，可使用开放的 XML 标准来描述、发布、发现、协调和配置这些应用程序

// 基于REST 架构的 web services 即是 RESTful

var express = require('express')
var app = express()
var fs = require('fs')
var user = {
  user4: {
    name: 'mohit',
    password: 'password4',
    profession: 'teacher',
    id: 4
  }
}

var jsonFile = 'users.json'

var encodeType = 'utf8'

app.get('/listUser', (req, res) => {
  fs.readFile(__dirname + '/' + jsonFile, encodeType, (err, data) => {
    console.log(data)
    res.end(data)
  })
})

app.get('/addUser', (req, res) => {
  fs.readFile(__dirname + '/' + jsonFile, encodeType, (err, data) => {
    data = JSON.parse(data)
    console.log(req.query)
    console.log(req.params)
    data['user4'] = user['user4']
    res.end(JSON.stringify(data))
  })
})

app.get('/deleteUser', (req, res) => {
    fs.readFile(__dirname + '/' + jsonFile, encodeType, (err, data) => {
        data = JSON.parse(data)
        delete data['user' + 2]
        res.end(JSON.stringify(data))
    })
})

app.get('/:id', (req, res) => {
    fs.readFile(__dirname + '/' + jsonFile, encodeType, (err, data) => {
        data = JSON.parse(data)
        var user = data['user' + req.params.id]
        res.end(JSON.stringify(user))
    })
})



var server = app.listen(8081, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('应用实例，访问地址为http://%s:%s', host, port)
})
