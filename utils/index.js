// 测试函数执行时间
function test(func){

 var start = new Date().getTime();//起始时间

 func();//执行待测函数

 var end = new Date().getTime();//接受时间

 return (end - start)+"ms";//返回函数执行需要时间

}

// 简单的节流函数
function debounce (func, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait)
    }
}

// 数组去重
return [...new Set(this)];
