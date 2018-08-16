ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量
CommonJS 和 AMD 模块，都只能在运行时确定这些东西，比如 CommonJS 模块就是对象，输入时必须查找对象属性

```js
// commonJS 模块
let {stat, exists, readFile} = require('fs')

let _fs = require('fs')
let stat = _fs.stat
let exists = _fs.exists
let readFile = _fs.readFile

```
上面的代码实质是整体加载 fs 模块，生成一个对象，再从这个对象上面读取 3 个方法，这种加载称为运行时加载，只有运行时才能得到这个对象，导致没办法在编译时做“静态优化”

```js
import {stat, exists, readFile} from 'fs'
```
上面代码的实质是从 fs 模块加载 3 个方法，其他方法不加载，称为“编译时加载”或者静态加载
ES6 可以在编译时完成模块加载，效率比 CommonJS 模块的加载方式高
好处有以下几点：
1. 由于 ES6 模块是编译时加载，使得静态分析成为可能，有了它就能进一步拓宽 JavaScript 的语法，比如引入宏和类型检验这些只能靠静态分析实现的功能
2. 不再需要 UMD 模块格式了，将来服务器和浏览器都会支持 ES6 模块格式
3. 将来浏览器的新API就能用模块格式提供，不再必须做成全局变量或者 navigator 对象的属性
4. 不再需要对象作为命名空间，未来这些功能可以通过模块提供

ES6 的模块自动采用严格模式
ES6 模块之中，顶层的 this 指向 undefined，即不应该在顶层代码使用 this

## export 和 import 命令

`export` 命令用于规定模块的 **对外接口**`，import` 命令用于输入其他模块提供的功能
一个模块就是一个独立的文件，该文件内部的所有变量，外部无法获取
如果你希望外部能够读取模块内部的某个变量，就需要用 `export` 关键字输出该变量
通常情况下，export 输出的变量就是本来的名字，但是可以使用 as 关键字重命名

`import` 在静态解析阶段执行，所以它是一个模块之中最早执行的，可能不会得到预期结果。建议不要讲 require 和 import 写在同一个模块里

## 模块的整体加载

`import * as circle from './circle'`

## 跨模块常量

如果想设置跨模块的常量，或者说一个值要被多个模块共享，可以采用下面的写法

```js
// constants.js 模块
export const A = 1
export const B = 3
export const C = 4

// test1.js 模块
import * as constants from './constants'

// test2.js 模块

import {A, B} from './constant'

```

如果要使用的常量非常多，可以建一个专门的 constants 目录，将各种常量写在不同的文件里面

```js
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};

// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
```
然后将这些文件输出的常量，合并在 index.js 里面
```js
export {db} from './db'
export {user} from './users'

```
使用的时候，直接加载 index.js
```js
import {db, users} from './constants/index'
```

## import() 函数

import 命令有利于JavaScript引擎做静态分析，有利于编译器提高效率，但导致无法在运行时加载模块
reqiure 是运行时加载模块，
有个提案
```js
const main = document.querySelector('main')
import(`./section-modules/${someVariable}.js`).then(module => {
    module.loadPageInto(main)
}).catch(err => {
    main.textContent = err.message
})

```
import() 函数可以用在任何地方，不仅仅是模块，非模块脚本也可以使用，它是运行时加载
import() 函数与所加载的模块没有静态连接关系，类似 Node 的 require 方法，区别主要是前者是异步加载，后者是同步加载
适用场景： 
1. 按需加载
2. 条件加载
3. 动态的模块路径

## 传统方法的异步加载

defer 是渲染完再执行，能保证顺序， async 是不能保证加载顺序的

## 浏览器加载 ES6 模块

使用 script 标签，加入 type="module"，等同于 defer

## ES6 模块与 CommonJS 模块的差异

1. commonJS 输出的是一个值的拷贝，ES6 模块输出的是值的引用
2. commonJS 模块是运行时加载，ES6 模块是编译时输出接口

ES6 输入的模块变量， 只是一个符号链接，所以这个变量时只读的，对它进行重新赋值会报错

## CommonJS 模块的加载原理

CommonJS的一个模块，就是一个脚本文件，require命令第一次加载该脚本，就会执行这个脚本，然后在内存生成一个对象

```js
// even.js
import {odd} from './odd'
export var counter = 0
export function even(n) {
    counter++;
    return n === 0 || odd(n - 1)
}

// odd.js 
import {even} from './even'
export function odd(n) {
    return n !== 0 && even(n - 1)
}

```