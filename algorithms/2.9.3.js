// 不知道题目具体要表达的意思，现有的实现和题目不符，因为不知道要构造的数据结构是怎样的
// 按照自己的理解来，思路大致
function monthlyTemps() {
  this.dataStore = []
  this.add = add
  this.monthAverage = monthAverage
}
function add(temp) {
  this.dataStore.push(temp)
}

// 某个月的平均数
function monthAverage(month) {
    var data = this.dataStore[month - 1]
    var average
    var total
    for(var i = 0; i < data.length; i++) {
        total += data[i]
    }
    average = total / data.length
    console.log(average)
}

function weekAverage() {}

function AllAverage() {}


var thisMonth = new monthlyTemps()

thisMonth.add([52, 49, 60, 54])
thisMonth.add([55, 49, 60, 54, 67])
thisMonth.add([61, 49, 54, 67])
thisMonth.add([65, 49, 60, 54, 67])
thisMonth.add([55, 60, 54, 67])
thisMonth.add([50, 49, 67])
thisMonth.add([52, 49, 54])
thisMonth.add([49, 60, 54, 67])


print(thisWeek.average()) // 显示 54.875
