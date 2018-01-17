// Node.js 多进程
// nodejs 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核cpu的系统上创建多个子进程，从而提高性能

// 每个子进程总是带有三个流对象，child.stdin, child.stdout 和 child.stderr。

// 它们可能会共享父进程的 stdio 流，或者也可以是独立的被导流的流对象

// Node 提供了 child_process 模块来创建子进程，方法有：
// exec child_process.exec 使用子进程执行命令，缓存子进程的输出
// spawn child_process.spawn 使用指定的命令行参数创建新进程
// fork child_process.fork 是 spawn() 的特殊形式，用于在子进程中运行的模块
// 与 spawn 方法不同是，fork 会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信

// exec 方法

// child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回

// 参数说明如下
// command 字符串，将要运行的命令，参数使用空格隔开
// options 对象，可以是
//     cwd 字符串，子进程的当前工作目录
//     env 对象，环境变量键值对
//     encoding 字符串，字符编码
//     shell 字符串，将要执行命令的Shell
//     timeout 超时时间
//     maxBuffer 数字，在stdout或stderr中允许存在的最大缓冲
//     killSignal 字符串，结束信号
//     uid 数字，设置用户进程的 ID
//     gid 数字，设置进程组的 ID
// callback 回调函数，包含三个参数error stout stderr
// exec() 方法返回最大的缓冲区，并等待进程结束，一次性返回缓冲区的内容

