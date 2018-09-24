## HTML
1.以下这些浏览器的内核分别是什么? http://www.cnblogs.com/coco1s/p/4034937.html （3分）

* IE: <u>trident内核</u>
* Firefox：<u>gecko内核</u>
* Safari: <u>webkit内核</u>
* Opera: <u>以前是presto内核，Opera现已改用Google Chrome的Blink内核</u>
* Chrome: <u>Blink(基于webkit，Google与Opera Software共同开发)</u>

2. 前端开发会用到的图片格式有哪些？ http://www.cnblogs.com/coco1s/p/4034937.html （5分）
* png-8
* png-24
* jpeg
* gif
* svg
答对5个及以上均可
但是上面的那些都不是面试官想要的最后答案。面试官希望听到是Webp,Apng。（是否有关注新技术，新鲜事物）
科普一下Webp：WebP格式，谷歌（google）开发的一种旨在加快图片加载速度的图片格式。图片压缩体积大约只有JPEG的2/3，并能节省大量的服务器带宽资源和数据空间。Facebook Ebay等知名网站已经开始测试并使用WebP格式。
在质量相同的情况下，WebP格式图像的体积要比JPEG格式图像小40%。
Apng：全称是“Animated Portable Network Graphics”, 是PNG的位图动画扩展，可以实现png格式的动态图片效果。04年诞生，但一直得不到各大浏览器厂商的支持，直到日前得到 iOS safari 8的支持，有望代替GIF成为下一代动态图标准。

3. 为什么利用多个域名来存储网站资源会更有效？（5分）

* CDN缓存更方便
* 突破浏览器并发限制
* 节约cookie带宽
* 节约主域名的连接数，优化页面响应速度
* 防止不必要的安全问题

## CSS
1. 请分别讲讲display:block | none | inline | inline-block | table 这些值的作用是什么？ （5分）

* block         块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
* none          此元素不会被显示
* inline        行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
* inline-block  默认宽度为内容宽度，可以设置宽高，同行显示。
* table         此元素会作为块级表格来显示。

2. 如何用CSS控制文本单行溢出省略？（3分）

```css
<!-- css实现单行溢出省略是利用 -->

{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
```

3. 使用css的border属性实现一个三角形，三角形的指向任意均可（5分）

更多答案可参考：http://peunzhang.github.io/demo/css_angle/index.html
```css
<!--箭头指向右  -->
.ico-angle {
    display:inline-block;
    width:0;
    height:0;
    overflow:hidden;
    font-size:0;
    border-width:10px;
    border-color:transparent transparent transparent #A5C3FF;
    border-style:dashed dashed dashed solid
}
<!--箭头指向右上  left-top 左下 left-bottom  左上 right-top 右下 right-bottom 右上 -->
.ico-angle {
    display:inline-block;
    width:0;
    height:0;
    overflow:hidden;
    font-size:0;
    border-right:10px solid #A5C3FF;
    border-bottom:10px dashed transparent
}
```
4. CSS实现垂直水平居中（兼容IE9+及其他现代浏览器）（5分）

一道经典的问题，实现方法有很多种，以下是其中一种实现：

```html
<div class="wrapper">
    <div class="content"></div>
</div>
```

```css
.wrapper {
    position:relative;
}
.content {
    background-color:#6699FF;
    width:200px;
    height:200px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top:-100px;
    margin-left: -100px;
}

```

5. 有如下html结构，请书写css代码实现两个段落之间有20px的间距 （5分）

```html
<div class="parent">
    <p>Hello World</p>
    <p>Hello Duoyi</p>
    <p>Hello You</p>
</div>
```

```css
* {
    margin: 0;
    padding: 0;
}
<!--第一种  -->
.parent p + p {
    margin-top: 20px;
}
<!--第二种  -->
.parent p:not(:first-child) {
    margin-top: 20px;
}

<!-- 其他的答案可根据情况分析 -->

```

## JS
1. 如何阻止事件冒泡和默认事件？
```js
function stopBubble(e) {
    e && e.stopPropagation ? e.stopPropagation() : window.event.cancelBubble = true
    return false
}

```

2. 以下两段代码打印出的值是？
```js
var name = 'amy'
var person = {
    name: 'tom',
    getName: () => {
        console.log(this.name)
    }
}

person.getName() // undefined
```

```js
var name = 'amy'
var person = {
    name: 'tom',
    getName() {
        console.log(this.name)
    }
}
person.getName() // tom
```

3. 如何实现以下函数？
* add(2, 5)
* add(2)(5)

```js
function add(x, y) {
    return x + y
}

function add(x) {
    return function (y) {
        return x + y
    }
}
```

4. 如何对一个对象进行深度clone？

```js
function cloneObject(o) {
  if(!o || 'object' !== typeof o) {
      return o
  }
  var c = 'function' === typeof o.pop ? [] : {}
  var p, v
  for(p in o) {
      if(o.hasOwnProperty(p)) {
          v = o[p]
          if(v && 'object' === typeof v) {
              c[p] = Ext.ux.clone(v)
          }
          else {
              c[p] = v
          }
      }
  }
  return c
}
```
5. 以下这段代码的输出结果是？
> http://mp.weixin.qq.com/s/3-8kH1L-FZqSgv8zocoY7g
```js
console.log('main1')

setTimeout(function() {
    console.log('setTimeout')
}, 100);

new Promise(function(resolve, reject) {
    console.log('promise')
    resolve();
}).then(function() {
    console.log('promise then')
    setTimeout(function() {
        console.log('setTimeoutThen')
    }, 0);
});

console.log('main2')

// 答案

main1
promise
main2
promise then
setTimeoutThen
setTimeout

```

另可参考：
1. https://github.com/h5bp/Front-end-Developer-Interview-Questions/tree/master/Translations/Chinese 前端工作面试问题
2. https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Question 前端开发面试题 （题目列表页）
3. http://web.jobbole.com/88041/ 整理总结的一些前端面试题
4. http://www.admin10000.com/document/9203.html 44个 Javascript 变态题解析
5. http://www.cnblogs.com/coco1s/p/4034937.html