// Node.js 全局对象，javascript中有个特殊的对象，称为全局对象，

// 在浏览器中，通常window是全局对象，而nodejs中的全局对象是global，所有全局变量除了global本身以外都是global对象的属性

// global 最根本的作用是作为全局变量的宿主。按照ECMAScript的定义，满足一下条件的变量是全局变量
// 1. 在最外层定义的变量
// 2. 全局对象的属性
// 3. 隐式定义的变量

// 在nodejs 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的，而模块本身不是最外层上下文

// __filename 表示当前正在执行的脚本的文件名，它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同，如果是在模块中，返回的值是模块文件的路径


console.log(__filename)

// __dirname

// __dirname 表示当前执行脚本所在的目录

console.log(__dirname)

setTimeout(printHello, 1000)

function printHello() {
    console.log('Hello world!')
}
setTimeout(printHello, 2000)
