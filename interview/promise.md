## js的异步机制和 promise

js的异步机制，
首先要区分是同步，什么是异步
同步函数调用后的能够立即得到预期结果
异步函数调用后不能立即得到预期结果，而是需要通过注册事件回调来获得预期结果

**js 的执行是单线程的，那么怎么会有异步行为？**
这里就要涉及到浏览器的线程机制了
浏览器通常有
渲染线程：负责页面的渲染
js主线程： 负责js 的解析和执行（两者不能同时进行）

定时器触发线程： 处理定时事件， setTimeout setInterval
事件触发线程： 处理 DOM 事件
异步 http 请求线程： 处理 http 请求

js 是单线程的，但浏览器内部不是单线程的，浏览器提供了其他的线程来完成一些操作
所以我们可以知道js 是通过 js 主线程与浏览器中其他线程交互协作实现异步的

这时候就需要了解消息队列和事件循环

在 js 主线程中存在执行栈，用来存储同步任务，比如变量和函数的初始化
以及事件队列，会把异步任务的响应推入队列中，比如 setTimeout 中待执行的事件


js 主线程用来执行 执行栈中的同步任务，当所有同步任务执行完以后，栈被清空，然后读取事件队列中的中异步任务的回调函数，压入栈中，就像执行新的同步任务

（js 主线程从事件队列中读取任务是不断循环的，每次栈被清空后，都会在事件队列中读取新的任务，如果没有的话，就会进行等待）

比如 ajax 请求，js 线程发出ajax 请求之后，就继续执行后续的代码，等到同步任务完成，
就会在某个时刻调用 ajax 的回调函数

# Promise 实现

Promise  的出现解决了回调地狱的问题
比如要根据第一个网络请求的结果去请求第二个，第三个，第四个
就要嵌套 ajax 代码
有什么缺点：
代码臃肿、可读性差
耦合度过高、可维护性差
代码复用性差


Promise 是 ES6 新增的语法， 它的出现解决了回调地狱的问题可以将 Promise 理解一个状态机。初始是 pending 状态，通过传入函数 resolve 和 reject，可以将状态转变为 resolved 或者 rejected （状态一旦改变就不能再次变化）。then 函数会返回一个 Promise 实例，并且该返回值是一个新的实例。

（因为 Promise 规范规定除了 pending 状态，其他状态是不可以改变的，如果返回的是一个相同实例的话，多个 then 调用就失去意义了。）
**常见 api**
对于 then 来说，是为 Promise 注册回调函数
catch 是捕获异常
race 多个 promise 任务同时执行，返回最先执行结束的结果，无论成功或失败
all 多个 promise 同时执行，如果全部执行，则以数组的方式返回所有 promise 任务的执行结果，否则返回 rejected 任务的结果




































```js
// 三种状态
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
// promise 接收一个函数参数，该函数会立即执行
function MyPromise(fn) {
  let _this = this;
  _this.currentState = PENDING;
  _this.value = undefined;
  // 用于保存 then 中的回调，只有当 promise
  // 状态为 pending 时才会缓存，并且每个实例至多缓存一个
  _this.resolvedCallbacks = [];
  _this.rejectedCallbacks = [];

  _this.resolve = function (value) {
    if (value instanceof MyPromise) {
      // 如果 value 是个 Promise，递归执行
      return value.then(_this.resolve, _this.reject)
    }
    setTimeout(() => { // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = RESOLVED;
        _this.value = value;
        _this.resolvedCallbacks.forEach(cb => cb());
      }
    })
  };

  _this.reject = function (reason) {
    setTimeout(() => { // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED;
        _this.value = reason;
        _this.rejectedCallbacks.forEach(cb => cb());
      }
    })
  }
  // 用于解决以下问题
  // new Promise(() => throw Error('error))
  try {
    fn(_this.resolve, _this.reject);
  } catch (e) {
    _this.reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  // 规范 2.2.7，then 必须返回一个新的 promise
  var promise2;
  // 规范 2.2.onResolved 和 onRejected 都为可选参数
  // 如果类型不是函数需要忽略，同时也实现了透传
  // Promise.resolve(4).then().then((value) => console.log(value))
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => throw r;

  if (self.currentState === RESOLVED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
      // 所以用了 setTimeout 包裹下
      setTimeout(function () {
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }

  if (self.currentState === REJECTED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        // 异步执行onRejected
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }

  if (self.currentState === PENDING) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      self.resolvedCallbacks.push(function () {
        // 考虑到可能会有报错，所以使用 try/catch 包裹
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });

      self.rejectedCallbacks.push(function () {
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
    }));
  }
};
// 规范 2.3
function resolutionProcedure(promise2, x, resolve, reject) {
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof MyPromise) {
    if (x.currentState === PENDING) {
      x.then(function (value) {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  // 规范 2.3.3.3.3
  // reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false;
  // 规范 2.3.3，判断 x 是否为对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try {
      // 规范 2.3.3.1
      let then = x.then;
      // 如果 then 是函数，调用 x.then
      if (typeof then === "function") {
        // 规范 2.3.3.3
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            // 规范 2.3.3.3.1
            resolutionProcedure(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // 规范 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 规范 2.3.4，x 为基本类型
    resolve(x);
  }
}
```