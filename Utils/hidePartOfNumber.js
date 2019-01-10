// 偏移值
function hidePartOfNumber(str, offset, symbol) {
    var splitStr = str.split('')
    var length = splitStr.length
    var replaceLength = Math.floor(2 * offset)
    if (length == 1 || length < replaceLength) return
    var startIndex = Math.floor((length - 1) / 2) - offset
    var replaceTemp = []
    replaceTemp.length = replaceLength
    replaceTemp.fill(symbol)
    splitStr.splice(startIndex, replaceLength, ...replaceTemp)
    return splitStr.join('')
}

