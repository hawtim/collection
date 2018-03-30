// 在大型应用中，我们可能需要将应用拆分为多个小模块，按需从服务器下载
// Vue.js 允许将组件定义为一个工厂函数，异步地解析组件的定义
// Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染

// 工厂函数接收一个 resolve 回调，在收到从服务器下载的组件定义时调用
Vue.component('async-webpack-example', function (resolve) {
    // 这个特殊的 require 语法告诉 webpack
    // 自动将编译后的代码分割成不同的块，
    // 这些块将通过 Ajax 请求自动下载。
    require(['./my-async-component'], resolve)
  })

//   你可以在工厂函数中返回一个 Promise
Vue.component('async-webpack-example', () => {
    import('./my-async-component')
})

// 局部注册
new Vue({
    // ...
    components: {
        'my-component': () => import('./my-async-component')
    }
})