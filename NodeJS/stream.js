// Stream 是一个抽象借口，Node 中很多对象实现了这个接口。
// 例如 对http服务器发起请求的request对象就是一个stream，还有stdout 标准输出

// Nodejs 有四种流类型。
// readable 可读操作
// writable  可写操作
// duplex 可读可写操作
// transform 操作被写入的数据，然后读出结果

// 所有stream对象都是eventEmitter的实例，常用的事件有：
// data 有数据可读时触发，
// end 没有更多的数据可读时触发
// error 在接受和写入过程中发生错误时发生
// finish 所有数据被写入到底层系统时触发

// 读取流
var fs = require("fs")
var data = ''
var readerStream = fs.createReadStream('./NodeJS/input.txt')
readerStream.setEncoding('UTF8')
readerStream.on('data', function(chunk) {
    data += chunk
})
readerStream.on('end', function() {
    console.log('end', data)
})
readerStream.on('finish', function() {
    // 读取流不会触发该事件，写入流才会
    console.log('finish', data)
})
readerStream.on('error', function(err) {
    console.log(err.stack)
})
console.log("程序执行完毕")

// 写入流
var fs = require("fs")
var data = "菜鸟教程官网地址： www.runoob.com"
// 创建一个可以写入的流，写入到output.txt 中
var writeStream = fs.createWriteStream('./NodeJS/output.txt')
writeStream.write(data, 'UTF-8')
// 标记文件末尾
// TODO 怎么理解？
// 不标记的话不会触发finish事件
writeStream.end()

writeStream.on('finish', function() {
    console.log('写入完成')
})
writeStream.on('error', function(err) {
    console.log(err.stack)
})
console.log('程序执行完毕')

// 管道流

// 管道提供了一个输出流到输入流的机制。
// 通常我们用于从一个流中获取数据并将数据传递到另外一个流中。

var fs = require("fs")
var readStream = fs.createReadStream('./NodeJS/input.txt')
var writeStream = fs.createWriteStream('./NodeJs/output.txt')
readStream.pipe(writeStream)

// 链式流

var fs = require('fs')
var zlib = require('zlib')

// 读取并压缩
fs.createReadStream('./NodeJS/input.txt')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('./NodeJS/input.txt.gz'))
console.log("文件压缩完成")

// 读取并解压缩
// TODO 有报错 Error: unexpected end of file
// at Gunzip.zlibOnError (zlib.js:153:15)

fs
  .createReadStream('./NodeJS/input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('./NodeJS/input.txt'))

console.log("文件解压完成")
