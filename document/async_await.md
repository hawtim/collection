## 学习 async 和 await

`async` 是 `generator` 函数的语法糖，用于声明一个异步函数，表示该函数不会阻塞后边代码的执行，此函数会返回一个 `promise` 对象，
在 `async` 声明的函数里面使用 `await` 关键字，可以等待一个 `promise` 对象 `resolve` ，并拿到结果进行处理。
必须等待内部所有异步操作都执行完，才会发生状态改变，即才会执行 `then` 回调函数
更多的在 `await` 后面放一个 `promise` 对象的表达式， `await` 只能用在有 `async` 声明的异步函数里

## async 函数的改进在于下面四点
- 内置执行器，`generator` 函数的执行必须依靠执行器`testGenerator.next()` ，`async` 自带执行器，调用方式和普通函数一致
- 更好的语意，想比 `yield` 和 `*`
- 更广的适用性， `yield` 命令后面只能是 `trunk` 或者 `promise` 对象，而 `async` 函数的 `await` 命令后面则是可以是 `promise` 或者原始类型值，但此时等同于同步操作
- 返回值是 `promise` ，比 `generator` 函数返回的 `iterator` 对象方便，可以直接使用 `then` 方法进行调用


## 例子
```js
async function timeoout() {
    return 'hello world'
}

timeout().then(result => {
    console.log(result);
})
console.log('我先执行')
```

`async` 函数内部 `return` 的值会成为 `then` 方法回调函数的参数
控制台输出 '我先执行'，然后才输出 'hello world'


```js
function doubleAfter2Second(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2 * num)
        }, 2000)
    })
}

async function testResult() {
    let first = await doubleAfter2Second(30)
    let second = await doubleAfter2Second(30)
    let third = await doubleAfter2Second(30)
    console.log(first + second + third) // 6s 输出 180
}

testResult()
```

这样异步函数写起来就跟同步函数一样了，没有回调地狱，非常简洁

再来一个例子。
比如我们说手机充值，我们通过手机号获取用户所在的省和市，再获取可充值的数值，最后才可以进行充值

```js
// 在 Vue 项目中定义 methods

methods: {
    getLocation(phoneNum) {
        return axios.post('/phoneLocation', {
            phoneNum
        })
    },
    getValueList(province, city){
        return axios.post('/valueList', {
            province, city
        })
    },
    // 回调写法
    getValueResult() {
        this.getLocation(this.phoneNum).then(res => {
            if (res) {
                let province = res.data.obj.province
                let city = res.data.obj.city
                this.getValueList(province, city).then(res => {
                    if (res) {
                        this.valueList = res.data.data
                    }
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    // async/await 写法
    async getValueResult() {
        // tips: 要捕获 async 函数中的错误，在async 函数中使用 try/catch
        try {
            let location = await this.getLocation(this.phoneNum)
            if (location.data.success) {
                let province = location.data.obj.province
                let city = location.data.obj.city
                let result = await this.getValueList(province, city)
                if (result.data.success) {
                    this.valueList = result.data.obj
                }
            }
        } catch(err) {
            console.log(err)
        }
    }
}
```



## 如何在项目中使用
通过 `babel，` 设置 `presets` 为 `stage-3` 即可
` npm instal babel-preset-es2015 babel-preset-stage-3 babel-runtime babel-plugin-transform-runtime`
修改`.babelrc`

```json
"presets": ["es2015", "stage-3"],
"plugins": ["transform-runtime"]
```