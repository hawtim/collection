// https://juejin.im/post/5c8a669a518825766355dac1
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(function () {
    console.log('setTimeout')
}, 0)

async1();

new Promise(function (resolve) {
    console.log('promise1')
    resolve();
}).then(function () {
    console.log('promise2')
})

console.log('script end')

// ==================== Chrome ====================== //

console.log('script start')

console.log('async1 start')

console.log('async2')

console.log('promise1')

console.log('script end')

// console.log('async2')

console.log('async1 end')

console.log('promise2')

console.log('setTimeout')

// ==================== Node ==================== //

console.log('script start')

console.log('async1 start')

console.log('async2')

console.log('promise1')

console.log('script end')

console.log('promise2')

console.log('async1 end')

console.log('setTimeout')

async function f() {
    await p
    console.log(1)
}

// 以上代码旧v8 编译成
new Promise(resolve => {
    resolve(p);
}).then(function () {
    console.log(1)
})

// 新 v8 编译成
function f() {
    Promise.resolve(p).then(() => {
        console.log(1)
    })
}
