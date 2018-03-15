// 函数节流
// 目的是只有在执行函数的请求停止了一段时间之后才执行

var processor = {
    timeoutId: null,
    performProcessing: function() {
        // 实际执行的代码
    },
    process: function() {
        clearTimeout(this.timeoutId)
        var that = this
        this.timeoutId = setTimeout(function() {
            that.performProcessing()
        }, 100)
    }
}

processor.process()

function throttle(method, context) {
    clearTimeout(method.tId)
    method.tId = setTimeout(function() {
        method.call(context)
    }, 100)
}

// 只要代码是周期性执行的，都应该使用节流，但是你不能控制请求执行的速率

