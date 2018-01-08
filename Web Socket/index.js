var app = require('express')()
var server = require('http').Server(app)
var WebSocket = require('ws')

var wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  console.log('server: receive connection.')
  ws.on('message', message => {
    console.log('server: received: %s', message)
  })

  ws.send('world')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(3000)
