function Person(name, sex) {
    this.sex = sex
    this.name = name
}

function List() {
    this.dataStore = []
    this.append = append
    this.showSameSex = showSameSex
}

function append(data) {
    this.dataStore.push(data)
}

function showSameSex(sex) {
    var same = []
    this.dataStore.forEach(e => {
        if (e.sex == sex) {
            same.push(e.name)
        }
    })
    console.log(same)
}

var list = new List()
list.append(new Person('zhanghaotian', 'male'))
list.append(new Person('shuxiaoruo', 'female'))
list.append(new Person('wumeiqi', 'female'))
list.append(new Person('shushi', 'male'))
list.append(new Person('hawtim', 'male'))
list.append(new Person('shijie', 'male'))
list.showSameSex('female')