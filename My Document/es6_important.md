TDZ 暂时性死区的本质就是，只要已进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量
为什么需要块级作用域
1. 内层变量可能会覆盖外层变量
2. 用来计数的循环变量泄露为全局变量
3. 块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式不再必要了
声明变量的六种方法
1. var 和 function es5 
2. let 和 const es6
3. import 和 class es6
获取顶层对象的方法

```js
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```

typeof 不安全的点在哪？
1. 未声明的变量使用 typeof 是 undefined，但是使用let声明的变量，由于存在暂时性死区，typeof 会报错

使用解构赋值
只要某种数据结构具有 iterator 接口，都可以采用数组形式的解构赋值

```js
function* fibs() {
    let a = 0 
    let b = 1
    while(true) {
        yield a
        [a, b] = [b, a + b]
    }
}

let [first, second, third, fourth, fifth, sixth] = fibs()
```

对象的解构赋值
数组的元素是按次序排列的，而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
```js
let {foo: baz} = {foo: 'aaa', bar: 'bbb'}
// foo 是匹配的模式，baz 才是变量
```

