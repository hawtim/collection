// 实现链式调用， 每次调用后既要保留自身的引用，又要返回操作结果
var obj = {
    count: 0,
    add(num) {
        this.count += num
        return this
    },
    valueOf() {
        return this.count
    }
}
var c = obj.add(1).add(2).add(3) // 返回 object
console.log(c.count)

// 链式加法及实现
function add (num) {
    var count = num;
    var _b = function(l){
        count += l;
        return _b
    }
    // _b是Function，是Object的一种特殊形式，当我们做类似打印console等操作时，会自动调用其valueOf方法
    _b.valueOf = function(){
        return count
    }
    return _b
}
var c = add(1)(2)(3);
console.log(c)    //6