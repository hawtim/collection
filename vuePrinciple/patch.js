import { create } from "domain";
import { start } from "repl";

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
