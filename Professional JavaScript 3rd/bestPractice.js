// 1. 可维护性
// 雇佣 JavaScript 开发人员为公司创造价值，而他们并非仅仅按时交付产品，同时还要开发智力成果在之后不断地增加价值
// 可理解性——其他人可以接手代码并理解它的意图和一般途径，无需原开发人员的完整解释
// 直观性——代码中的东西一看就能明白
// 可适应性——代码以一种数据上的变化不要求完全重写的方法撰写
// 可扩展性——代码在架构上已考虑到未来允许对核心功能进行扩展
// 可调试性——代码出错时，有足够的信息来确定问题所在

// 一般这些地方需要注释
var comment = `
    函数和方法
    大段代码
    复杂的算法
    hack
`

var named = `
    变量名为名词
    函数名以动词开始，返回布尔值一般以 is 开头
    变量和函数都应使用合乎逻辑的名字，不要担心长度，长度问题可以通过后处理和压缩
`

var variateType = `
    var found = false
    var count = -1
    var name = ''
    var person = null
`
// 松散耦合

// 尊重对象所有权

// 不要为实例或原型添加属性、方法，或重新定义已存在的方法

// 注意作用域
// 避免全局查找
// 避免使用with 语句，会创建自己的作用域，会增加其中执行的代码的作用域链的长度


// 在计算机科学中，算法的复杂度是使用 O 符号来表示的

// 常见的算法类型


// 避免不必要的属性查找
// O(1)  常数 不管有多少值，执行的时间都是恒定的，一般表示简单值和存储在变量中的值
// O(log n) 对数 总的执行时间和值得数量相关，但要完成算法并不一定要获取每个值，例如：二分查找
// O(n) 线性 总执行时间和值的数量直接相关，例如，遍历某个数组中的所有元素
// O(n^2) 平方 总执行时间和值得数量有关，每个值至少要获取 n 次，例如插入排序

// 优化循环
// 使用减值迭代
// 简化终止条件
// 简化循环体
// 使用后测试循环 for 和 while 都是前测试循环，do-while 是后测试循环，避免最初终止条件的计算

// 普通循环
for(var i = 0; i < values.length; i++) {
    process[values[i]]
}
// 使用减值迭代
for(var i = values.length - 1; i >= 0; i --) {
    process(values[i])
}
// 后测试循环
var i = values.length - 1
if (i > -1) {
    do {
        process(values[i])
    } while ( --i >= 0)
}
// 展开循环（Tom Duff）
var iterations = Math.ceil(values.length / 8)
var startAt = values.length % 8
var i = 0
do {
    switch(startAt) {
        case 0: process(values[i++])
        case 7: process(values[i++])
        case 6: process(values[i++])
        case 5: process(values[i++])
        case 4: process(values[i++])
        case 3: process(values[i++])
        case 2: process(values[i++])
        case 1: process(values[i++])
    }
    startAt = 0
} while (--iterations > 0)

// 如果数组中有10个值，startAt 等于 2，最开始的时候 process 则只会被调用 2 次，在接下来的循环中，startAt 被重置为 0
// 这样之后的每次循环都会调用 8次 process()，可以提升处理大数据集的处理速度

// 更快的Duff （ Andrew B. King）快 40%
//credit: Speed Up Your Site (New Riders, 2003)
var iterations = Math.floor(values.length / 8)
var leftover = values.length % 8
var i = 0
if (leftover > 0) {
    do {
        process(values[i++])
    } while (--leftover > 0)
}
do {
    process(values[i++])
    process(values[i++])
    process(values[i++])
    process(values[i++])
    process(values[i++])
    process(values[i++])
    process(values[i++])
    process(values[i++])
} while (--iterations > 0)

// 其他注意事项

// 1. 原生方法较快 原生方法是用诸如 C/C++之类的编译型语言写出来的
// 2. Swithc 语句较快 还可以通过将 case 语句按照最可能的到最不可能的顺序进行组织，来进一步优化 switch 语句。
// 3. 位运算符较快 诸如取模，逻辑与和逻辑或都可以考虑用位运算来替换。

// 最小化现场更新

var list = document.getElementById('myList'),
    fragment = document.createDocumentFragment()
    item,
    i;
for (i = 0; i < 10; i++) {
    item = document.createElement('li')
    fragment.appendChild(item)
    item.appendChild(document.createTextNode('Item' + i))
}

list.appendChild(fragment)

//  使用 innerHTML

// 当把 innerHTML 设置为某个值时，后台会创建一个 HTML 解析器，然后使用内部的 DOM 调用来创建 DOM 结构，而非基于 JavaScript 的 DOM调用。由于内部方法是编译好的而非解释执行的，所以执行快得多

// 使用事件代理

// 任何可以冒泡的事件都不仅仅可以在事件目标上进行处理，目标的任何祖先节点上也能处理。使用这个知识，就可以将事件处理程序附加到更高层的地方负责多个目标的事件处理