// 立即执行和非立即执行的结合
function debounce(fn, wait = 500, immediate) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    if (immediate && !timer) {
      fn.apply(this, args)
    }
    timer = setTimeout(() => {
      console.log(this) // 指向 document，或者 dom 节点
      fn.apply(this, args)
    }, wait)
  }
}

// !!! input 输入回调事件添加防抖函数后，只会在停止输入后触发一次
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000, true)
// 停止滑动 1 秒后执行函数 () => console.log('fn 防抖执行了')
document.addEventListener('scroll', betterFn)

// 节流 plus 防抖
const throttle = (fn, wait = 50) => {
  let prev = 0,
    timer = null
  return function(...args) {
    let now = +new Date()
    if (now - prev < wait) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        prev = now
        fn.apply(this, ...args)
      }, wait)
    } else {
      prev = now
      fn.apply(this, ...args)
    }
  }
}

// !!! 监听滚动事件添加节流函数后，每隔固定的一段时间执行一次
const betterFn = throttle(() => console.log('fn 节流执行了'), 1000)
// 第一次触发 scroll 执行一次 fn，每隔 1 秒后执行一次函数 fn，停止滑动 1 秒后再执行函数 fn
document.addEventListener('scroll', betterFn)


// lodash 的实现

_.debounce = function(func, wait, immediate) {
  // timeout 表示定时器
  // result 表示 func 执行返回值
  var timeout, result

  // 定时器计时结束后
  // 1、清空计时器，使之不影响下次连续事件的触发
  // 2、触发执行 func
  var later = function(context, args) {
    timeout = null
    // if (args) 判断是为了过滤立即触发的
    // 关联在于 _.delay 和 restArguments
    if (args) result = func.apply(context, args)
  }

  // 将 debounce 处理结果当作函数返回
  var debounced = restArguments(function(args) {
    if (timeout) clearTimeout(timeout) // undefined

    if (immediate) {
      // 第一次触发后会设置 timeout，
      // 根据 timeout 是否为空可以判断是否是首次触发
      var callNow = !timeout // '!undefined' = true
      // 如果timeout 已经有了，那就执行 setTimeout(function(context, args) { // ...}, wait)
      timeout = setTimeout(later, wait)
      // 如果timeout 是 undefined，就立即执行，并返回结果值 result
      if (callNow) result = func.apply(this, args)
    } else {
      // 其他情况通过延迟执行
      timeout = _.delay(later, wait, this, args)
    }

    return result
  })

  // 新增 手动取消
  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

// 根据给定的毫秒 wait 延迟执行函数 func
_.delay = restArguments(function(func, wait, args) {
  return setTimeout(function() {
    return func.apply(null, args)
  }, wait)
})
