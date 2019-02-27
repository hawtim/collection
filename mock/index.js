var Mock = require('mockjs')

var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 100 个元素
    'list|100': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'name': '@cparagraph(1)',
        'options|4': ['@cword(4)'],
        'right|0-3': 0
    }]
})

// 输出结果
console.log(JSON.stringify(data))
