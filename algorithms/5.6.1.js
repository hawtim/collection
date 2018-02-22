// 双向队列
function Deque() {
    this.dataStore = []
    this.enqueue = enqueue
    this.dequeue = dequeue
    this.front = front
    this.back = back
    this.toString = toString
    this.empty = empty
    this.count = count
}

function enqueue(element, position) {
    if (position === 'last') {
        this.dataStore.push(element)
    } else {
        this.dataStore.unshift(element)
    }
}

function dequeue(element, position) {
    if (position === 'last') {
        this.dataStore.splice(this.dataStore.length - 1, 1)
    } else {
        this.dataStore.shift(element)
    }
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
        retStr += this.dataStore[i]
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

// cacac
function isPalindrome(word) {
    var deque = new Deque()
    var splitWords = word.split('')
    for (var i = splitWords.length - 1; i >= 0; i--) {
        deque.enqueue(splitWords[i], 'last')
    }
    if (deque.toString() == word) {
        console.log('word is palindrome')
        return true
    } else {
        console.log('word is not palindrome')
        return false
    }
}

isPalindrome('cacad')