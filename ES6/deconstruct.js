// 数组解构赋值
var value = [1, 2, 3, 4, 5]
var [el1, el2, el3] = value
console.log(el1, el2, el3)


var value = [1, 2, [3, 4, 5]]
var [el1, el2, [el3, el4]] = value
console.log(el1, el2, el3, el4)

// 指定参数默认值
var [firstName = 'John', lastName = 'Doe'] = []
// 需要注意的是默认值只会在对undefined值起作用，下面的例子中firstName和lastName都将是null：
var [firstName = "John", lastName = "Doe"] = [null, null];

// 对象解构赋值
var person = { firstName: 'John', lastName: 'Doe' }
// var { firstName, lastName } = person

// console.log(firstName, lastName)

var {firstName: name, lastName} = person
console.log(name, lastName)

var person = { dateOfBirth: [1, 1, 1980] }
var { dateOfBirth: [day, month, year] } = person
console.log(day, month, year)

var {firstName: fn = "hawtim" , lastName: ln = "zhang"} = {}
console.log(fn, ln)

var { firstName = 'John', lastName = 'Doe' } = {
  firstName: null,
  lastName: null
}
console.log(firstName, lastName)

var person = [{ dateOfBirth: [1, 1, 1980] }]
var [{ dateOfBirth }] = person
console.log(dateOfBirth)

// 函数参数的解构赋值
function findUser(userId, options) {
//   if (options.includeProfile) {...}
//   if (options.includeHistory) {...}
}

function findUser(userId, {includeProfile, includeHistory}) {
//   if (includeProfile) {...}
//   if (includeHistory) {...}
}

// https://segmentfault.com/a/1190000002920859