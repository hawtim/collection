// javascript 语言自身只有字符串数据类型，没有二进制数据类型，但在处理像TCP流或文件流时，必须使用到二进制数据
// 因此在nodejs中定义了一个buffer类，用来创建一个专门存放二进制数据的缓存区
// 一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

var buf = new Buffer(10)
var buf = new Buffer([10, 20, 30, 40, 50])
var buf = new Buffer("www.runoob.com", 'utf-8')
// utf-8 是默认的编码方式，此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"。
// 写入缓冲区
// buf.write(string[, offset[, length]][, encoding])
// 返回值: 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
buf = new Buffer(256)
len = buf.write('www.runoob.com')
console.log('写入字节数：' + len)

// 从缓冲区读取数据
// buf.toString([encoding[, start[, end]]])
// 返回值: 解码缓冲区数据并使用指定的编码返回字符串。

buf = new Buffer(26)
for(var i = 0; i < 26; i++) {
    buf[i] = i + 97

}
console.log(buf.toString('ascii'))
console.log(buf.toString('ascii', 0, 5))
console.log(buf.toString('utf8', 0, 5))
console.log(buf.toString(undefined, 0, 5)) // 使用 'utf8' 编码, 并输出: abcde

// var buf = new Buffer('www.runoob.com');
var json = buf.toJSON(buf)
console.log(json)

// 缓冲区合并
// Buffer.concat(list[, totalLength])
// list: 用于合并的 Buffer 对象**数组**列表。
// 返回值: 返回一个多个成员合并的新 Buffer 对象。

var buffer1 = new Buffer('菜鸟教程')
var buffer2 = new Buffer('www.runoob.com')
var buffer3 = Buffer.concat([buffer1, buffer2])
console.log('buffer3 内容:' + buffer3.toString())
console.log(buffer3.length)

// 缓冲区比较
// buf.compare(otherBuffer);
// otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
// 返回值:返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。

var buffer1 = new Buffer('ABCD')
var buffer2 = new Buffer('ABC')
var result = buffer1.compare(buffer2)

if(result < 0) {
    console.log(buffer1 + " 在 " + buffer2 + "之前");
 }else if(result == 0){
    console.log(buffer1 + " 与 " + buffer2 + "相同");
 }else {
    console.log(buffer1 + " 在 " + buffer2 + "之后");
 }

//  拷贝缓冲区
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
var buffer1 = new Buffer('ABC');
// 拷贝一个缓冲区
var buffer2 = new Buffer(3);
console.log("buffer2 content: " + buffer2.toString());
// 这里的语意不应该是buffer1 copy 了buffer2 的内容吗？
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());
// 后边的API比较多，涉及计算机基础，暂时跳过