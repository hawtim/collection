if (navigator.onLine) {

} else {
    // 执行离线状态时的任务
}

window.addEventListener('online', function(event) {
    console.log('online')
})

window.addEventListener('offline', function(event) {
    console.log('offline')
})

// 数据存储

// cookie，通常叫做 cookie 该标准要求服务器对任意 HTTP 请求发送 Set-Cookie HTTP 头作为响应的一部分，其中包含会话信息

var responseHeader = `
    HTTP/1.1 200 OK
    Content-type: text/html
    Set-Cookie: name=value
    Other-header: other-header-value
`
// 发送回服务器的额外信息可以用于唯一验证客户来自于发送的哪个请求
var sendHeader = `
    GET /index.html HTTP/1.1
    Cookie: name=value
    Other-header: other-header-value
`
// cookie 在性质上是绑定在特定的域名下的，当设定了一个 cookie 后，再给创建它的域名发送请求时，都会包含这个 cookie
// 不同浏览器每个域的 cookie 总数是有限的
// 最好将整个 cookie 长度限制在 4095B 以内，尺寸限制影响到一个域下所有 cookie，而并非每个 cookie 单独限制

// cookie 的构成
var whatCookieContains = `
    名称： 一个唯一确定的 cookie 名称，不区分大小写，必须经过 URL 编码
    值： 存储在 cookie 中的字符串，值必须被 URL 编码
    域： cookie 对于哪个域是有效的
    路径： 对于指定域中的那个路径，应该向服务器发送 cookie

`
