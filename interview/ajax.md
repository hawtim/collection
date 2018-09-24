## 实现原生实现一个ajax, ajax的优缺点

Ajax的工作原理相当于在用户和服务器之间加了一个中间层(AJAX引擎), 使用户操作与服务器响应异步化

优点 {
    无刷新更新数据。改善用户体验
    减少带宽的使用并增加速度，通过和服务器少量的数据交互进行网页局部更新
    将一些计算转移到客户端，减轻浏览器负担
    支持异步处理，不会阻塞浏览器线程
    数据和呈现分离，有利于分工合作、减少一些bug
    兼容性较好，虽然实现方式不一样，但是从 ie5 支持到所有现代浏览器
}

缺点 {
    ajax 不支持浏览器的前进后退和 history 功能
    ajax 会面临数据暴露的问题， 以及跨站攻击、 sql注入
}

原生实现

1. 创建 XMLHttpRequest 对象、
2. 连接服务器、
3. 发送请求、
4. 接收响应数据

```js
function ajax(options = {}) {
    const {
        dataType = 'json', data
    } = options
    const type = (options.type || 'GET').toUpperCase()
    console.log(type, dataType)
    const params = formatParams(data)
    let xhr
    // 非IE6
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    if (type === 'GET') {
        xhr.open(type, `${options.url}?${params}`, true)
        xhr.send(null)
    }
    if (type === 'POST') {
        xhr.open(type, options.url, true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(params)
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            const status = xhr.status
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status)
            }
        }
    }
}

function formatParams(data) {
    var arr = []
    for (var name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
    }
    arr.push("v=" + new Date().getTime())
    return arr.join("&");
}

ajax({
    url: "./TestXHR.aspx", //请求地址
    type: "get", //请求方式
    data: {
        name: "super",
        age: 20
    }, //请求参数
    dataType: "json",
    success: function (response, xml) {
        // 此处放成功后执行的代码
    },
    fail: function (status) {
        // 此处放失败后执行的代码
    }
});
```