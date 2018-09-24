function add() {
    var oldArgs = [...arguments]
    if (oldArgs.length > 1) {
        var result = 0
        oldArgs.forEach(arg => {
            result += arg
        })
        console.log(result)
        return result 
    }
    return function () {
        var result = 0
        var args = oldArgs.concat([...arguments])
        args.forEach(arg => {
            result += arg
        })
        console.log(result)
        return result
    }
}

add()()
add(1)(2)
add(2, 3)

function makeFunc() {
    var args = [...arguments]
    var func = args.shift()
    return function() {
        console.log(args.concat([...arguments]))
        return func.apply(null, args.concat([...arguments])) // undefined or null thisArg is replaced with global object 
        // 严格模式下，传入参数不进行转换
    }
}

makeFunc(add, 1, 2)(2, 3, 4)


