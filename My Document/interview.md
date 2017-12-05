1. 请阅读以下代码，分别写出输出的结果

```js
var a = [{ title: 'test', id: 100 }, { title: 'test1', id: 101 }]
var b = Object.assign([], a)
console.log(b.splice(0, 1))
console.log(b.slice(0, 1))
var c = b.push({ title: 'test2', id: 102 })
console.log(c)
```

正确答案 :

```js
[{ isFolder: true, title: 'test', id: 100 }]
[{ isFolder: true, title: 'test1', id: 101 }]
2
```

2. 请阅读以下代码，写出执行过程

```js
setTimeout(function() {
  console.log('定时器开始啦')
})

new Promise(function(resolve) {
  console.log('马上执行for循环啦')
  for (var i = 0; i < 10000; i++) {
    i == 99 && resolve()
  }
}).then(function() {
  console.log('执行then函数啦')
})

console.log('代码执行结束')
```

马上执行 for 循环啦

代码执行结束

执行 then 函数啦

undefined

定时器开始啦

3. querySelector 和 querySelectAll 有什么区别？

前者获得的是匹配到的第一个节点，是一个 dom 节点后者匹配到的是所有满足对应选择器
的节点组成的一个 nodeList

4. 转换类数组数据为数组的方法？

```js
Array.prototype.call.slice(arguments)
[].slice(arguments)
[...arguments]
```

5. 有如下结构，请补充对应的样式实现一行文字水平居中，两行文字向左对齐

```html
<div class="p">
	<p class="cl"><span>文字文字文字</span></p>
	<p class="cl"><span>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</span></p>
</div>
```

```css
.p {
  width: 200px;
  /* （假设200px能容纳15个中文） */
}
/* 请补充样式 */
p.cl {
  text-align: center;
}
.cl span {
  display: inline-block;
  text-align: left;
}
```
