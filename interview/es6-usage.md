
## 你用了哪些 ES6 语法

* 声明变量
```js
{
	let x = 1
}
console.log(x) // 无法获取x这个变量，let是声明块级局部变量

const y = 12
y = 13 // 报错，因为const是声明常量，无法修改
```
通过var定义的变量，作用域是整个封闭函数，是全域的。通过let定义的变量，作用域是在块级或是子块中。


* 对象键值简写
```js
var x = 1
var y = {
	x
}
```

// 对象键值同名可以简写
* 模块引入与导出
// 引入Vue模块
```js
import Vue from 'vue'
export default {
	a:1
}
```
// 以后用import引入这个文件拿到这个导出对象
* 解构
```js
function test({a}, x){
	console.log(a)
}
let obj = {a:1, b:2}
test(obj)
```

// 通过大括号里面加一个a，就可以把obj里面的a给拿出来，所以打印1
* 模板字符串
```js
let str = "world!"
`hello ${str}`
```

// 不用单引号，用`符号，可以把变量写进字符串里面解析
* 箭头函数
```js
var fn = (x, y) => {
	console.log(x, y, this)
}
fn(1, 2)
```
箭头函数的特点就是定义箭头函数的时候，他的上下文决定了箭头函数里面this的值， 比如这个例子箭头函数上下文this是window，所以箭头函数里面this也是window


* promise