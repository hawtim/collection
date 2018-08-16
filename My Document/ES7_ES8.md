## ES7 
在 ES6 基础上添加了三项内容：

1. 求幂运算法符（**）
2. Array.prototype.includes() 方法
3. 函数作用域中严格模式的变更

### Array.prototype.includes()
1. includes 要搜索的值和搜索的开始索引。当第二个参数被传入时，该方法会从索引处开始往后搜索（默认索引值为0）。若搜索值在数组中存在则返回true，否则返回false
2. includes 能判断 NaN 是否在数组中、 +0 和 -0 相同，

### 求幂运算法符

```js
3**2 // 9

let a = 3 
a ** = 3 // 27
```

## ES8

正式引入 async 函数
异步函数存在以下四种使用形式：

1. 函数声明： async function foo() {}
2. 函数表达式： const foo = async function() {}
3. 对象的方式： let obj = { async foo() {} }
4. 箭头函数： const foo = async () => {}

#### 并行处理多个异步结果：

```js
async function asyncFunc() {
  const [result1, result2] = await Promise.all([
    otherAsyncFunc1(),
    otherAsyncFunc2()
  ]);
  console.log(result1, result2);
}
```

## Object.entries() 和 Object.values()

Object.entries() 如果目标对象是具有键值对的数据结构，则每一个键值对都将会编译成一个具有两个元素的数组，这些数组最终会被放到一个数组中，返回一个二维数组
注意点有二：
1. 键值对中，如果键是 Symbol ，处理时将被忽略
2. 如果对象的键是数字，则返回值会对键进行排序，返回的是排序后的结果

Object.values 返回结果和上述注意点2相同

## padStart 和 padEnd
头部填充和尾部填充

### padStart 的应用
1. 为数值补全指定位数
'1'.padStart(10, '0') // '0000000001'
2. 提示字符串格式
'12'.padStart(10, 'YYYY-MM-DD') // 'YYYY-MM-12'


## Object.getOwnPropertyDescriptors()
该方法返回目标对象中所有属性的属性描述符，该属性必须是对象自己定义的，不能从原型链继承来
```js
let obj = {
    id: 1,
    name: 'test',
    get gender() {
        console.log('gender')
    }
    set gender(g) {
        console.log(g)
    }
}

Object.getOwnPropertyDescriptors(obj)
```

该方法返回的描述符，会有两种类型：数据描述符、存取器描述符。
返回结果中包含的键可能的值有： `configurable` 、 `enumerable` 、 `value` 、 `writable` 、 `get` 、 `set` 

使用 Object.getOwnPropertyDescriptors 方法配合 Object.defineProperties 方法，就可以实现正确拷贝一个对象
因为 Object.assign 只能拷贝一个属性的值，不会拷贝它背后的赋值和取值方法

```js
let obj = {
  id: 1,
  name: 'test',
  get gender() {
    console.log('gender')
  }
}
let obj1 = {}
Object.defineProperties(obj1, Object.getOwnPropertyDescriptors(obj))
Object.getOwnPropertyDescriptors(obj1)
```