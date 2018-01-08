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
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));

// 连接路径
console.log('join path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));

// 转换为绝对路径
console.log('resolve : ' + path.resolve('main.js'));

// 路径中文件的后缀名
console.log('ext name : ' + path.extname('main.js'));


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

