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
    路径： 对于指定域中的那个路径，应该向服务器发送 cookie，例如你可以指定 cookie 只有从 http://www.wrox.com/books/ 中才能访问
    失效时间： 表示 cookie 何时应该被删除的时间戳，默认情况下会话结束时浏览器会删除所有 cookie，不过也可以自己设置删除时间，这个值是个 GMT 格式的日期（Wdy, DD-Mon-YYYY HH:MM:SS GMT） 用于指定应该删除 cookie  的准确时间
    安全标志：指定后，cookie 只有在使用 SSL 连接时才发送到服务器，例如只能发送到 https://www.wrox.com 而 http://www.wrox.com 的请求则不能发送 cookie
`

var newCookieDemo = `
    HTTP/1.1 200 OK
    Content-type: text/html
    Set-Cookie： name=value;expires=Mond, 22-Jan-07 07:10:24 GMT; domain=.wrox.com;path=/; secure
`
// 注意： secure 标志是 cookie 中唯一一个非名值对儿的部分，直接是一个单词
// 另外，域，路径，失效时间和 secure 标志都是服务器给浏览器的指示，以指定何时应该发送 cookie，这些参数并不会作为发送到服务器的 cookie 信息的一部分


// JavaScript 中的 cookie

// document.cookie 返回当前页面可用的所有 cookie 的字符串

// 所有名字和值都是经过URL编码的，所以必须使用 decodeURIComponent() 来编码

// 当用于设置值得时候，document.cookie 属性可以设置为一个新的 cookie 字符串，这个字符串会被解释并添加到现有 cookie 集合中，设置cookie 除非 cookie 名称已经存在，否则不会覆盖。

var setCookieDemo = `
    name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure
`

// 主 cookie
var CookieUtil = {
    get: function(name) {
        var cookieName = encodeURIComponent(name) + '=',
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart)
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
        }
        return cookieValue
    },
    set: function(name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
        if (expires instanceof Date) {
            cookieText += '; expires=' + expires.toGMTString()
        }

        if (path) {
            cookieText += '; path=' + path
        }

        if (domain) {
            cookieText += '; domain=' + domain
        }

        if (secure) {
            cookieText += '; secure'
        }

        document.cookie = cookieText
    },
    unset: function(name, path, domain, secure) {
        this.set(name, '', new Date(0), path, domain, secure)
        // 没有删除已有cookie 的直接方法，所以需要使用相同的路径、域和安全选项再次设置 cookie 并将失效时间设置为过去的时间
    }
}

// 子cookie(实际中的使用很少，了解即可)

// 子cookie 是存放在单个cookie 中的更小段的数据
// 为了更好的操作子cookie，必须建立一系列新方法
var subCookieDemo = `name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5`
var SubCookieUtil = {
    get: function(name, subName) {
        var subCookies = this.getAll(name)
        if (subCookies) {
            return subCookies[subName]
        } else {
            return null
        }
    },
    getAll: function(name) {
        var cookieName = encodeURIComponent(name) + '=',
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd,
            subCookies,
            i,
            parts,
            result = {}
        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(';', cookieStart)
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length
            }
            cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
            if (cookieValue.length > 0) {
                subCookies = cookieValue.split('&')
                for(i = 0, len=subCookies.length; i < len; i++) {
                    parts = subCookies[i].split('=')
                    result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
                }
                return result
            }
        }
        return null
    }
}

// 关于 cookie，cookie 信息越大，完成对服务器请求的时间也越长，尽可能在cookie中少存信息，以免影响性能



