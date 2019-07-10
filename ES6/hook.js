// hook.js

// 什么是hook
// Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数，那么vue提供的这些API的作用也是类似的
// 可以让你在函数组件里“钩入” value(2.x中的data) 及生命周期等特性的函数

class Hello extends React.Component {
    constructor(props) {
        super(props)
        this.state = { date: new Date() }
    }

    componentDidMount() {
        // do sth...
    }

    componentWillUnmount() {
        // do sth...
    }

    // other methods or lifecycle...

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}

// let`s see react hook

// hook的目标就是--让你在不编写 class 的情况下使用 state 以及其他的 React 特性
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

// useState 就是 react 提供的一个 hook，通过它我们可以在function 组件中设置自己想要的 state 了，当然，react提供了很多hook来支持不同的行为和操作

// let`s see vue hook

import { value, computed, watch, onMounted } from 'vue'

const App = {
  template: `
    <div>
      <span>count is {{ count }}</span>
      <span>plusOne is {{ plusOne }}</span>
      <button @click="increment">count++</button>
    </div>
  `,
  setup() {
    // reactive state
    const count = value(0)
    // computed state
    const plusOne = computed(() => count.value + 1)
    // method
    const increment = () => { count.value++ }
    // watch
    watch(() => count.value * 2, val => {
      console.log(`count * 2 is ${val}`)
    })
    // lifecycle
    onMounted(() => {
      console.log(`mounted`)
    })
    // expose bindings on render context
    return {
      count,
      plusOne,
      increment
    }
  }
}

// hook 的时代意义
// 框架是服务于业务的，业务中很难避免的问题就是逻辑复用，同样的功能和组件，在不一样的场合下，可能需要去写 2+ 次
// 为避免耦合，后来各大框架想了一些办法

// 1. mixins
// 2. HOC 高阶组件
// 3. slot

// react 和 vue 都曾用过 mixin(react 目前已经废弃)
// Higher-Order-Components(HOC) react 中用的相对多一点，vue的话，嵌套 template 有点别扭
// slot vue 中用的多一些，react 基本不需要 slot 这种用法,

// 各自缺点

// mixins
// 可能会相互依赖，相互耦合，不利于代码维护；
// 不同的 mixin 中的方法可能会相互冲突;
// mixin 非常多时，组件是可以感知到的，甚至还要为其做相关处理， 这样会给代码造成滚雪球式的复杂性

// HOC

// 需要在原组件上进行包裹或者嵌套，如果大量使用HOC， 将会产生非常多的嵌套，这让调试变得非常困难；
// HOC可以劫持props，在不遵守约定的情况下也可能造成冲突
// props 也可能造成命名的冲突
// wrapper hell

// hook的出现是划时代的，它通过function抽离的方式，实现了复杂逻辑的内部封装
// 逻辑代码的复用
// 减小了代码体积
// 没有this的烦恼
