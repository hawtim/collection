// Promise 处理多个相互关联的异步请求

const request = url => {
  return new Promise((resolve, reject) => {
    $.get(url, data => {
      resolve(data)
    })
  })
}

// 请求data1
request(url)
  .then(data1 => {
    return request(data1.url)
  })
  .then(data2 => {
    return request(data2.url)
  })
  .then(data3 => {
    console.log(data3)
  })
  .catch(err => {
    throw new Error(err)
  })

// promise 有三种状态， pending， fulfilled， rejected
// resolve pending => fulfilled
// reject pending => rejected

// resolve(成功) onFulfilled会被调用
const promise = new Promise((resolve, reject) => {
  resolve('fulfilled')
})
promise.then(
  result => {
    console.log(result)
  },
  reason => {}
)

// reject(失败) onRejected会被调用

const promise = new Promise((resolve, reject) => {
  reject('rejected') // 状态由 pending => rejected
})
promise.then(
  result => {
    // onFulfilled 不会被调用
  },
  reason => {
    // onRejected
    console.log(reason) // 'rejected'
  }
)

// promise.catch

promise.catch(onRejected)
// ==
promise.then(null, onRejected)

// 这种写法 onRejected 不能捕获当前 onFulfilled 中的异常
promise.then(onFulfilled, onRejected)

// 链式写法才可以
promise.then(onFulfilled).catch(onRejected)

// promise chain 链式写法

// promise.then 方法每次调用都返回一个新的 promise 对象，所以可以链式写法
function taskA() {
  console.log('Task A')
}
function taskB() {
  console.log('Task B')
}
function onRejected(error) {
  console.log('Catch Error: A or B', error)
}

var promise = Promise.resolve()
promise
  .then(taskA)
  .then(taskB)
  .catch(onRejected) // 捕获前面then方法中的异常

// Promise 的静态方法

// 1. Promise.resolve 返回一个 fulfilled 状态的 promise 对象
Promise.resolve('hello')
// 相当于
const promise = new Promise(resolve => {
  resolve('hello')
})

// 2. Promise.reject 返回一个 rejected 状态的 promise 对象

Promise.reject(24)
// 相当于
new Promise((resolve, reject) => {
  reject(24)
})

// 3. Promise.all 接受一个 promise 对象数组为参数
// 只有全部 resolve 才会调用，通常会用来处理多个并行异步操作

const p1 = new Promise((resolve, reject) => {
  resolve(1)
})

const p2 = new Promise((resolve, reject) => {
  resolve(2)
})

const p3 = new Promise((resolve, reject) => {
  reject(3)
})

Promise.all([p1, p2, p3]).then(
  data => {
    console.log(data) // [1, 2, 3] 结果顺序和promise实例数组顺序是一致的
  },
  err => {
    console.log(err)
  }
)

// 4. Promise.race 接受一个 promise 对象数组为参数

// Promise.race 只要有一个promise 对象进入 fulFilled 或者 rejected 状态，就会继续进行后面的处理

function timerPromisify(delay){
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            resolve(delay)
        }, delay)
    })
}

var startDate = Date.now()

Promise.race([
    timerPromisify(10),
    timerPromisify(20),
    timerPromisify(30)
]).then(function(values) {
    console.log(values)
})

// Promise 底层代码实现

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(excutor) {
    let that = this // 保存当前 promise 实例对象
    that.status = PENDING // 初始状态
    that.value = undefined // fulfilled 状态返回的信息
    that.reason = undefined // rejected 状态拒绝的原因
    that.onFulfilledCallbacks = [] // 存储 fulfilled 状态对应的 onFulfilled 函数
    that.onRejectedCallbacks = [] // 存储 rejected 状态对应的 onRejected 函数

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject)
        }
        // resolve 加 setTimeout ？
        // 2.2.4 规范 onFulfilled 和 onRejected 只允许在 execution context 栈仅包含平台代码时运行
        // 这里的平台代码指的是引擎、环境以及 promise 的实施代码
        // 实践中要确保 onFulfilled 和 onRejected 方法异步执行
        // 且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行
        setTimeout(() => {
            if (that.status === PENDING) {
                that.status = FULFILLED
                that.value = value
                that.onFulfilledCallbacks.forEach(cb => cb(that.value))
            }
        })
    }

    function reject(reason) {
        setTimeout(() => {
            if (that.status === PENDING) {
                // 只能由 pending => rejected 状态
                // 避免调用多次 resolve reject
                that.status = REJECTED
                that.reason = reason
                that.onRejectedCallbacks.forEach(cb => cb(that.reason))
            }
        })
    }

    // 捕获在 excutor 执行器中抛出的异常
    try {
        excutor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

/**
 * resolve中的值几种情况：
 * 1.普通值
 * 2.promise对象
 * 3.thenable对象/函数
 */

/**
 * 对resolve 进行改造增强 针对resolve中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        // 如果从 onFulfilled 中返回的 x 就是 promise2 就会导致循环引用报错
        return reject(new TypeError('循环引用'))
    }

    let called = false; // 避免多次调用
    // 如果 x 是一个 promise 对象
    if (x instanceof Promise) { // 获得它的终值，继续 resolve
        if (x.status === PENDING) { // 如果为等待态需等待直至 x 被执行或拒绝，并解析 y 值
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, reason => {
                reject(reason)
            })
        } else { // 如果 x 已经处理执行态/拒绝态（值已经被解析为普通值），用相同的值执行传递下去 promise
            x.then(resolve, reject)
        }
        // 如果 x 为对象或者函数
    } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
        try { // 是否有 thenable 对象（具有 then 方法的对象/函数）
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, reason => {
                    if (called) return
                    called = true
                    reject(reason)
                })
            } else {
                // 普通对象/函数
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

/**
 * [注册fulfilled状态/rejected状态对应的回调函数]
 * @param  {function} onFulfilled fulfilled状态时 执行的函数
 * @param  {function} onRejected  rejected状态时 执行的函数
 * @return {function} newPromise  返回一个新的promise对象
 */

Promise.prototype.then = function(onFulfilled, onRejected) {
     const that = this
     let newPromise
     onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
     onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
         // then里面的FULFILLED/REJECTED状态时 为什么要加setTimeout ?
    // 原因:
    // 其一 2.2.4规范 要确保 onFulfilled 和 onRejected 方法异步执行(且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行) 所以要在resolve里加上setTimeout
    // 其二 2.2.6规范 对于一个promise，它的then方法可以调用多次.（当在其他程序中多次调用同一个promise的then时 由于之前状态已经为FULFILLED/REJECTED状态，则会走的下面逻辑),所以要确保为FULFILLED/REJECTED状态后 也要异步执行onFulfilled/onRejected

    // 其二 2.2.6规范 也是resolve函数里加setTimeout的原因
    // 总之都是 让then方法异步执行 也就是确保onFulfilled/onRejected异步执行

    // 如下面这种情景 多次调用p1.then
    // p1.then((value) => { // 此时p1.status 由pedding状态 => fulfilled状态
    //     console.log(value); // resolve
    //     // console.log(p1.status); // fulfilled
    //     p1.then(value => { // 再次p1.then 这时已经为fulfilled状态 走的是fulfilled状态判断里的逻辑 所以我们也要确保判断里面onFuilled异步执行
    //         console.log(value); // 'resolve'
    //     });
    //     console.log('当前执行栈中同步代码');
    // })
    // console.log('全局执行栈中同步代码');


     if (that.status === FULFILLED) { // 成功态
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try{
                    let x = onFulfilled(that.value);
                    resolvePromise(newPromise, x, resolve, reject); // 新的promise resolve 上一个onFulfilled的返回值
                } catch(e) {
                    reject(e); // 捕获前面onFulfilled中抛出的异常 then(onFulfilled, onRejected);
                }
            });
        })
    }

    if (that.status === REJECTED) { // 失败态
        return newPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(that.reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }

    if (that.status === PENDING) { // 等待态
        // 当异步调用resolve/rejected时 将onFulfilled/onRejected收集暂存到集合中
        return newPromise = new Promise((resolve, reject) => {
            that.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
            that.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(newPromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }
 }

 /**
 * Promise.all Promise进行并行处理
 * 参数: promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 当这个数组里的所有promise对象全部变为resolve状态的时候，才会resolve。
 */
Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
        let done = gen(promises.length, resolve);
        promises.forEach((promise, index) => {
            promise.then((value) => {
                done(index, value)
            }, reject)
        })
    })
}

function gen(length, resolve) {
    let count = 0;
    let values = [];
    return function(i, value) {
        values[i] = value;
        if (++count === length) {
            console.log(values);
            resolve(values);
        }
    }
}

/**
 * Promise.race
 * 参数: 接收 promise对象组成的数组作为参数
 * 返回值: 返回一个Promise实例
 * 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理(取决于哪一个更快)
 */
Promise.race = function(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
           promise.then(resolve, reject);
        });
    });
}

// 用于promise方法链时 捕获前面onFulfilled/onRejected抛出的异常
Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}

Promise.resolve = function (value) {
    return new Promise(resolve => {
        resolve(value);
    });
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}

/**
 * 基于Promise实现Deferred的
 * Deferred和Promise的关系
 * - Deferred 拥有 Promise
 * - Deferred 具备对 Promise的状态进行操作的特权方法（resolve reject）
 *
 *参考jQuery.Deferred
 *url: http://api.jquery.com/category/deferred-object/
 */
Promise.deferred = function() { // 延迟对象
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

/**
 * Promise/A+规范测试
 * npm i -g promises-aplus-tests
 * promises-aplus-tests Promise.js
 */

try {
    module.exports = Promise
} catch (e) {

}