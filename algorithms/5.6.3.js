function Queue() {
    this.dataStore = []
    this.enqueue = enqueue
    this.dequeue = dequeue
    this.front = front
    this.back = back
    this.toString = toString
    this.empty = empty
    this.count = count
}

function enqueue(element) {
    this.dataStore.push(element)
} 

function dequeue() {
    return this.dataStore.shift()
}

function front() {
    return this.dataStore[0]
}

function back() {
    return this.dataStore[this.dataStore.length - 1]
}

function empty() {
    if (this.dataStore.length == 0) {
        return true
    } else {
        return false
    }
}

function count() {
    return this.dataStore.length 
}

// 优先队列

// 在一般情况下，从队列中删除的元素，一定是率先入队的元素。但是也有一些使用队列的应用，在删除元素时不必遵守先进先出的约定。这种应用，需要使用一个叫做优先队列的数据结构来进行模拟

// 定义存储队列元素的对象

function Patient(name, code) {
    this.name = name
    this.code = code // 表示患者的优先级或病情严重程度
}

// 重新定义 dequeue 方法

function dequeue() {
    var priority = this.dataStore[0].code
    for (var i = 1; i < this.dataStore.length; i++) {
        // code 最大的优先级最高
        if (this.dataStore[i].code >= priority) {
            priority = i
        }
    }
    return this.dataStore.splice(priority, 1) 
    // 这种写法会出现后进来的同样优先级的人变得更优先。
    // 应该有这样的逻辑，如果是同一优先级，先进来的那个病人更加优先才是
}

function toString() {
    var retStr = ''
    for (var i = 0; i < this.dataStore.length; ++i) {
        retStr += this.dataStore[i].name + ' code: ' + this.dataStore[i].code + '\n'
    }
    return retStr
}

var patient = new Patient('smith', 5)
var patientQueue = new Queue()
patientQueue.enqueue(patient)
console.log('Patient enter the waiting room')
patient = new Patient('Jones', 4)
patientQueue.enqueue(patient)
patient = new Patient("Fehrenbach", 6)
patientQueue.enqueue(patient)
patient = new Patient("Brown", 7)
patientQueue.enqueue(patient)
patient = new Patient("Ingram", 8)
patientQueue.enqueue(patient)
console.log(patientQueue.toString())
var seen = patientQueue.dequeue()
console.log("Patient being treated: " + seen[0].name)
console.log('Patient waiting to be seen: ')
console.log(patientQueue.toString())
var seen = patientQueue.dequeue()
console.log("Patient being treated: " + seen[0].name)
console.log('Patient waiting to be seen: ')
console.log(patientQueue.toString())
