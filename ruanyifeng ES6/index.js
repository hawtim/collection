// 输入模块的指定方法（解构赋值）
const {SourceMapConsumer, SourceNode} = require('source-map')
// ES6增强了对Unicode的支持，并且扩展了字符串对象
var s = 'a'
s.codePointAt(0)
String.fromCodePoint(134071)
s.contains('a')
s.startsWith('a')
s.endsWith('a')

// 返回整数部分
Math.trunc()

// Array.of()

Array.of(1, 2, 3)


// 数组实例的 find() 和 findIndex()
arr.find(e => {
    e.value > 9
})

arr.findIndex(e => {
    e.value > 9
})

// 这两个方法都可以接受第二个参数，用来绑定回调函数的this对象


// 数组实例的fill()
['a', 'b', 'c'].fill(7)

// 数组实例的entries()， keys()和values()
for(let index of [a, b].keys()) {
    console.log(index)
}
// 谷歌原生暂未支持，会报错
for(let index of [a, b].values()) {
    console.log(index)
}
for(let [index, elem] of ['a', 'b'].entries()) {
	console.log(index, elem)
}

// 数组推导
[for (i of [1, 3, 4]) i * i]

[for (i of [1, 3, 5, 6, 8, 10]) if(i < 3) i]

// 监听与取消数组监听，指定回调函数
Array.observe()

Array.unobserve()


// Object.is() 用来比较两个值是否严格相等
// +0 不等于 -0
// NaN等于自身


// Symbol

var mySymbol = Symbol('Test')

a[mySymbol] = 'Hello'
// 等同于
Object.defineProperty(a, mySymbol, {value: 'Hello!'})

let specialMethod = Symbol()
let obj = {
    [specialMethod]: function (arg) {
        console.log(arg)
    }
}
obj[specialMethod](112)

// Proxy

// 所谓proxy就是为在目标对象之前假设一层拦截，外界对该对象的访问，都必须先通过这层拦截，可以被过滤和改写

var proxy = new Proxy({}, {
    get: function(target, property) {
        return 35
    }
})
proxy.time
proxy.name
// 总是返回35

var person = {
    name: '张三'
}

var proxy = new Proxy(person, {
    get: function(target, property) {
        if (property in target) {
            if (property == 'name') {
                return '张浩田'
            }
            return target[property]
        } else {
            throw new ReferenceError('Property \"' + property + '"\ does not exist.')
        }
    }
})

proxy.name
proxy.age

Object.observe()
Object.unobserve()

Object.observe(), Object.unobserve()

var o = {}
function observer(changes) {
    changes.forEach((change) => {
        console.log('发生变动的属性：' + change.name)
        console.log('发生变动的属性：' + change.oldValue)
        console.log('发生变动的属性：' + change.object[change.name])
        console.log('发生变动的属性：' + change.type)
    })
}

Object.observe(o, observer)

Object.observr(o, observer, ['delete']) // 只在发生delete事件时，才会调用回调函数

Set

// ES6 提供了新的数据结构Set，它类似于数组，只不过其成员值都是唯一的，没有重复的值
var s = new Set()

[2,4,5,6,6,4,3].map(e => s.add(e))

for (i of s) {
    console.log(i)
}

// Set 结构有以下方法
add(value)
delete(value)
has(value)
clear()

// 在es6中，遍历操作特指for...of循环

一是为遍历对象的属性提供统一的接口
二是使对象的属性能够按次序排列
部署了next方法的对象，就具备了遍历器功能
next方法必须返回一个包含value和done两个属性的对象
其中value属性是当前遍历位置的值，done属性是一个布尔值

function makeIterator(array) {
    var nextIndex = 0
    return {
        next: function () {
            return nextIndex < array.length ?
            {value: array[nextIndex++], done: false} :
            {value: undefined, done: true}
        }
    }
}
var it = makeIterator(['a', 'b'])
it.next() // Object {value: "a", done: false}
it.next() // Object {value: "b", done: false}
it.next() // Object {value: undefined, done: true}

// for...in 循环读取键名，for...of循环读取键值

generator，就是一个内部状态的遍历器，每调用一次遍历器，内部状态发生一次变化。
作用是完全控制内部状态的变化
有两个特征：function关键字后面有一个*星号 函数体内部使用yield语句定义遍历器的每个成员

function* helloWorldGenerator() {
    yield 'hello'
    yield 'world'
    return 'ending'
}

var hw = helloWorldGenerator()
hw.next()
// Object {value: "hello", done: false}
hw.next()
// Object {value: "world", done: false}
hw.next()
// Object {value: "ending", done: true}
hw.next()
// Object {value: undefined, done: true}

generator 函数的本质，其实是提供一种可以暂停执行的函数 yield语句就是暂停标识
由于yield后面的表达式直到调用next方法时才会执行，因此等于提供了手动的'惰性求值'的语法功能


function* f() {
    console.log('执行了')
}

var generator = f()

setTimeout(() => {
    generator.next()
}, 2000)



function showLoadingScreen() {
    console.log('xxxx')
}

function hideLoadingScreen() {
    console.log('11111')
}

function loadUIDataAsynchronously() {
    return setTimeout(() => {
        return [1, 2, 3]
    }, 1000)
}
function* loadUI() {
    showLoadingScreen()
    yield loadUIDataAsynchronously()
    hideLoadingScreen()
}

methods: {
    loadUITask() {
        return loadUI().next()
    }
}

function* numbers() {
    let file = new fileReader("numbers.txt")
    try {
        while(!file.eof) {
            yield parseInt(file.readLine(), 10)
        }
    } finally {
        final.close()
    }
}

function* longRunningTask() {
    yield step1()
    yield step2()
    // ...
    yield stepN()
}

// yield 语句是同步运行，不是异步运行
// 一般让 yield 语句返回 Promise 对象

scheduler(longRunningTask())

function scheduler(task) {
    setTimeout(() => {
        if (!task.next().done) {
            scheduler(task)
        }
    })
}

var Q = require('q')

function delay(milliseconds) {
    var deferred = Q.defer()
    setTimeout(deferred.resolve, milliseconds)
    return deferred.promise
}

function* f() {
    yield delay(1000)
}



function delay(milliseconds) {
    return setTimeout(() => {
        return new Promise(() => {
			console.log('xxxxx')
		})
    }, milliseconds)
}


function* f() {
    yield delay(1000)
}

var d = f()

// for...of 循环
// for...of 循环可以自动遍历Generator函数，且此时不在需要调用next方法

function* fibonacci() {
    let [prev, curr] = [0, 1]
    for(;;) {
        [prev, curr] = [curr, prev + curr]
        yield curr
    }
}

for (n of fibonacci()) {
    if (n > 1000) break;
    console.log(n)
}
// 以上的代码可以看出，使用for...of语句时不需要使用next方法

// yield* 语句
let delegateIterator = (function* () {
    yield 'Hello'
    yield 'Bye'
}())

let delegatingIterator = (function* () {
    yield 'Greetings!'
    yield* delegateIterator
    yield 'Ok, bye.'
}())

for(let value of delegatingIterator) {
    console.log(value)
}
// VM4299:13 Greetings!
// VM4299:13 Hello
// VM4299:13 Bye
// VM4299:13 Ok, bye.

// 上面的代码中，delegatingIterator是代理者，delegatedIterator是被代理者，由于yield* delegatedIterator语句得到的值是一个遍历器，所以要用星号表示



Promise

var promise = new Promise(function (resolve, reject) {
    if (/*...*/) {
        resolve(value)
    } else {
        reject(error)
    }
})

promise.then(function(value) {
    // success
}, function (value) {
    // failure
})

// promise 实例生成以后，可以用then方法分别制定resolve方法和reject方法的回调函数

// 常用的axios的写法

this.$axios({

}).then((res) => {

}).catch((err) => {

})

function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    }, (reject) => {
        console.log('xxxx')
    })
}

timeout(100).then(() => {
    console.log('done')
})


var getJSON = function (url) {
    var promise = new Promise(function (resolve, reject) {
        var client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = handler
        client.responseType = 'json'
        client.setRequestHeader('Accept', 'application/json')
        client.send()
        function handler() {
            if (this.readyState === this.DONE) {
                if (this.status === 200) {
                    resolve(this.response)
                } else {
                    reject(this)
                }
            }
        }
    })
    return promise
}
// 链式操作
getJSON('/posts.json').then(function (json) {
    return getJSON(post.commentURL)
}).then(function (comments) {
    // proceed
    // 后一个回调函数就会等待该Promise对象有了运行结果才进一步调用
})

// catch方法
catch方法是then(null, rejection)的别名，用于指定发生错误时的回调函数
Promise对象的错误具有冒泡的性质，会一直向后传递，直到被捕获为止

getJSON('/posts/1.json').then(function (json) {
    return getJSON(post.commentURL)
}).then(function (comments) {
    // proceed
}).catch(function (error) {
    // 处理前两个回调函数的错误
})

Promise.all 方法
// 用于将多个异步操作包装成一个新的Promise对象
var promises = [2, 3, 4, 5, 6, 7, 8].map(function (id) {
    return getJSON('/post/' + id + '.json')
})

Promise.all(promises).then(function (posts) {
    // ...
}).catch(function(reason) {
    // ...
})

Promise.resolve方法
// 有时候需要将现有对象转换为Promise对象，Promise.resolve方法就起这个作用
var jsPromise = Promise.resolve($.ajax('/whatever.json'))
如果Promise.resolve方法的参数不是具有then方法的对象，又称thenable对象，则返回一个新的Promise对象，且它的状态为resolved

var p = Promise.resolve('Hello')
p.then(function (s) {
    console.log(s)
})

async 函数
// 用来取代回调函数的另一种方法

// 在函数名之前加上async关键字，就表明该函数内部有异步操作
// 该异步操作应该返回一个promise对象，前面用await关键字注明，当函数执行的时候，一旦遇到await就会先返回，等到触发的异步操作完成，在执行函数体内后面的语句

async function getStockPrice(symbol, currency) {
    let price = await getStockPrice(symbol)
    return convert(price, currency)
}

function timeout(ms) {
    return new Promise((resovle) => {
        setTimeout(resolve, ms)
    })
}

async function asyncValue(value) {
    await timeout(50)
    return value
}

asyncValue(50).then((res) => {
    console.log(res)
})


Class
// 定义类：
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')'
    }
}

var point = new Point(2, 3)
point.toString()
// Class 之间可以通过extends关键字实现继承

class colorPoint extends Point {
    constructor(x, y, color) {
        super(x, y) // 等同于super.constuctor(x, y)
        this.color = color
    }
    toString() {
        return this.color + '' + super()
        // 在toString方法内，super() 表示对父类求值，由于此处需要字符串，所以会自动调用父类的toString方法
    }
}

var cp = new colorPoint(2, 3, '#fff')
cp.toString()


Module的基本用法

export var firstName = 'hawtim'
export var lastName = 'zhang'
export var year = 1973
// 以上或以下
var firstName = 'hawtim'
var lastName = 'zhang'
var year = 1993

export {firstName, lastName, year}

import {someMethod, another as newName} from './exporter'

// 模块整体加载

// 当用 export default people 导出时，就用import people导入

// 当用export name 时，就用 import {name} 导入

// 当一个文件里，既有一个export default people， 又有多个export name或者export age时，导入就用import people, {name, age}
