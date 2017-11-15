var node = [
    {
        child: [{}, {}, {}, {}]
    },
    {
        child: [{}, {}]
    }
]
// 1. 如果arr是这么定义的，得到正确结果
// var arr = [[], []]

// 2. 如果arr是通过fill去变成上面的格式
var arr = []
arr.length = node.length
arr.fill([]) // 不能fill对象，相当于引用赋值，除非是复制取值，不然改变其中一个会改变所有
console.log(arr)

arr.map((elem, idx) => {
    elem.length = node[idx].child.length
    elem.fill(false)
    return elem
})

console.log(arr)
// 1.的输出结果[[false, false, false, false], [false, false]]
// 2.的输出结果[[false, false], [false, false]]
