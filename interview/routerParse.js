// 请设计一种数据结构用于存储 URL 和处理理函数名字的映射关系，并实现一个查询函数，通过
// 输入 HTTP Method 和 URL ，返回对应的处理理函数的名字

// 函数原型
// findHandler(method: string, url: string): string;

// Get http://www.xxx.com/weibos -> queryWeibo
// Post http://www.xxx.com/weibos -> addWeibo
// Delete http://www.xxx.com/weibos -> deleteWeibo
// Update http://www.xxx.com/weibos -> updateWeibo
// Get http://www.xxx.com/comments -> queryComment
// Post http://www.xxx.com/comments -> addComment
// Delete http://www.xxx.com/comments -> deleteComment
// Update http://www.xxx.com/comments -> updateComment

// 用一个对象来存储方法和名字
const methodKey = {
    'GET': 'query',
    'POST': 'add',
    'DELETE': 'delete',
    'UPDATE': 'update'
}

function findMethodKey(method) {
    return methodKey[method.toUpperCase()]
}

function firstLetterUpperCase(string) {
    return string.charAt(0).toUpperCase()+ string.slice(1)
}

// 解析 url 工具函数
function parseURL(url) {
    let parser = document.createElement('a')
    let searchObj = {}
    let queries
    let key
    let value
    parser.href = url
    queries = parser.search.replace(/^\?/, '').split('&')
    queries.forEach(query => {
        key = query.split('=')[0]
        value = query.split('=')[1]
        searchObj[key] = value
    })
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        searchObj: searchObj,
        hash: parser.hash
    }
}
// 指定的函数原型
function findHandler(method, url) {
    let methodValue = findMethodKey(method)
    let {pathname} = parseURL(url)
    let moduleNameRE = /[a-zA-Z][a-zA-Z0-9_]*/g
    let result = pathname.match(moduleNameRE)
    let moduleName = result[0].slice(0, result[0].length - 1)
    console.log(`${methodValue}${firstLetterUpperCase(moduleName)}`)
    return `${methodValue}${firstLetterUpperCase(moduleName)}`

}
// 测试代码
findHandler('GET', 'http://www.xxx.com/weibos')
findHandler('Post', 'http://www.xxx.com/weibos')
findHandler('delete', 'http://www.xxx.com/weibos')
findHandler('Update', 'http://www.xxx.com/weibos')