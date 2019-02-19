class Dep {
    constructor() {
        // 存放 Watcher 对象的数组
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

class Watcher {
    constructor() {
        // 默认 Dep.target 为 undefined
        Dep.target = this
    }

    update() {
        console.log('视图更新啦~')
    }
}


function defineReactive(obj, key, val) {
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            dep.addSub(Dep.target)
            console.log('dep.subs', dep.subs)
            console.log('Dep.target', Dep.target)
            return val
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val) return
            dep.notify()
        }
    })
}

function observer(value) {
    if (!value || (typeof value !== 'object')) return
    Object.keys(value).forEach(key => {
        defineReactive(value, key, value[key])
    })
}

class Vue {
    constructor(options) {
        this._data = options.data
        observer(this._data)
        new Watcher()
        console.log('render~', this._data.test)
    }
}

let object = new Vue({
    data: {
        test: 'I am test.',
    }
})
object._data.test = 'Hello world!'
console.log(Dep.target)
Dep.target = null