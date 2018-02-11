// 栈是一种高效的数据结构，因为数据只能在栈顶添加或删除，所以这样的操作很快。数据只能在栈顶添加或删除
// 栈被称为一种后入先出的数据结构（LIFO），所以任何不在栈顶的元素都无法访问
// 入栈使用push()，出栈使用pop()方法
// 栈的实现

function Stack() {
    this.dataStore = []
    this.top = 0
    this.push = push
    this.pop = pop
    this.peek = peek
    this.length = length
    this.clear = clear
}

function push(element) {
    this.dataStore[this.top++] = element
}

function pop() {
    return this.dataStore[--this.top]
}

function peek() {
    return this.dataStore[this.top - 1]
}

function length() {
    return this.top
}

function clear() {
    this.top = 0
}

// Stack 类测试代码
var s = new Stack()
s.push('David')
s.push('Raymond')
s.push('Bryan')
console.log('length: ' + s.length())
console.log(s.peek())
var popped = s.pop()
console.log('The popped element is: ' + popped)
console.log(s.peek())
s.push('Cynthia')
console.log(s.peek())
s.clear()
console.log('length: ' + s.length())
console.log(s.peek())
s.push('Clayton')
console.log(s.peek())


// 数制间的相互转换，针对基数为 2 ~ 9 的情况

function mulBase(num, base) {
    var s = new Stack()
    do {
        s.push(num % base)
        num = Math.floor(num /= base)
    } while(num > 0)

    var converted = ''
    while (s.length() > 0) {
        converted += s.pop()
    }
    return converted
}

var a = mulBase(32, 2)
console.log(a)

// 回文

function isPalindrome(word) {
    var s = new Stack()
    for (var i = 0; i < word.length; i++) {
        s.push(word[i])
    }
    var rword = ''
    while(s.length() > 0) {
        rword += s.pop()
    }
    if (word == rword) {
        return true
    } else {
        return false
    }
}

// 使用栈模拟递归过程
function fact(n) {
    var s = new Stack()
    while(n > 1) {
        s.push(n--)
    }
    var product = 1
    while (s.length() > 0) {
        product *= s.pop()
    }
    return product
}
// 同理
function factorial(n) {
  if (n === 0) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}