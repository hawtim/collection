function chunk(array, process, context) {
    setTimeout(function () {
        // 会改变原数组，如果需要保持原数组不变，应该讲数组的克隆传递给 chunk()
        var item = array.shift()
        process.call(context, item)
        if (array.length > 0) {
            setTimeout(arguments.callee, 100)
        }
    }, 100)
}

// chunk 方法接受三个参数： 要处理的项目，处理项目的函数，可选的运行该函数的环境

var data = [12, 123, 1234, 453, 436, 23, 23, 5, 4123, 45, 346, 5634, 2234, 345, 342];

function printValue(item) {
    console.log(item)
}
chunk(data, printValue);

// 数组分块的重要性在于它可以将多个项目的处理在执行队列上分开，在每个项目处理之后，给予其他的浏览器执行的机会

