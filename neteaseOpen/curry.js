
const curryAdd = function(a) {
    return function(b) {
        return function(c) {
            return a + b + c
        }
    }
}
console.log(curryAdd(1)(2)(3))

const add = curryAdd(1)

// 核心：降低通用性，提高适用性

// 1. 参数复用——提高性能
// 跳过前面多个参数的计算


// 2. 提前返回

var addEvent = function() {
    if (window.addEventListener) {
        return function(el, type, fn, capture)  {
            el.addEventListener(type, function(e) {
                fn.call(el, e)
            }, capture)
        }
    } else {
        return function(el, type, fn, capture)  {
            // addEvent = el.attachEvent(...)
        }

    }
}

var elBindEvent = addEvent()
elBindEvent(p, click, callback, true)

// 3. 延迟执行 不定参数
var allScore = 0
var addScore = function(score) {
    // 对分数的判断
    allScore += score
}

var curryScore = function(fn) {
    var _allScore = []
    return function() {
        if (arguments.length === 0) {
            // return _allScore.reduce(function(x, y) {
            //     return x + y
            // })
            console.log(this)
            return fn.apply(null, _allScore) // apply 行实转换 对象冒充 执行函数
        } else {
            _allScore = _allScore.concat([].slice.call(arguments))
        }
    }

}

var curryAddScore = curryScore(function() {
    console.log(arguments)
    return [].slice.call(arguments).reduce(function(x, y) {
        return x + y
    })
})

// 延迟的好处，空间换时间
curryAddScore(3)
curryAddScore(3)
curryAddScore(3)
curryAddScore(3)
curryAddScore(3)
curryAddScore(3)
curryAddScore(3)
curryAddScore()



// 4. 通用 curry 写法
var curry = function(fn) {
    var _args = []
    return function cb() {
        if (arguments.length == 0) {
            return fn.apply(null, _args)
        }
        // 将最新的参数与之前的参数合并
        Array.prototype.push.apply(_args, [].slice.call(arguments))
        return cb
    }
}

function add(a, b, c) {
    return a + b + c
}

var addCurry = curry(add)
addCurry(1)(2)(3)()


// 柯里化 多元转为一元   偏函数 n元转为 n - 1 元

// arguments 比直接取形参更慢，过多的闭包开销会更大
