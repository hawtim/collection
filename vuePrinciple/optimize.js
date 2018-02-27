// 经过 optimize 这层的处理，每个节点会加上 static 属性，用来标记是否是静态的

function isStatic(node) {
    if (node.type === 2) {
        return false
    }
    if (node.type === 3) {
        return true
    }
    return (!node.if && !node.for)
}

function markStatic(node) {
    node.static = isStatic(node)
    if (node.type === 1) {
        for (let i = 0, l = node.children.length; i < l; i++) {
            const child = node.children[i]
            markStatic(child)
            if (!child.static) {
                node.static = false
            }
        }
    }
}

function markStaticRoots() {
    if (node.type === 1) {
        if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
            node.staticRoot = true
            return
        } else {
            node.staticRoot = false
        }
    }
}

function optimize(rootAst) {
    markStatic(rootAst)
    markStaticRoots(rootAst)
}