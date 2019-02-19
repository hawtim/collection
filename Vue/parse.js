var html = `<div :class="c" class="demo" v-if="isShow">
    <span v-for="item in sz">{{item}}</span>
</div>`;

// parse
var AST = {
    /* 标签属性的map，记录了标签上属性 */
    'attrsMap': {
        ':class': 'c',
        'class': 'demo',
        'v-if': 'isShow'
    },
    /* 解析得到的:class */
    'classBinding': 'c',
    /* 标签属性v-if */
    'if': 'isShow',
    /* v-if的条件 */
    // TODO 这里要确认下
    'ifConditions': [
        'exp': 'isShow'
    ],
    /* 标签属性class */
    'staticClass': 'demo',
    /* 标签的tag */
    'tag': 'div',
    /* 子标签数组 */
    'children': [
        {
            'attrsMap': {
                'v-for': "item in sz"
            },
            /* for循环的参数 */
            'alias': "item",
            /* for循环的对象 */
            'for': 'sz',
            /* for循环是否已经被处理的标记位 */
            'forProcessed': true,
            'tag': 'span',
            'children': [
                {
                    /* 表达式，_s是一个转字符串的函数 */
                    'expression': '_s(item)',
                    'text': '{{item}}'
                }
            ]
        }
    ]
}

// 正则

const ncname = '[a-zA-Z_][\\w\\-\\.]*';
const singleAttrIdentifier = /([^\s"'<>/=]+)/
const singleAttrAssign = /(?:=)/
const singleAttrValues = [
    // 双引号的属性
    /"([^"]*)"+/.source,
    // 单引号的属性
    /'([^']*)'+/.source,
    // 这个没看懂
    /([^\s"'=<>`]+)/.source
]
const attribute = new RegExp(
    '^\\s*' + singleAttrIdentifier.source +
    '(?:\\s*(' + singleAttrAssign.source + ')' +
    '\\s*(?:' + singleAttrValues.join('|') + '))?'
)

const qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
const startTagOpen = new RegExp('^<' + qnameCapture)
const startTagClose = /^\s*(\/?)>/

const endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')

const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g

const forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/


// Stack 栈

// 我们需要维护一个 stack 栈来保存已经解析好的标签头，这样我们可以根据在解析尾部标签的时候得到所属层级关系以及父标签。
// 同时我们定义一个 currentParent 变量用来存放当前标签的父标签节点的引用，root 变量用来指向根标签节点

const stack = []
let currentParent, root

// advance

// 因为我们解析 template 采用循环进行字符串匹配的方式，
// 所以每匹配解析完一段我们需要将已经匹配掉的去掉，头部指针指向接下来需要匹配的部分

var index = 0

function advance(n) {
    index += n
    html = html.substring(n)
}

// parseHTML
// 循环解析 template 字符串，用正则在匹配到标签头，标签尾以及文本的时候分别进行不同的处理，直到整个template 被解析完毕

function parseHTML() {
    while(html) {
        let textEnd = html.indexOf('<')
        if (textEnd === 0) {
            if (html.match(endTag)) {
                // 我们在 parseHTML 中加入了针对尾标签的解析函数，为了匹配如 "</div>"
                const endTagMatch = html.match(endTag)
                if (endTagMatch) {
                    advance(endTagMatch[0].length)
                    parseEndTag(endTagMatch[1])
                    continue
                }
            }
            if (html.match(startTagOpen)) {
                const startTagMatch = parseStartTag()
                // 将 startTagMatch 得到的结果首先封装成 element，这个就是最终形成的AST的节点，标签节点的 type 为 1
                const element = {
                    type: 1,
                    tag: startTagMatch.tagName,
                    attrsList: startTagMatch.attrs,
                    attrsMap: makeAttrsMap(startTagMatch.attrs),
                    parent: currentParent,
                    children: []
                }
                // processIf 与 processFor
                // 只需要在解析头标签的内容中加入这两个表达式的解析函数即可，
                // 在这里（v-for） 之类指令已经在属性解析时存入 attrsMap 中

                processIf(element)
                processFor(element)

                // 然后让root 指向根节点的引用
                if (!root) {
                    root = element
                }
                // 将当前节点的 element 放入父节点 currentParent 的 children 数组中
                if (currentParent) {
                    currentParent.children.push(element)
                }
                // 最后将当前节点 element 压入 statck 栈中，并将 currentParent 指向当前节点
                stack.push(element)
                currentParent = element

                continue
            }
        } else {
            text = html.substring(0, textEnd)
            advance(textEnd)
            let expression
            if (expression = parseText(text)) {
                currentParent.children.push({
                    type: 2,
                    text,
                    expression
                })
            } else {
                currentParent.children.push({
                    type: 3,
                    text
                })
            }
            continue
        }
    }
}

// 将 attrs 转换成 map 格式的一个方法
function makeAttrsMap(attrs) {
    const map = {}
    for (let i = 0, l = attrs.length; i < l; i++) {
        map[attrs[i].name] = attrs[i].value;
    }
    return map
}

// 用来从 el 的 attrsMap 属性或是 attrsList 属性中取出 name 对应值

function getAndRemoveAttr(el, name) {
    let val
    if ((val = el.attrsMap[name] != null)) {
        const list = el.attrsList
        for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].name === name) {
                list.splice(i, 1)
                break
            }
        }
    }
    return val
}

function processFor(el) {
    let exp
    if ((exp = getAndRemoveAttr(el, 'v-for'))) {
        const inMatch = exp.match(forAliasRE)
        el.for = inMatch[2].trim()
        el.alias = inMatch[1].trim()
    }
}

function processIf(el) {
    const exp = getAndRemoveAttr(el, 'v-if')
    if (exp) {
        el.if = exp
        if (!el.ifConditions) {
            el.ifConditions = []
        }
        el.ifConditions.push({
            exp: exp,
            block: el
        })
    }
}
// 我们来写一个 parseStartTag 函数，用来解析起始标签（"<div :class="c" class="demo" v-if="isShow">"部分的内容）

function parseStartTag() {
    // 首先用 startTagOpen 正则得到标签的头部，可以得到 tagName 同时我们需要一个数组 attrs 用来存放标签内的属性
    const start = html.match(startTagOpen)
    if (start) {
        const match = {
            tagName: start[1],
            attrs: [],
            start: index
        }
        advance(start[0].length)

        let end, attr
        // 接下来使用 startTagClose 与 attribute 两个正则分别用来解析标签结束以及标签内的属性，
        // 用 while 一直循环到匹配到 startTagClose 为止，解析内部所有属性
        while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            advance(attr[0].length)
            match.attrs.push({
                name: attr[1],
                value: attr[3]
            })
        }
        if (end) {
            match.unarySlash = end[1]
            advance(end[0].length)
            match.end = index
            return match
        }
    }
}

// 解析尾标签，会从栈中取出最近的跟自己标签名一致的那个元素，将 currentParent 指向那个元素，
// 并将该元素之前的元素都从 stack 中出栈
function parseEndTag() {
    let pos
    // 从栈顶开始取出（先进先出）
    for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCaseTag === tagName.toLowerCase()) {
            break
        }
    }

    if (pos >= 0) {
        stack.length = pos // 出栈
        currentParent = stack[pos] // 将 currentParent 指向那个元素
    }
}

function parseText(text) {
    if (!defaultTagRE.test(text)) return
    // 我们使用一个 tokens 数组来存放解析结果，通过defaultTagRE 来循环匹配该文本，如果是普通文本直接 push 到 tokens 数组中去，如果是表达式（{{item}}），则转化成 “_s(${exp})”
    const tokens = []
    let lastIndex = defaultTagRE.lastIndex = 0
    let match, index
    while((match = defaultTagRE.exec(text))) {
        index = match.index
        if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }
        const exp = match[1].trim()
        tokens.push(`_s(${exp}`)
        lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return tokens.join('+')
}





