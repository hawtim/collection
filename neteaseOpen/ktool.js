// 开始构建锋利的开源工具库
// 定位方向
// 工具库架构搭建
// 扩展面向对象编程 vs 函数式编程

// 解决的问题
// 什么是库

// 库是将代码集合成一个产品，供开发者调用。
// 面向对象的代码组织形式而成的库也叫类库。
// 面向过程的代码组织形式而成的库也叫函数库。
// 开发者在使用库的时候，只需要使用库的一部分类或者函数，然后继续实现自己的功能。

// 什么是框架
// 框架则是为解决一类问题而开发的产品，框架用户一般只需要使用框架提供的类或函数，即可实现全部功能

// jq库 封装了一些你可能会用到的方法
// vue 框架 这类问题我是这么解决的，来我教你怎么写组件，路由，怎么做数据状态管理

// 原生 js 的表现力不强
// 基于现有的方法来进行二次封装
// 类型检测
// 节流防抖

// ES6新特性浏览器不兼容
// 数据进行多道工序处理不可控风险增加

// 数据处理的工具库

// 工具库功能强大实用性强
// 操作上像jq一样简单
// 能使用链式调用


// IIFE
// 不能直接扩展原生内置对象，因为非常消耗性能
(function(root) {
    var _ = function(obj) {
        if (!(this instanceof _)) {
            return new _(obj)
        }
        this.wrap = obj
    }
    // 数据去重
    _.unique = function(target, callback) {
        var result = []
        var computed
        for(var i = 0; i < target.length; i++) {
            computed = callback ? callback(target[i]) : target[i]
            if (result.indexOf(computed) === -1) {
                result.push(computed)
            }
        }
        return result
    }
    _.reduce = function(target) {
        console.log('reduce', target)
        return target
    }
    _.prototype.value = function() {
        return this.wrap
    }
    _.each = function(arr, callback) {
        for(var i = 0; i < arr.length; i++) {
            callback.call(arr, arr[i])
        }
    }
    _.chain = function(obj) {
        var instance = _(obj)
        instance._chain = true
        return instance
    }
    _.result = function(instance, obj) {
        console.log(_(obj))
        return instance._chain ? _(obj).chain() : obj
    }
    _.functions = function(obj) {
        var result = []
        for(var key in obj) {
            result.push(key)
        }
        return result
    }
    // 自身扩展的方法  [属性名，属性名，属性名]   添加到原型对象中
    _.mixin = function(obj) {
        _.each(_.functions(obj), function(key) {
            var func = obj[key]
            obj.prototype[key] = function() {
                var args = [this.wrap]
                Array.prototype.push.apply(args, arguments)
                // 实例对象和数据传递给辅助函数
                return _.result(this, func.apply(this, args))
            }
        })
    }
    _.mixin(_)
    root._ = _
})(this);


// 函数式编程 流式思想 所有的函数都是一个管道


// 面向对象程序设计是种具有对象概念的程序编程范型，同时也是一种程序开发的方法

// 函数式变成是相对于命令式编程而言，命令式编程依赖数据的变化来管理状态变化，而函数编程为克服数据变化带来的状态管理的复杂性，限制数据为不可变，其选择使用流式操作来进行状态管理
// 而流式操作以函数为基本的操作单元，通过对函数的抽象和组合来完成整个任务
