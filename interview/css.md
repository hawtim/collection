## css 选择器
id 选择器
类 选择器
标签选择器
相邻选择器
后代选择器
子选择器
通配符选择器
属性选择器
伪类选择器
伪元素

## css3 选择器
first-of-type
last-of-type
nth-child

## 兼容性良好的伪类选择器 
first-child
last-child

## 选择器优先级
!important > inline css > id 100 > class 属性 伪类 10 > 标签/伪元素 1

移动端实现 active 效果，在 body 上添加 ontouchstart 属性

使用小于 10px 字体 webkit-text-size-adjust: 12px;

## 垂直水平居中

flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

table {
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}

绝对定位 加 transform 或者 负 margin

文字垂直水平居中

## 跨域
1. jsonp，通过html标签的src属性可跨域的漏洞，通过get请求返回执行本地定义好的回调函数的代码，
2. CORS，跨域资源共享，Access-control-allow-origin
默认不发送cookie 和 http 认证信息，如果要把cookie 发到服务器，一方面要服务器同意
Access-Control-Allow-Credentials: true
var xhr = new XMLHttpRequest()
xhr.withCredentials = true
3. nodejs 中间件 webpack 中集成
4. postMessage 
5. document.domain


## 什么是 BFC
它是一个独立的渲染区域，只有 block-level-box 参与，它规定了内部 block-level box 如何布局，并且与这个区域外部毫不相关

布局特点
1. 内部box在垂直方向上进行排列
2. box垂直方向的距离由 margin 决定，属于同一个 bfc 的两个相邻box 的 margin 会发生重叠
3. bfc 内部元素的 margin box的左边， 与包含块（父容器）的 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC 不会与float 重叠
5. bfc 是页面上一个隔离的独立容器，容器内的子元素不会影响到外面
6. 计算bfc高度的时候会把浮动元素也计算进去

## 哪些元素会生成 bfc
根元素 html
float 不为 none 
position 为 absolute 或 fixed
display: inline-block; table-cell;flex;
overflow 不是 visible























