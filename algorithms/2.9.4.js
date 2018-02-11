function characterContainer() {
    this.container = []
    this.addCharacter = addCharacter
    this.showWord = showWord
}

function addCharacter(character) {
    this.container.push(character)
}

function showWord() {
    var result = ''
    this.container.forEach((e) => {
        result += e
    })
    console.log(result)
}

var container = new characterContainer()

container.addCharacter('a')
container.addCharacter('b')
container.addCharacter('c')
container.addCharacter('d')

container.showWord()