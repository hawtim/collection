// 队列的两种操作是向队列中插入新元素或删除队列中的元素。
// 插入操作叫入队，删除操作叫出队
// 读取队头的元素，这个操作叫peek，该操作返回队头元素，但不把它从队列中删除

// 队列是一种列表，不同的是只能在队尾插入元素，是一种先进先出（FIFO）的数据结构

// 实现 queue 类
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

function toString() {
    var retStr = ''
    for(var i = 0; i < this.dataStore.length; i++) {
        retStr += this.dataStore[i] + '\n'
    }
    return retStr
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

var q = new Queue()
q.enqueue('xxxxx')
q.enqueue('yyyy')
q.enqueue('zzzzz')
console.log(q.toString())
q.dequeue()
console.log(q.toString())

// 方块舞的舞伴分配问题

function Dancer(name, sex) {
    this.name = name
    this.sex = sex
}

function getDancers(males, females) {
    var names = `F Allison McMillan
    M Frank Opitz
    M Mason McMillan
    M Clayton Ruff
    F Cheryl Ferenback
    M Raymond Williams
    F Jennifer Ingram
    M Bryan Frazer
    M David Durr
    M Danny Martin
    F Aurora Adney`.split('\n')
    console.log('names', names)
    for (var i = 0; i < names.length; i++) {
        var dancer = names[i].trim().split(' ')
        var sex = dancer[0]
        var name = dancer[1]
        if (sex == 'F') {
            females.enqueue(new Dancer(name, sex))
        } else {
            males.enqueue(new Dancer(name, sex))
        }
    }
}

function dance(males, females) {
    console.log('the dance partners are: \n')
    var person
    while(!females.empty() && !males.empty()) {
        person = females.dequeue()
        console.log('female dancer is: ' + person.name)
        person = males.dequeue()
        console.log('and the male dancer is: ' + person.name)
    }
}

var maleDancers = new Queue()
var femaleDancers = new Queue()
getDancers(maleDancers, femaleDancers)
dance(maleDancers, femaleDancers)

if (femaleDancers.count() > 0) {
    console.log('There are ' + femaleDancers.count() + ' female dancers waiting to dance.')
}

if (maleDancers.count() > 0) {
    console.log('There are ' + maleDancers.count() + ' male dancers waiting to dance.')
}

if (!femaleDancers.empty()) {
    console.log(femaleDancers.front().name + ' is waiting to dance.')
}

if (!maleDancers.empty()) {
    console.log(maleDancers.front().name + ' is waiting to dance')
}


// 5.4 使用队列对数据进行排序
// 基数排序： 对于0-99 的数字，基数排序将数据集扫描两次，第一次按个位上的数字进行排序，第二次按十位上的数字进行排序。

// 根据相应位（个位或十位）上的数值，将数字分配到相应队列的函数
// nums 数组, queues 队列， n 存放的箱子数量，digit 基数
function distribute(nums, queues, n, digit) {
    for (var i = 0; i < n; ++i) {
        if (digit == 1) {
            queues[nums[i]%10].enqueue(nums[i])
        } else {
            queues[Math.floor(nums[i] / 10)].enqueue(nums[i])
        }
    }
}

function collect(queues, nums) {
    var i = 0;
    for (var digit = 0; digit < 10; ++digit) {
        while(!queues[digit].empty()) {
            nums[i++] = queues[digit].dequeue()
        }
    }
}

// 展示数组的内容
function dispArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i] + ' ')
    }
}

var queues = []
for (var i = 0; i < 10; ++i) {
    queues[i] = new Queue()
}
var nums = []
for (var i = 0; i < 10; ++i) {
    // 一个长度为 10 的随机数数组
    nums[i] = Math.floor(Math.floor(Math.random() * 101))
}

console.log('Before radix sort: ')
dispArray(nums)
distribute(nums, queues, 10, 1)
collect(queues, nums)
distribute(nums, queues, 10, 10)
collect(queues, nums)
console.log('\n\nAfter radix sort')
dispArray(nums)


