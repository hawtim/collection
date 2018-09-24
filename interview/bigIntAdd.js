function add(a, b) {
    var addFlag,
        str1,
        str2,
        na,
        nb,
        Maxlen = [],
        Minlen = [],
        result = []
    addFlag = 0
    str1 = a.split('')
    str2 = b.split('')
    // str1 ['1', '2', '3']
    na = str1.length
    nb = str2.length
    // 保证 Maxlen 总是指向长度最长的那个
    if (na >= nb) {
        Maxlen = str1
        Minlen = str2
    } else {
        Maxlen = str2
        Minlen = str1
    }
    for (var i = Maxlen.length - 1; i >= 0; i--) {
        // 从最后一位加到最前面位，Minlen 是固定值， i 越来越小
        if (Minlen.length > i) {
            console.log(Maxlen[i], Minlen[i], addFlag)
            temp = parseInt(Maxlen[i]) + parseInt(Minlen[i]) + addFlag
        } else {
            console.log(Maxlen[i], Minlen[i], addFlag)
            // 如果长度较短的数组的所有位被加完了，那么就只剩下较长数组自身与进位间的累加
            temp = parseInt(Maxlen[i]) + addFlag
        }
        if (temp > 9) {
            result[i] = temp - 10
            // 最高位若有进位，需在最高位的下一位加1
            if (i == (Maxlen.length - 1)) {
                result[Maxlen.length] = 1
            }
            addFlag = 1
        } else {
            result.push(temp)
            addFlag = 0
        }
    }
    console.log(result)
    return result.reverse().join('')
}

var c = add("92395", "5556789");
console.log(c);