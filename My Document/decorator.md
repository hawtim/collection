## 装饰器

装饰器是一个特殊类型的声明，可以附加到类声明，方法、参数或者属性上，装饰器由一个@符号紧接一个函数名称，形如 @expression expression 求值后必须是一个函数，在函数执行的时候装饰器的声明方法会被立即执行，装饰器是用来给附着的主体进行装饰，添加额外行为的一种方式

ES6 引入了关于装饰器的提案，但是目前大多数浏览器中以及 node 环境中都不支持装饰器修饰

```js
@testDecorator
class ClassA {
}

function testDecorator(target) {
    target.addParam = 'One decorator'
}

console.log(ClassA.addParam)
```

在配置好环境之后，使用 `babel-node` 命令来编译代码，即可输出

修饰器对类的行为的改变是在代码编译时发生的，不是在运行时，所以修饰器的本质就是编译时执行的函数

