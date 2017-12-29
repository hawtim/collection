

// Nodejs 提供一组类似UNIX标准的文件操作API
var fs = require("fs")
// 异步和同步
// nodejs fs模块中的方法均有异步和同步版本
// 例如fs.readFile 和 fs.readFileSync()
// 异步的方法最后一个参数为回调参数，回调函数的第一个参数包含了错误信息
console.log(__dirname)

// 异步读取
fs.readFile(`./input.txt`, (err, data) => {
    if (err) {
        return console.log(err)
    }
    console.log('异步读取：' + data.toString())
})

// 同步读取
var data = fs.readFileSync('input.txt')
console.log(data.toString())



// 获取文件信息
// fs.stat(path, callback)
// path - 文件路径。
// callback - 回调函数， 带有两个参数如：(err, stats), stats 是 fs.Stats 对象。

fs.stat('input.txt', (err, stats) => {
    if (err) {
        return console.error(err)
    }
    console.log(stats)
    console.log('读取文件信息成功！')
    // 检测文件类型
    console.log('是否为文件(isFile)？' + stats.isFile())
    console.log('是否为目录（isDirectory）？' + stats.isDirectory())
})

// 写入文件
// fs.writeFile(file, data[, options], callback)
// file - 文件名或者文件描述符
// data - 要写入文件的数据，可以是String 或 Buffer 对象
// options - 该参数是一个对象，包含[encoding, mode, flag]。默认编码为utf8，模式为 0666， flag 为 'w'
// callback - 回调函数，回调函数只包含错误信息参数（err），在写入失败时返回

fs.writeFile('writeFile.txt', '写入内容', err => {
    if (err) {
        return console.error(err)
    }
    console.log('写入成功')
    fs.readFile('writeFile.txt', (err, data) => {
        if (err) {
            return console.error(err)
        }
        console.log('异步读取文件数据：' + data.toString())
    })
})

// 打开文件
// 以下为在异步模式下打开文件的语法格式

// fs.open(path, flags [, mode], callback)
// path - 文件的路径。
// flags - 文件打开的行为。 具体值详见下文。
// mode - 设置文件模式(权限)， 文件创建默认权限为 0666(可读， 可写)。
// callback - 回调函数， 带有两个参数如： callback(err, fd)。

// 读取文件

// fs.read(fd, buffer, offset, length, position, callback)
// 该方法使用文件描述符来读取文件
// fd - 通过 fs.open() 方法返回的文件描述符
// buffer - 数据写入的缓冲区
// offset - 缓冲区写入的写入偏移量
// length - 要从文件中读取的字节数
// position - 文件读取的起始位置，如果position的值为null，则会从当前文件指针的位置读取
// callback - 回调函数， 有三个参数err， bytesRead, buffer,
//  err 为错误信息， bytesRead 表示读取的字节数， buffer 为缓冲区对象。

// 关闭文件
// fs.close(fd, callback)
// fd - 通过 fs.open() 方法返回的文件描述符。
// callback - 回调函数， 没有参数。

var buf = new Buffer(1024)

fs.open('xxx.txt', 'r+', (err, fd) => {
    if (err) {
        return console.error(err)
    }
    console.log('文件打开成功！')
    fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
        if(err) {
            console.log(err)
        }
        console.log(bytes + ' 字节被读取')
        // 仅输出读取的字节
        if (bytes > 0) {
            console.log(buf.slice(0, bytes).toString())
        }
        // 关闭文件
        fs.close(fd, (err) => {
            if (err) {
                console.log(err)
            }
            console.log('文件关闭成功')
        })
    })
})


// 截取文件


