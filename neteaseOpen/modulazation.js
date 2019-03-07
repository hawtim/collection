// 模块化开发

// 网站复杂度增加，传统的非模块化编程模式容易导致代码冲突和依赖等问题
// 通行的 commonjs（nodejs） amd cmd es6-module
// amd cmd 都是浏览器适用的

// ES6 -> babel -> commonjs

// 吸收了很多规范的思想形成了 语言规范

// commonjs 一个模块就是一个脚本文件 require 命令第一次加载该脚本时就会执行整个脚本，然后在内容中生成一个对象

// {
//     id: '...',
//     exports: {...},
//     loaded: true
// }

// commonjs 是同步加载模块
// amd 是异步模块定义，也是用require 命令，但是不同于 commonjs，它要求两个参数
require([module], callback)

// module 是一个数组，里面的成员是要加载的模块，callback 是加载完成后的回调函数

// 模块定义，采用的是amd规范，

define(id?, dependencies?, factory )

// 模块名称，依赖，

// a.js // (module require exports) exports:{id: 'xxx', exports: {}} == module

exports.add = function() {

}

// b.js
define(function() {
    return { // 拿到是接口对象的副本
        add: function() {

        }
    }
})

require(a.js)

// 原理像是
var obj = {}
obj.add = function () {

}
obj.add


CMD 依赖就近，延迟执行
AMD 依赖前置，预先加载

// alipay seajs


// ES6 module
es6 模块输出的是值的引用，输出接口动态绑定，common amd cmd输出的是值的拷贝
es6 模块编译时执行，而 commonjs 模块总是在运行时加载


// 揭秘模块加载器

脚本文件
基础设施

// 模块长啥样  模块对应都是一个 module 的实例对象  === { uri: 'a.js', deps: ['./math'], exports: {'接口对象'}, status: '状态码' }

// 循环依赖
// 生命周期 =》 状态码 （通过状态码来解决循环依赖的问题，给模块打上标签） =》 递归架构


// 提取依赖 静态词法分析 + 正则

// b.js
define(function(require, exports, module) {
    // a.js
    var math = require('./math')
    math.add(2, 3)
})

// 静态词法 + 正则
`function(require, exports, module) {
    // a.js
    var math = require('./math')
    math.add(2, 3)
}`

// 应用层面

seajs.use(['a.js', 'b.js'], function() {

})

cache {
    "a.js的路径": { uri: '', deps: ['数据更新'], exports: {'接口对象'}, status: '状态码' },
    "b.js的路径": { uri: '', deps: ['数据更新'], exports: {'接口对象'}, status: '状态码' }
}

// 细节知识点
