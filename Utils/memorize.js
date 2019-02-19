// 缓存函数
function Memorize(func, obj) {
    var obj = obj || window
    func = obj[func]
    cache = {}
    return function () {
        var key = Array.prototype.join.call(arguments, '-')
        if (!(key in cache)) {
            cache[key] = func.apply(obj, arguments)
        }
        return cache[key]
    }
}

var fib = {
    fib: function (n) {
        if (n == 0 || n == 1) {
            return 1
        }
        return this.fib(n-1) + this.fib(n-2)
    },
    fib_memo: function (n) {
        if (n == 0 || n == 1) {
            return 1
        }
        return this.fib_memo(n-1) + this.fib_memo(n-2)
    }
}

fib.fib_memo = Memoize('fib_memo', fib);
var time1 = new Date
var b = fib.fib_memo(30)
var time2 = new Date - time1
alert(time2)
alert(b)
