// 为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。
// 模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

var fs = require("fs")
var http = require("http")
var Hello = require('./hello')

hello = new Hello()

hello.setName('hawtim')
hello.sayHello()

// 由于 nodejs 中存在4类模块，原生模块和三种文件模块，加载的优先级也各自不同

// 先找文件模块缓存区，再看是否是原生模块，再找原生模块缓存区（加载并缓存），最后看是否是文件模块（查找加载并缓存）
