// 之前讲到，在对 model 进行操作的时候，会触发对应 Dep 中的 Watcher 对象，
// Watcher对象会调用对应的 update 来修改视图，最终是将新产生的 VNode 和 OldVNode 进行一个 patch 的过程
// 比对得出差异，最终将差异更新到视图上

// 适配层，用于确保不同平台有同样的接口

const nodeOps = {
    setTextContent(text) {
        if (platform === 'weex') {
            node.parentNode.setAttr('value', text)
        } else if (platform === 'web') {
            node.textContent = text
        }
    },
    parentNode() {
        // ...
    },
    removeChild() {
        // ...
    },
    nextSibling() {
        // ...
    },
    insertBefore() {
        // ...
    },
    createElement() {
        // ...
    },
    createTextNode() {
        // ...
    }
}

// 介绍一些 api，会在 patch 的过程中被用到，他们最终都会调用 nodeOps 中的相应函数来操作平台

function insert(parent, elm, ref) {
    if (parent) {
        // 如果指定了 ref 则插入到 ref 这个子节点前面
        if (ref) {
            if (ref.parentNode === parent) {
                nodeOps.insertBefore(parent, elm, ref)
            }
        } else {
            nodeOps.appendChild(parent, elm)
        }
    }
}

// 新建一个节点，tag 存在创建一个标签节点，否则创建一个文本节点

function createElm(vnode, parentElm, refElm) {
    if (vnode.tag) {
        insert(parentElm, nodeOps.createElement(vnode.tag), refElm)
    } else {
        insert(parentElm, nodeOps.createTextNode(vnode.text), refElm)
    }
}

// 用于批量调用 createElm 新建节点

function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], parentElm, refElm)
    }
}

// 移除一个节点

function removeNode(el) {
    const parent = nodeOps.parentNode(el)
    if (parent) {
        nodeOps.removeChild(parent, el)
    }
}
// 批量调用 removeNode 节点
// 所有的节点都有索引，然后传入开始索引和结束索引来删除对应的节点

function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx < endIdx; ++startIdx) {
        const ch = vnodes[startIdx]
        if (ch) {
            removeNode(ch.elm)
        }
    }
}

// 核心 diff 算法

// diff 算法通过同层的树节点进行比较而非对树进行逐层搜索遍历的方式，时间复杂度只有 O(n)

function patch(oldVnode, vnode, parentElm) {
    // 如果 oldVnode 不存在，相当于新的 Vnode 替代原本没有的节点，直接 addVnodes 批量添加到 parentElm 上即可
    if (!oldVnode) {
        addVnodes(parentElm, null, vnode, 0, vnode.length - 1)
    } else if (!vnode) {
        // 如果新 Vnode 不存在，相当于删除老的节点，直接使用 removeVnodes 进行批量的节点删除即可
        removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1)
    } else {
        // 新老 vnode 都存在的情况下，需要判断是否属于相同节点，如果是则进行 patchVnode 操作，
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode)
        } else {
            // 否则删除老节点，增加新节点
            removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1)
            addVnodes(parentElm, null, vnode, 0, vnode.length - 1)
        }
    }
}

// 只有当 key、tag、isComment、data 同时定义（或不定义），同时满足当标签类型为 input 的时候 type 相同。（需要理解）
function sameVnode(a, b) {
    return (
        a.key === b.key &&
        a.tag === b.tag && 
        a.isComment === b.isComment && 
        (!!a.data) === (!!b.data) && 
        sameInputType(a, b))
}

function sameInputType(a, b) {
    // 某些浏览器不支持动态修改 input 标签，所以它们被视为不同类型
    if (a.tag !== 'input') return true
    let i
    const typeA = (i = a.data) && (i = i.attrs) && i.type
    const typeB = (i = b.data) && (i = i.attrs) && i.type
    return typeA === typeB
}

function patchVnode(oldVnode, vnode) {
    // 新老 VNode 节点相同的情况下，直接 return
    if (oldVnode === vnode) {
        return
    }
    // 新老节点都是静态的，并且 key 相同时，只要将 componentInstance 与 elm 从老 VNode 节点拿过来即可
    // isStatic 就是编译时候编译出来的静态节点，用于跳过比对过程
    if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
        vnode.elm = oldVnode.elm
        vnode.componentInstance = oldVnode.componentInstance
        return
    }
    const elm = vnode.elm = oldVnode.elm
    const oldCh = oldVnode.children
    const ch = vnode.children
    // 当新VNode节点是文本节点时，直接用 setTextContent 来设置text
    if (vnode.text) {
        nodeOps.setTextContent(elm, vnode.text)
    } else {
        // 当新VNode节点是非文本节点时，需要分几种情况
        // oldCh 和 ch 都存在且不相同时，使用updateChildren 函数来更新子节点
        if (oldCh && ch && (oldCh !== ch)) {
            updateChildren(elm, oldCh, ch)
        } else if (ch) {
            // 如果只有 ch 存在，如果老节点是文本节点则先将节点的文本清除，然后将 ch 批量插入到节点 elm 下
            if (oldVnode.text) nodeOps.setTextContent(elm, '')
            addVnodes(elm, null, ch, 0, ch.length - 1)
        } else if (oldCh) {
            // 只有 oldCh 存在，说明需要将 老节点通过 removeVnodes 全部清除
            removeVnodes(elm, oldCh, 0, oldCh.length - 1)
        } else if (oldVnode.text) {
            // 当只有老节点且为文本节点时,清除其节点文本内容
            nodeOps.setTextContent(elm, '')
        }
    }
}

function updateChildren(parentElm, oldCh, newCh) {
    // 我们定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 是新老两个 VNode 两边的索引，同时 oldStartVnode、newStartVnode、oldEndVnode 以及 newEndVnode 分别指向这几个索引对应的 VNode 节点
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, elmToMove, refElmy
    // while 循环过程中，oldStartiIdx、newStartIdx、oldEndIdx 以及 newEndIdx 会逐渐向中间靠拢

    while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // 首先当 oldStartVnode 或者 oldEndVnode 不存在的时候，oldStartIdx 与 oldEndIdx 继续向中间靠拢，并更新对应oldStartVnode 与 oldEndVnode 的指向
        if (!oldStartVnode) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (!oldEndVnode) {
            oldEndVnode = oldCh[--oldEndIdx]
            // 接下来是 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 两两比对的过程
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            // 交叉情况，将 oldStartVnode.elm 直接移动到 oldEndVnode.elm 这个节点的后面即可
            // 然后 oldStartIdx 向后移动一位，newEndIdx 向前移动一位
            patchVnode(oldStartVnode, newEndVnode)
            nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
            // 将 oldEndVnode.elm 插入到 oldStartVnode.elm
            // oldEndIdx 向前移动一位，newStartIdx 向后移动一位
            patchVnode(oldEndVnode, newStartVnode)
            nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
            // 最后是当以上情况都不符合的时候
            // 处理逻辑如下
        } else {
            let elmToMove = oldCh[idxInOld]
            // createKeyToOldIdx 作用是产生 key 与 index 索引对应的一个 map 表
            if (!oldKeyToIdx) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
            // 我们可以根据某一个key的值，快速地从 oldKeyToIdx 中获取相同key的节点的索引 idxInOld，然后找到相同的节点
            idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null
            if (!idxInOld) {
                // 如果没有找到相同的节点，通过 createElm 创建一个新节点，并将 newStartIdx 向后移动一位
                createElm(newStartVnode, parentElm)
                newStartVnode = newCh[++newStartIdx]
            } else {
                // 否则如果找到老/新（待求证）节点，同时它符合 sameVnode，则将这两个节点进行 patchVnode。
                // 将该位置的老节点赋值 undefined 
                // 同时将 newStartVnode.elm 插入到 oldStartVnode.elm 的前面，newStartIdx 向后移动一位
                elmToMove = oldCh[idxInOld]
                if (sameVnode(elmToMove, newStartVnode)) {
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[idxInOld] = undefined
                    nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
                    newStartVnode = newCh[++newStartIdx]
                } else {
                    // 如果不符合 sameVnode 只能创建一个新节点插入到 parentElm 的子节点中，newStartIdx 向后移动一位
                    createElm(newStartVnode, parentElm)
                    newStartVnode = newCh[++newStartIdx]
                }
            }
        }
    }
    // 当 while 循环结束后，如果 oldStartIdx > oldEndIdx 说明老节点比对完了，但是新节点还有多的，需要将新节点插入到真实的DOM中去，调用 addVnodes 将这些节点插入即可
    if (oldStartIdx > oldEndIdx) {
        refElm = (newCh[newEndIdx + 1]) ? newCh[newEndIdx + 1].elm : null
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx)
        // 如果满足 newStartIdx > newEndIdx，说明新节点对比完了，老节点还有很多，将这些无用的老节点通过 removeVnodes 批量删除即可
    } else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
    let i, key
    const map = {}
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key
        if (isDef(key)) map[key] = i
    }
    return map
}

















