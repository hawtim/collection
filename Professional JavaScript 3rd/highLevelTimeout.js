// 关于定时器最重要的事情是，指定的时间间隔表示合适将定时器的代码添加到队列，而不是何时实际执行代码

// 使用链式 setTimeout 来解决 setInterval 的问题

setTimeout(function() {
    setTimeout(arguments.callee, interval)
}, interval)

// TODO 使用 bind 或者 curry 解决
function linkSetTimeout() {
    return (setTimeout(function() {
        setTimeout(arguments, interval)
    }, interval))()
}

function consoleSt() {
    console.log('xxxxx')
}

var timeout = linkSetTimeout()
timeout(consoleSt, 500)