var request = require('request')
var fs = require('fs')

// http://www.jianshu.com/p/a156729ce499 nodejs 之 request 模块 17000 的 star

/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/
function downloadFile(uri, filename, callback) {
  var stream = fs.createWriteStream(filename)
//   TODO 这里应该是可以添加请求参数或者 cookies
  request(uri)
    .pipe(stream)
    .on('close', callback)
}

var fileUrl =
  'http://jidi.oa.com/upload/catch/video/compress/4aquan/2017-10-17/8c75301ee205f9d115fc0036672baf9f.mp4'
var filename = './Headless Chrome/test.mp4'
downloadFile(fileUrl, filename, function() {
  console.log(filename + '下载完毕')
})
