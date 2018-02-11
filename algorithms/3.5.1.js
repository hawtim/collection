function List() {
  this.dataStore = []
  this.append = append
  this.superAppend = superAppend
  this.lowerAppend = lowerAppend
  this.getChar = getChar
  this.isLarger = isLarger
  this.isLower = isLower
}

function append(element) {
  this.dataStore.push(element)
}

function superAppend(element) {
  if (this.isLarger(element)) {
    this.dataStore.push(element)
    console.log(this.dataStore)
  }
}

function lowerAppend(element) {
  if (this.isLower(element)) {
    this.dataStore.push(element)
    console.log(this.dataStore)
  }
}

function getChar(char) {
  return char.toString().charCodeAt()
}

function isLarger(char) {
  if (!this.dataStore.length) return true
  for (var i = 0; i < this.dataStore.length; i++) {
    if (isNaN(char) && this.getChar(char) < this.getChar(this.dataStore[i])) {
      return false
    } else if (char < this.dataStore[i]) {
      return false
    } else {
      return true
    }
  }
}

function isLower(char) {
  if (!this.dataStore.length) return true
  for (var i = 0; i < this.dataStore.length; i++) {
    if (isNaN(char) && this.getChar(char) > this.getChar(this.dataStore[i])) {
      return false
    } else if (char > this.dataStore[i]) {
      return false
    } else {
      return true
    }
  }
}

var list = new List()
list.superAppend(11)
list.superAppend(10)
list.superAppend(12)
list.superAppend('a')
