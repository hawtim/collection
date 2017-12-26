// Node.js 全局对象，javascript中有个特殊的对象，称为全局对象，

// 在浏览器中，通常window是全局对象，而nodejs中的全局对象是global，所有全局变量除了global本身以外都是global对象的属性

// global 最根本的作用是作为全局变量的宿主。按照ECMAScript的定义，满足一下条件的变量是全局变量
// 1. 在最外层定义的变量
// 2. 全局对象的属性
// 3. 隐式定义的变量

// 在nodejs 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的，而模块本身不是最外层上下文

// __filename 表示当前正在执行的脚本的文件名，它将输出文件所在位置的绝对路径
// 且和命令行参数所指定的文件名不一定相同，如果是在模块中，返回的值是模块文件的路径


console.log('__filename', __filename)

// __dirname

// __dirname 表示当前执行脚本所在的目录

console.log('__dirname', __dirname)


function printHello() {
    console.log('Hello world!')
}

var t = setTimeout(printHello, 2000)

clearTimeout(t)

// 用于停止一个之前通过 setTimeout() 创建的定时器，参数 t 是通过setTimeout() 函数创建的定时器

// setInterval(cb, ms)
// 在指定的毫秒数后执行指定函数 (cb)
// 返回一个代表定时器的句柄值，可以使用 clearInterval(t) 函数来清除定时器

// console

// 用于提供控制台标准输出，它是由IE的js引擎提供的调试工具，后来逐渐成为浏览器的实施标准

// 提供与习惯一致的console对象，用于向标准输出流stdout或标准错误流，stderr输出字符

// console.log()
// console.info()
// console.error()
// console.warn()
// console.dir() // 对一个对象进行检查，并以易于阅读和打印的格式显示
// console.time()
// console.timeEnd()
// console.trace() // 当前执行的代码在堆栈中的调用路径，测试函数的运行很好帮助
// console.assert() // 用于判断某个表达式或变量是否为真，接收两个参数，第一个参数是表达式，第二个参数是字符串， 只有第一个参数为false 才会输出第二个参数


// process

// process 是一个全局变量，即global对象的属性，它用于描述当前nodejs进程状态的对象，提供了一个与操作系统的简单接口

// 常用的成员方法
// exit
// beforeExit
// uncaughtException
// Signal

process.on('exit', function(code) {
    setTimeout(function() {
        console.log('这段代码不会执行')
    }, 0)
    console.log('退出码为：', code)
})

console.log('程序执行结束')

// process 属性
// stdout 标准输出流
// stderr 标准错误流
// stdin 标准输入流
// argv 返回一个数组，由命令行执行脚本时的各个参数组成，它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数
// execPath 返回执行当前脚本的node二进制文件的绝对路径
// execArgv 返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数
// env 返回一个对象，成员为当前shell的环境变量
// exitCode 进程退出时的代码，如果进程有通过process.exit 退出，不需要执行退出码
// version node 的版本
// versions 一个属性，包含了node 的版本和依赖
// config 一个包含用来编译当前node 执行文件的javascript配置选项的对象，它与运行 ./configure 脚本生成的 config.gypi 文件相同
// pid 当前进程的进程号
// title 进程名，默认值为node，可以自定义该值
// arch 当前cpu的架构，arm，ia32或者x64
// platform 运行程序所在平台系统 darwin freebsd，linux, win32...
// mainModule require.main 的备选方法

process.stdout.write('Hello world!' + "\n")

process.argv.forEach((val, index, arr) => {
    console.log(index + ': ' + val)
})

console.log(process.execPath)
console.log(process.platform)

// 输出当前目录
console.log('当前目录：' + process.cwd())
// 输出当前版本
console.log('当前版本：' + process.version)
// 输出内存使用情况
console.log(process.memoryUsage())

console.log(process.uptime())

// 方法参考手册
// abort() 导致node触发abort事件，会让node退出并生成一个核心文件
// chdir() 改变当前工作进程的目录
// cwd() 返回当前进程的工作目录
// exit([code]) 使用指定的code 结束进程，如果忽略将使用code 0
// uptime() 返回node已经运行的秒数
// hrtime() 返回当前进程的高分辨时间