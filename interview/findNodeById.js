let tree = {
    id: '1',
    label: 'fisrt',
    children: [{
            id: '2',
            label: 'second'
        },
        {
            id: '3',
            label: 'third',
            children: [{
                    id: '4',
                    label: 'fourth'
                },
                {
                    id: '5',
                    label: 'fifth',
                    children: [{
                        id: 6,
                        label: 'sixth'
                    }]
                }
            ]
        }
    ]
};


// // 1. 因为 id 唯一，将所有节点提取并保留引用关系放到临时对象中
// var obj = {
    //    1 : {
    //     id: 1,
    //     label: 'fisrt',
    //     children: [/*...*/]
    // }
// }
// let tempTreeObject = {}
// function getChildrenNode(node) {
//     tempTreeObject[node.id] = node
//     if (node.children && node.children.length) {
//         node.children.forEach(childNode => {
//             return getChildrenNode(childNode)
//         })
//     }
//     return tempTreeObject
// }

// function findNodeById(root, id) {
//     if (root.id === id) return root
//     return getChildrenNode(root)[id]
// }

// findNodeById(tree, 1)
// findNodeById(tree, 2)
// findNodeById(tree, 3)
// findNodeById(tree, 4)
// findNodeById(tree, 5)


// 2. 直接在树中查找
function filterNode(nodes, id) {
    return nodes.filter(node => {
        return node.id == id
    })
}

function findChildNodeById(nodes, id) {
    if (!id) throw new Error('未传入参数 id')
    if (nodes && nodes.length) {
        let result = filterNode(nodes, id)
        if (result && result.length) return result
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].children) {
                return findChildNodeById(nodes[i].children, id)
            }
        }
    }
}

function findNodeById(root, id) {
    if (root.id == id) return root
    return findChildNodeById(root.children, id)
}
var result = findNodeById(tree, 2)
console.log(result)
var result = findNodeById(tree, 5)
console.log(result)
var result = findNodeById(tree, 6)
console.log(result)