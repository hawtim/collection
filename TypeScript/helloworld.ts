// 多态与继承

class Hello {
  firstName: string
  lastName: string
  age: Number
  constructor(fiestName: string, lastName: string) {
    this.firstName = fiestName
    this.lastName = lastName
  }
  greeter() {
    return 'hello! 欢迎来到typescript的世界，' + this.firstName + ' ' + this.lastName
  }
}

var user = new Hello('zhang', 'hawtim')

document.body.innerHTML = user.greeter()
