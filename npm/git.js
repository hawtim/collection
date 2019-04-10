// 当前脚本的工作目录的路径
// process-node 全局模块用来与当前进程互动，可以通过全局变量 process 访问，不必使用 require 命令加载。它是一个 EventEmitter 对象的实例。 process.cwd() 表示返回运行当前脚本的工作目录的路径
var cwd = '"' + process.cwd() + '"'

// 获取 git 版本
var fs = require("fs")
// ref: refs/heads/develop
var gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim()
// refs/heads/develop
var ref = gitHEAD.split(': ')[1]
// 环境：develop
var branch = gitHEAD.split('/')[2]
// git版本号，例如：6ceb0ab5059d01fd444cf4e78467cc2dd1184a66
var gitVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim()

if (branch == 'test') {
    console.log(process.execArgv)
    process.exit(1)
}
