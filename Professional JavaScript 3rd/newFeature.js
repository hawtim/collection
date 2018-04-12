// 获取用户位置
navigator.geolocation.getCurrentPosition(
    function(position) {
        console.log(position.coords.latitude, position.coords.longitude)
    },
    function(error) {
        console.log("无法获得当前用户的地理位置")
        console.log("Error code: " + error.code)
        console.log("Error message: " + error.message)
    },
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 25000
    }
)

// 跟踪用户的位置
var watchId = navigator.geolocation.watchPosition(
    function(position) {
        drawMapCenteredAt(position.coords.latitude, positions.coords.longitude)
    },
    function(error) {
        console.log("Error code: " + error.code)
        console.log("Error message: " + error.message)
    }
)
clearWatch(watchId)

// 要了解使用地理定位的更多精彩范例，请访问 http://html5demos.com/geo

// File API

// 每个 File 对象对应着一个文件。每个 File 对象都有下列只读属性。
// name ：本地文件系统中的文件名。
// size ：文件的字节大小。
// type ：字符串，文件的 MIME 类型。
// lastModifiedDate ：字符串，文件上一次被修改的时间（只有 Chrome 实现了这个属性）。

var filesList = document.getElementById('files-list')
EventUtil.addHandler(filesList, 'change', function(event) {
    var files = EventUtil.getTarget(event).files,
        i = 0,
        len = files.length
    while (i < len) {
        console.log(files[i].name + ' (' + files[i].type + ', ' + files[i].size + ' bytes) ')
        i ++
    }
})

// FileReader 类型

// FileReader 类型实现的是一种异步文件读取机制，可以把FileReader 想象成 XMLHttpRequest, 区别只是它读取的是文件系统，而不是远程服务器
// 可以读取图像文件并将其保存为数据 URI，以便将其显示给用户，或者为了解析方便，可以将文件读取为文本形式
// 其中最有用的三个事件是progress 、 error 和 load ，分别表示是否又读取了新数据、是否发生了错误以及是否已经读完了整个文件
// 每过 50ms 左右，就会触发一次 progress 事件
// 触发 error 事件时，相关的信息将保存到 FileReader 的 error 属性中。这个属性中将保存一个对象，该对象只有一个属性 code ，即错误码。这个错误码是 1 表示未找到文件，是 2 表示安全性错误，是 3 表示读取中断，是 4 表示文件不可读，是 5 表示编码错误

var filesList = document.getElementById('files-list')
EventUtil.addHandler(filesList, 'change', function (event) {
    var info = '',
    output = document.getElementById('output'),
    progress = document.getElementById('progress'),
    files = EventUtil.getTarget(event).files,
    type = 'default',
    reader = new FileReader()

    if (/image/.test(files[0].type)) {
        reader.readAsDataURL(files[0])
        type = 'image'
    } else {
        reader.readAsText(files[0])
        type = 'text'
    }

    reader.onerror = function() {
        output.innerHTML = 'Could not read file, error code is ' + reader.error.code
    }

    reader.onprogress = function(event) {
        if (event.lengthComputable) {
            progress.innerHTML = event.loaded + '/' + event.total
        }
    }

    reader.onload = function() {
        var html = ''
        switch(type) {
            case 'image':
                html = '<img src=\"' + reader.result + '\">'
                break
            case 'text':
                html = reader.result
                break
        }
        output.innerHTML = html
    }

})

// 如果想中断读取过程，可以调用 abort() 方法，这样就会触发 abort 事件。在触发 load 、 error 或 abort 事件后，会触发另一个事件 loadend 。 loadend 事件发生就意味着已经读取完整个文件，或者读取时发生了错误，或者读取过程被中断。

// 读取部分内容

function blobSlice(blob, startByte, length) {
    if (blob.slice) {
        return blob.slice(startByte, length)
    } else if (blob.webkitSlice) {
        return blob.webkitSlice(startByte, length)
    } else if (blob.mozSlice) {
        return blob.mozSlice(startByte, length)
    } else {
        return null
    }
}