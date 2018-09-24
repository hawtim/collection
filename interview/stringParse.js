// example Map<string, Array<bool>>

// after parse
// {
//     type: 'Map',
//     typeArgs: [{
//             type: 'string'
//         },
//         {
//             type: 'Array',
//             typeArgs: [{
//                 type: 'bool'
//             }]
//         }
//     ]
// };

// 实现有问题

var string = 'Map<string, Array<bool>, Yss<xms>, hawtim>'
var baseExp = /([a-zA-Z]+)(<(([a-zA-Z]+)(<([a-z]+)>))*?,*)*?/g

console.log(string.match(baseExp))

function parseString(string) {
    var count = 0
    var tree = {
        type: '',
        typeArgs: []
    }
    var tempNode = {
        type: '',
        typeArgs: []
    }
    var currentNode = {}
    var arr = string.match(baseExp)
    // "Map", "string", "Array", "bool", "Yss", "xms", "hawtim"
    var length = arr.length
    for (let i = 0; i < length; i++) {
        count = i
        var arr = baseExp.exec(string)
        if (!count) {
            tree.type = arr[0]
        } else {
            if (arr[0][0].match(/[A-Z]/) && !tempNode.type) { // 判断类型是否首字母大写，是为 type 否则为 typeArgs
                tempNode.type = arr[0]
            } else if (arr[0][0].match(/[A-Z]/) && tempNode.type) {
                // 把前面的构造好的 tempNode 存放到 最终树的 typeArgs 上
                tree.typeArgs.push(tempNode)
                tempNode = {
                    type: '',
                    typeArgs: []
                }
                tempNode.type = arr[0]
            } else if (arr[0][0].match(/[a-z]/) && tempNode.type) {
                tempNode && tempNode.typeArgs.push({
                    type: arr[0]
                })
            } else if (arr[0][0].match(/[a-z]/) && !tempNode.type) {
                tempNode.type = arr[0]
                tree.typeArgs.push(tempNode)
                tempNode = {
                    type: '',
                    typeArgs: []
                }
            }
            if (count == length - 1) {
                tree.typeArgs.push(tempNode)
            }
        }
    }
    console.log(tree)
    return tree
}

parseString(string)