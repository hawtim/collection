// 测试函数执行时间
function consoleTime(func) {
  console.time('timer')
  func()
  console.timeEnd('timer')
}

// 简单的节流函数
function debounce(func, wait) {
  var timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}

// 数组去重
return [...new Set(this)]
