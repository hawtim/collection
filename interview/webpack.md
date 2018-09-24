## webpack 作用是什么，怎么理解 webpack 和 gulp 区别 ，热更新怎么实现的

构建复杂的单页应用程序(SPA)。

Webpack 把一切都作为模块，然后通过不同的加载器 loader 来加载这些模块，通过 plugin 扩展原有的模块打包流程，最终将所有前端资源进行打包。
使用 HMR （hot-module-reload） 提升开发体验，利用代码压缩和分隔来提高前端加载性能


### webpack 和 gulp 的区别
gulp是一个实现工作流的工具，而webpack等等是模块化方案
gulp 可以优化前端工作流，比如自动刷新页面，压缩css及js，编译 scss 等预处理器，编译 es6 ，把手动的事情变成任务去处理

webpack 是一个模块化方案，更侧重模块打包，可以把开发中的所有资源都看成模块，通过 loader 和 plugins 对资源进行处理，打包成符合生产环境部署的前端资源

## 热更新实现
Webpack编译期，为需要热更新的 entry 注入热更新代码 (EventSource通信)
页面首次打开后，服务端与客户端通过 EventSource 建立通信渠道，把下一次的 hash 返回前端
客户端获取到hash，这个hash将作为下一次请求服务端 hot-update.js 和 hot-update.json的hash
修改页面代码后，Webpack 监听到文件修改后，开始编译，编译完成后，发送 build 消息给客户端
客户端获取到hash，成功后客户端构造hot-update.js script链接，然后插入主文档
hot-update.js 插入成功后，执行hotAPI 的 createRecord 和 reload 方法，获取到 Vue 组件的 render 方法，重新 render 组件， 继而实现 UI 无刷新更新。

EventSource 接口用于接受服务器发送的事件，他通过 HTTP 连接到一个服务器，以 text/event-stream 格式接收事件，不关闭连接

## 怎么用 webpack 写一个 plugin

最近在看 webpack4 的教程，有所了解，
插件的实现可以是一个类，比如我 定义一个 testPlugin 类，再把这个类导入 webpack 的配置文件中，在 plugins 配置项中对testPlugin进行实例化， 这个配置项支持用数组的形式传入多个插件