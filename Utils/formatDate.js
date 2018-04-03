function formatDate(millSeconds, format) {
  if (!millSeconds) return ""
  if (typeof millSeconds === "string") {
    millSeconds = parseInt(millSeconds, 10)
  }
  if (!format) {
    format = "yyyy-MM-dd hh:mm"
  }
  const date = new Date(millSeconds)
  var options = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    S: date.getMilliseconds() //millisecond
  }

  if (/(y+)/i.test(format)) {
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  }

  for (var key in options) {
    if (new RegExp("(" + key + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? options[key]
          : ("00" + options[key]).substr(("" + options[key]).length)
      )
    }
  }
  return format
}

//使用方法
var now = new Date()
var nowStr = formatDate(now, "yyyy-MM-dd hh:mm:ss")
//使用方法2:
var testDate = new Date()
var testStr = formatDate(testDate, "YYYY年MM月dd日hh小时mm分ss秒")
alert(testStr)
//示例：
alert(formatDate(new Date(), "yyyy年MM月dd日"))
alert(formatDate(new Date(), "MM/dd/yyyy"))
alert(formatDate(new Date(), "yyyyMMdd"))
alert(formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"))
