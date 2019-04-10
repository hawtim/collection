var date = new Date();

var day = date.getDate()
var month = date.getMonth() + 1
var year = date.getFullYear()
var hour = date.getHours()
var minute = date.getMinutes()
var second = date.getSeconds()

function combine(a, b, c) {
    return a + '' + b + '' + c
}

var ymd = combine(year, month, day)
var hms = combine(hour, minute, second)

