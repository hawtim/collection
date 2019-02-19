class VNode {
    constructor (tag, data, children, text, elm) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        this.elm = elm
    }
}

function createEmptyVNode() {
    const node = new VNode()
    node.text = ''
    return node
}

function createTextVNode(val) {
    return new VNode(undefined, undefined, undefined, String(val))
}

function cloneVNode(node) {
    const cloneVNode = new VNode(node.tag, node.data, node.children, node.text, node.elm)
    // return cloneVNode
}

let vnode = new VNode('div', {
        /* 指令集合数组 */
        directives: [
            {
                /* v-show指令 */
                rawName: 'v-show',
                expression: 'isShow',
                name: 'show',
                value: true
            }
        ],
        /* 静态class */
        staticClass: 'demo'
    },
    [
        /* 子节点是一个文本VNode节点 */
        {
            tag: undefined,
            data: undefined,
            text: 'This is a span.',
            children: undefined
        },
    ]
)

createTextVNode('this is text')

cloneVNode(vnode)