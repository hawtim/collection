// js执行机制，浏览器环境和node环境输出结果有差别，node下process.nextTick() 的优先级比 promise 高，
console.log('1')

setTimeout(function() {
  console.log('2')
  process.nextTick(function() {
    console.log('3')
  })
  new Promise(function(resolve) {
    console.log('4')
    resolve()
  }).then(function() {
    console.log('5')
  })
})
process.nextTick(function() {
  console.log('6')
})
new Promise(function(resolve) {
  console.log('7')
  resolve()
}).then(function() {
  console.log('8')
})

setTimeout(function() {
  console.log('9')
  process.nextTick(function() {
    console.log('10')
  })
  new Promise(function(resolve) {
    console.log('11')
    resolve()
  }).then(function() {
    console.log('12')
  })
})
