var foo = {
    value: 1
}

function bar() {
    console.log(this.value)
}

// var bindFoo = bar.bind(foo)
// bindFoo()

// 第一个，保存this返回一个函数

Function.prototype.bind2 = function(context) {
    var self = this
    console.log(this)
    var args = Array.prototype.slice.call(arguments, 1)
    console.log('args', args)
    return function() {
        console.log(this)
        var bindArgs = Array.prototype.slice.call(arguments)
        console.log('bindArgs', bindArgs)
        self.apply(context, args.concat(bindArgs))
    }
}

var bindFoo2 = bar.bind2(foo, 'xxxx')
var obj2 = new bindFoo2('女')
console.log(obj2.a)
