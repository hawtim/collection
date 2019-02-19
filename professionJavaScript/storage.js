// Storage 类型

// 使用方法而不是属性来访问数据，避免意外重写

// sessionStorage 对象，也就是该数据只能保持到浏览器关闭，可跨越页面刷新存在，sessionStorage 是 Storage 的实例

var testCode = `
    sessionStorage instanceof Storage
    // true
`
// 不同浏览器写入方式有点不同，firefox 和 webkit 实现了同步写入，添加到存储空间中的数据是立刻被提交的


// localStorage 对象

// 在修订过的 HTML5 规范中作为持久保存客户端数据的方案取代了 globalStorage

// 对于 localStorage 而言，大多数桌面浏览器会设置每个来源 5MB 的限制。Chrome 和 Safari 对每
// 个来源的限制是 2.5MB。而 iOS 版 Safari 和 Android 版 WebKit 的限制也是 2.5MB。

// 对 sessionStorage 的限制也是因浏览器而异。有的浏览器对 sessionStorage 的大小没有限制，
// 但 Chrome、Safari、iOS 版 Safari 和 Android 版 WebKit 都有限制，也都是 2.5MB。IE8+和 Opera 对
// sessionStorage 的限制是 5MB。


// IndexedDB (当做了解一下，实际上用 mysql 或者 moogoose)
// 在浏览器中保存结构化数据的一种数据库，在得到完整支持的情况下，IndexedDB 将是一个作为 API 宿主的全局对象，由于 API 仍然可能有变化，浏览器也都使用供应商前缀

var indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexDB

var request, database

if (database.version != '1.0') {
    request = database.setVersion('1.0')
    request.onerror = function(event) {
        console.log('Something bad happened while trying to set version: ' + event.target.errorCode)
    }
    request.onsuccess = function(event) {
        console.log('Database initialization complete. Database name: ' + database.name + ', Version: ' + database.version)
    }
} else {
    console.log('Database already initialized. Database name: ' + database.name + ', Version: ' + database.version)
}

request = indexedDB.open('admin')
request.onerror = function(event) {
    console.log('Something bad happened while trying to open: ' + event.target.errorCode)
}
request.onsuccess = function(event) {
    database = event.target.result
}
// event.target 指向 request 对象

var user = {
    username: '007',
    firstName: 'james',
    lastName: 'bond',
    password: 'foo'
}

var store = db.createObjectStore('users', {keyPath: 'username'})