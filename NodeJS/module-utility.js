// NodeJS 工具模块

// OS模块

var os = require('os')
function printOSInfo() {
  console.log(os.tmpdir())
  console.log(os.endianness())
  console.log(os.hostname())
  console.log(os.type())
  console.log(os.platform())
  console.log(os.arch())
  console.log(os.release())
  console.log(os.uptime())
  console.log(os.loadavg())
  console.log(os.totalmem())
  console.log(os.freemem())
  console.log(os.cpus())
  console.log(os.networkInterfaces())
}
printOSInfo()

// Path 模块

var path = require('path')

function printPathInfo() {
  // path.normalize(p)
  // path.join([path1][, path2][,...])
  // 该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/", window系统是"\"
  // path.resolve([from ...], to)
  // 将 to 参数解析为绝对路径
  // path.isAbsolute(path)
  // path.relative(from, to)
  // path.dirname(p)
  // 返回路径中代表文件夹的部分，同 Unix 的 dirname 命令类似
  // path.basename(p[, ext])
  // 返回路径中的最后一部分，同 Unix 的 dirname 命令类似
  // path.extname(p)
  // 返回路径中文件的后缀名，即路径中最后一个'.' 之后的部分。如果一个路径中并不包含'.'或该路径只包含一个'.'且这个'.'为路径的第一个字符，则此命令返回空字符串
  // path.parse(pathString)
  // 返回路径的字符串对象
  // path.format(pathObject)
  // 从对象中返回路径字符串，和path.parse 相反
}

// 格式化路径
console.log(
  'normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..')
)

// 连接路径
console.log(
  'join path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..')
)

// 转换为绝对路径
console.log('resolve : ' + path.resolve('main.js'))

// 路径中文件的后缀名
console.log('ext name : ' + path.extname('main.js'))

// Net 模块

var net = require('net')

// net.createServer([options][, connectionListener])
// 创建一个TCP 服务器，参数 connectionListener 自动给 'connection' 事件创建监听器
// net.connect(options[, connectionListener])
// 返回一个新的net.Socket, 并链接到指定的地址和端口
// 当socket 建立的时候，将会触发 connect 事件
// net.createConnection(options[, connectListener])
// 创建一个到端口 port 和主机 host 的 TCP 链接，host 默认为 'localhost'
// net.connect(port[, host][, connectListener])
// 创建一个端口为 port 和主机为 host 的 TCP 连接， host 默认为 'localhost'。
// 参数 connectListener 将会作为监听器添加到 connect 事件，返回 net.Socket
// net.createConnection(path[, connectListener])
// 创建连接到 path 的 unix socket 。参数 connectListener 将会作为监听器添加到 'connect' 事件。返回 'net.Socket'。
// net.isIP(input)
// net.isIPv4(input)
// net.isIPv6(input)

// ... 未完待续

// DNS 模块

var dns = require('dns')

// dns.lookup(hostname[, options], callback)
// dns.lookupService(address, port, callback)
// dns.resolve(hostname[, rrtype], callback)
// dns.resolve4(hostname, callback)
// dns.resolve6(hostname, callback)
// dns.resolveMx(hostname, callback)
// dns.resolveTxt(hostname, callback)
// dns.resolveSrv(hostname, callback)
// dns.resolveSoa(hostname, callback)
// dns.resolveNs(hostname, callback)
// dns.resolveCname(hostname, callback)
// dns.reverse(ip, callback)
// dns.getServers()
// // 返回一个用于当前解析的IP地址数组的字符串
// dns.setServers(servers)
// 指定一组IP地址作为解析服务器

// rrtypes
// 以下列出了 dns.resolve() 方法中有效的 rrtypes 值:
// 'A' IPV4 地址, 默认
// 'AAAA' IPV6 地址
// 'MX' 邮件交换记录
// 'TXT' text 记录
// 'SRV' SRV 记录
// 'PTR' 用来反向 IP 查找
// 'NS' 域名服务器记录
// 'CNAME' 别名记录
// 'SOA' 授权记录的初始值
dns.lookup('www.github.com', function onLookup(err, address, family) {
  console.log('ip 地址:', address)
  dns.reverse(address, function(err, hostnames) {
    if (err) {
      console.log(err.stack)
    }
    console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames))
  })
})

// Domain 模块

var domain = require('domain')

// domain 域 简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的异常

// domain 模块，把处理多个不同的IO的操作作为一个组，注册事件和回调到domain
// 当发生一个错误事件或抛出一个错误的时候，domain对象会被通知，不会丢失上下文环境，也不导致程序错误立即退出
// 与process.on('uncaughtException') 不同。 Domain 模块可分为隐式绑定和显示绑定
// 隐式绑定：把在domain上下文中定义的变量，自动绑定到domain对象
// 显示绑定： 把不是在domain上下文中定义的变量，以代码的方式绑定到domain对象

// domain.run(function)
// 在域的上下文运行提供的函数，隐式的绑定了所有事件的分发器，计时器和底层请求
// domain.add(emitter)
// 显示的增加事件
// domain.remove(emitter)
// 删除事件
// domain.bind(callback)
// 返回的函数是一个对于所提供的回调函数的包装函数
// domain.intercept(callback)
// 和domain.bind(callback) 类似，除了捕捉被抛出的错误外，它还会拦截Error对象最为参数传递到这个函数
// domain.enter()
// 进入一个异步调用的上下文，绑定到domain
// domain.exit()
// 退出当前的domain，切换到不同的链的异步调用的上下文中，对应domain.enter()
// domain.dispose()
// 释放一个domain对象，让node进程回收这部分资源
// domain.create()
// 返回一个domain对象

// 属性：
// domain.members
// 已加入domain对象的域定时器和事件发射器的数组。

var EventEmitter = require('events').EventEmitter
var domain = require('domain')

var emitter1 = new EventEmitter()

// 创建域
var domain1 = domain.create()

domain1.on('error', function(err) {
  console.log('domain1 处理这个错误 (' + err.message + ')')
})

// 显式绑定
domain1.add(emitter1)

emitter1.on('error', function(err) {
  console.log('监听器处理此错误 (' + err.message + ')')
})

emitter1.emit('error', new Error('通过监听器来处理'))

emitter1.removeAllListeners('error')

emitter1.emit('error', new Error('通过 domain1 处理'))

var domain2 = domain.create()

domain2.on('error', function(err) {
  console.log('domain2 处理这个错误 (' + err.message + ')')
})

// 隐式绑定
domain2.run(function() {
  var emitter2 = new EventEmitter()
  emitter2.emit('error', new Error('通过 domain2 处理'))
})

domain1.remove(emitter1)
emitter1.emit('error', new Error('转换为异常，系统将崩溃!'))
