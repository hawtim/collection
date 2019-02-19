组件/实例的选项应该有统一的顺序

1. 副作用（触发组件外的影响）
`el`
2. 全局感知（要求组件以外的知识）
`name`, `parent`
3. 组件类型（更改组件类型）
`functional`
4. 模板修改器（改变模板的编译方式）
`delimiters`, `comments`
5. 模板依赖（模板内使用的资源）
`components`, `directives`、`filters`
6. 组合（向选项里合并属性）
`extends`, `mixins`
7. 接口（组件的接口）
`inheritAttrs`, `model`, `props/propsData`
8. 本地状态（本地的响应式属性）
`data`, `computed`
9. 事件（通过响应式时间触发的回调）
`watch`
生命周期钩子（按照它们被调用的顺序）
`beforeCreate`
`created`
`beforeMount`
`mounted`
`beforeUpdate`
`updated`
`activated`
`deactived`
`beforeDestroy`
`destroyed`
10. 非响应式的属性（不依赖响应系统的实例属性）
`methods`
11. 渲染
`template/render`
`renderError`

元素特性的顺序

1. 定义 (提供组件的选项)
`is`
2. 列表渲染 (创建多个变化的相同元素)
`v-for`
3. 条件渲染 (元素是否渲染/显示)
`v-if`
`v-else-if`
`v-else`
`v-show`
`v-cloak`
4. 渲染方式 (改变元素的渲染方式)
`v-pre`
`v-once`
5. 全局感知 (需要超越组件的知识)
`id`
6. 唯一的特性 (需要唯一值的特性)
`ref`
`key`
`slot`
7. 双向绑定 (把绑定和事件结合起来)
`v-model`
8. 其它特性 (所有普通的绑定或未绑定的特性)
9. 事件 (组件事件监听器)
`v-on`
10. 内容 (复写元素的内容)
`v-html`
`v-text`