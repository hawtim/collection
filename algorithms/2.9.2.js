function showWords(words) {
    this.originWords = words
    this.order = order
    this.reverse = reverse
}

function order() {
    console.log(this.originWords.sort())
}

function reverse() {
    console.log(this.originWords.reverse())
}

var show = new showWords(['a', 'c', 'b', 'e'])
show.order()
show.reverse()
