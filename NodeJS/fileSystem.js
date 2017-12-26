// Nodejs 提供一组类似UNIX标准的文件操作API
var fs = require("fs")
// 异步和同步
// nodejs fs模块中的方法均有异步和同步版本
// 例如fs.readFile 和 fs.readFileSync()
// 异步的方法最后一个参数为回调参数，回调函数的第一个参数包含了错误信息
