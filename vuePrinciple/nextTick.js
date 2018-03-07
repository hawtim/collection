// 批量异步更新策略及 nextTick 原理

// 简单回顾一下，修改 data 后修改视图的过程是

// "setter -> Dep -> Watcher -> patch -> 视图"

// Vue.js 在默认情况下，每次触发某个数据的 setter 方法后，对应的 Watcher 对象其实会被 push 进一个队列 queue 中，在下一个 tick 的时候将这个队列全部拿出来 run ( Watcher 对象的一个方法，用来触发 patch 操作) 一遍

// vuejs 实现了一个 nextTick 函数，传入一个 cb，这个cb 会被存储到一个队列中，在下一个 tick 时触发队列中的所有 cb 事件

// vuejs 源码中分别用 Promise、setiTimeout、setImmediate 等方式在 microTask 中创建一个事件，目的是在当前调用栈执行完毕后，（不一定立即）才会去执行这个事件


let callbacks = []
let pending = false

function nextTick(cb) {
    callbacks.push(cb)
    if (!pending) {
        pending = true
        setTimeout(flushCallbacks, 0)
    }
}

function flushCallbacks() {
    console.log('执行 -------------')
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

// 我们将多次修改的某一属性对应的 Watcher 对象给 push 进一个队列 queue 中去，等下一个 tick 的时候再去执行，但我们不需要执行多个同样的 watchter 对象去修改界面，而是只需要执行一个watcher 对象，使其在界面上的数据变化即可

// 那么我们需要执行一个过滤的操作，同一个的 watcher 在同一个 tick 的时候应该只被执行一次
// 队列 queue 中不应该出现重复的 watcher 对象

// 给 Watcher 对象起个名字，用 id 来标记每一个 watcher 对象
// 实现 update 方法，在修改数据后由 Dep 来调用


let uid = 0
class Watcher {
    constructor() {
        this.id = ++uid
    }
    update() {
        console.log('Watch' + this.id + 'update')
        queueWatcher(this)
    }
    run() {
        console.log('watch' + this.id + '视图更新了~')
    }
}

let has = {}
let queue = []
let waiting = false

function queueWatcher(watcher) {
    const id = watcher.id
    if (has[id] == null) {
        has[id] = true
        queue.push(watcher)
        if (!waiting) {
            waiting = true
            nextTick(flushSchedulerQueue)
        }
    }
}

function flushSchedulerQueue() {
    let watcher, id
    for (let index = 0; index < queue.length; index++) {
        console.log(queue)
        watcher = queue[index]
        id = watcher.id
        has[id] = null
        watcher.run()
    }
    waiting = false
}

// example 

let watch1 = new Watcher()
let watch2 = new Watcher()

watch1.update()
watch1.update()
watch2.update()