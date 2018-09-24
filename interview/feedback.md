# CSS & CSS3

## 块级元素和行内元素有什么区别

块元素 {
    总是在新行上开始
    能容纳其他块元素或者内联元素
    高度、行高、内外边距都可以控制
}

内联元素 {
    和其他元素在一行
    只能容纳文本或其他内联元素
    高度、行高、上下边距不可改变，因为行高不可变，所以看不出效果
}

## css3 动画

给头像添加一个 hover 效果

使用 @keyframe
时间为 1s 循环播放 曲线为 ease 指定正向播放

normal 正向播放
reverse 反向播放
alternate 动画交替反向运行，反向运行时，动画按步后退
alternate-reverse 反向交替

移动上去时头像缩放 心跳抖动那样子，分别在 0% 33.3% 66.6% 100% 定义不同的 scale 比例

同时周围有个波纹的效果，效果类似鼠标点下去 压下去，圈圈扩张， 随后弹回来，圈圈缩小

## 高性能的动画

如果某些帧花费的时间太长，进而导致浏览器的刷新频率跟不上设备的刷新频率（跳帧现象），就会出现页面闪烁
所以在 Web 应用中运行的动画都应该保持在 60FPS 下
`tranlate3d(0,0,0)`
解决页面闪白
保证动画流畅
会开启 GPU 硬件加速模式，从而让浏览器在渲染动画时从 CPU 转向 GPU
`opacity`
也会开启 GPU 硬件加速模式
改变其他属性都可能导致页面重绘和回流，导致页面重新渲染，阻塞动画重新渲染
`自定义控制动画进程`
运行在后台标签页或者隐藏的 iframe 里时，requestAnimationFrame() 暂停调用以提升性能和电池寿命。
函数节流

## 绝对定位的元素是怎么定位的

相对第一个 postion 属性不为 static 的父元素定位

## 做重构的时候有遇到什么有趣的问题吗？

### 实现相对 fixed
```html
<div class="assistor">
  <div class="parent">
    <div class="child"></div>
    <div class="placeholder"></div>
  </div>
</div>
```
```css
.assistor {
  position: relative; /*关键点*/
  display: block;
  width: 500px;
  height: 300px;
  margin: 100px auto 0 auto;
  background-color: #ddd;
}
.parent {
  width: 500px;
  height: 300px;
  background-color: #888;
  overflow: auto; /*关键点*/
}
.child {
  position: absolute; /*关键点*/
  width: 120px;
  height: 120px;
  margin: 100px 50px;
  background-color: #333;
}
.placeholder {
  width: 1000px;
  height: 1000px;
}
```

## CSS 有哪些选择器

id
类
标签
相邻 +
子 空格
后代 >
通配 *
属性[type="text"]
伪类 :after {}

## 选择器优先级
!important >  id > class > tag

## CSS3新增伪类举例
p:first/last-of-type 选择属于其父元素的首个<p>元素的每个<p>元素。
p:only-of-type  选择属于其父元素唯一的<p>元素的每个<p>元素。
p:only-child    选择属于其父元素的唯一子元素的每个<p>元素。
p:nth-child(2)  选择属于其父元素的第二个子元素的每个<p>元素。

## 实现垂直水平居中

七种方案





## 伪类和伪元素的区别

单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。
伪类

# js

1. 用过哪些 ES6 语法
 * let 和 const、变量提升、作用域及 this 指向
 * 对象属性值简写
 * 模块引入与导出
 * 解构赋值
 * 模板字符串
 * 箭头函数
 * promise


2. 优化过什么

路由分块，减小入口文件大小
使用雪碧图合并图片减少请求
使用webpack插件进行图片压缩
以及 html 和 css 的压缩插件


# vue

vue 和 jq 使用上的差别

新型mvvm库：vue.js 与传统库jquery

vue适用的场景：
适合中大型项目的搭建
复杂数据操作的后台页面
表单填写页面
实现UI组件化，通过对组件的复用提升开发效率
实现的代码简洁，能够快速实现
不用操作 dom

jquery适用的场景：
一些用于展示html5页面
一些需要js来操作页面样式的页面
不适合开发大型的项目，代码不够简洁，需要去了解 jq 的 api 来理解代码
改动界面的样式具有较大的耦合性，依赖具体的结构
比如一个 getElementsByClassName 获取一堆节点，然后需用用 each() 方法去对每个 dom 节点进行操作，代码维护性比较差

然而二者也是可以结合起来一起使用的，vue 侧重数据绑定，jquery 侧重样式操作，动画效果等，则会更加高效率的完成业务需求

函数式组件和普通组件的区别

# vuex 的使用
mutations 使用 commit state 和 参数，单一职责
actions 内部执行异步操作，通过 dispatch 传入 context


# 对 http 了解吗？ http 状态码

http 无状态协议，需要借助 cookie 或者 token 来识别身份，数据传输是明文，对于敏感信息可以进行前端加密

https 非对称加密，对称加密，在交换密钥期间使用 非对称加密，交换完密钥之后使用对称加密进行数据传输

http2.0
二进制数据、
多路复用、
header 压缩、
服务器推送

# 遇到什么安全问题

XSS（跨站指令码）
修改 HTML 节点或者执行 JS 代码来攻击网站

CSRF（跨站请求伪造）
CSRF 就是利用用户对网站的信任发起恶意请求
