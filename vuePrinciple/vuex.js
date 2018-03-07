// vuejs 开发单页应用不可避免会遇到组件共享的数据或状态的问题，应用规模小的时候 使用 props 事件来处理，或者通过 eventBus
// 但应用复杂了以后，就会出现数据流混乱的问题

// 借鉴了 flux 和redux 的基本思想，将状态抽离到全局形成一个 Store
// 因为 vuex 内部采用 new vue 来将 Store 内的数据进行【响应式化】，所以vuex是一款利用vue内部机制的库， 与Vue高度契合

let Vue

export default function install (_Vue) {
    // 采用 Vue.mixin 方法将 vuexInit 方法混淆进 beforeCreate 钩子中，并用 Vue 保存对象
    Vue.mixin({
        beforeCreate: vuexInit
    })
    Vue = _Vue
}

new Vue({
    el: '#app',
    store
})

function vuexInit() {
    const options = this.$options
    if (options.store) {
        this.$store = options.store
    } else {
        this.$store = options.parent.$store
    }
    
}

class Store {
    constructor() {
        this._vm = new Vue({
            data: {
                $$state: this.state
            }
        })
    }
}

// commit 触发 mutation

// 从 _mutations 中取出对应的 mutation， 循环执行其中的每一个 mutation

function commit(type, payload, _options) {
    const entry = this._mutations[type]
    entry.forEach(function commitIterator(handler) {
        handler(payload)
    })
}

// dispatch 触发 action，可以包含异步状态

function dispatch(type, payload) {
    const entry = this._actions[type]
    return entry.length > 1 ? Promise.all(entry.map(handler => handler(payload))) : entry[0](payload)
}
