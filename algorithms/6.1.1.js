// 除了对数据的随机访问，链表几乎可以用在任何可以使用一维数组的情况中
// 如果需要随机访问，数组仍是更好的选择

// 链表是由一组节点组成的集合，每个节点都使用一个对象的引用指向它的后继，指向另一个节点的引用叫做链

// 数组元素靠他们的位置进行引用，链表元素则是靠相互之间的关系进行引用

function Node(element) {
    this.element = element
    this.next = null
}

function LList() {
    this.head = new Node('head')
    this.find = find
    this.insert = insert
    this.display = display
    this.findPrevious = findPrevious
    this.remove = remove

}

function find(item) {
    var currNode = this.head
    while (!(currNode.next == null) && currNode.element != item) {
        currNode = currNode.next
    }
    return currNode
}

// 插入新节点
function insert(newElement, item) {
    var newNode = new Node(newElement)
    var current = this.find(item)
    newNode.next = current.next
    current.next = newNode
}

function display() {
    var currNode = this.head
    while (!(currNode.next == null)) {
        currNode = currNode.next
    }
}

// var cities = new LList()
// cities.insert('conway', 'head')
// cities.insert("Russellville", "Conway");
// cities.insert("Alma", "Russellville");
// cities.display()

// 从链表中删除一个节点，先找到待删除节点前面的节点
// 修改它的next属性，使其不再指向待删除节点，而是指向待删除节点的下一个节点
function findPrevious(item) {
    var currNode = this.head
    while (!(currNode.next == null) && (currNode.next.element != item)) {
        currNode = currNode.next 
    }
    return currNode
}

function remove(item) {
    var prevNode = this.findPrevious(item)
    if (!(prevNode.next == null)) {
        prevNode.next = prevNode.next.next
    }
}

var cities = new LList()
cities.insert('conway', 'head')
cities.insert('Russellville', 'conway')
cities.insert('Carlisle', 'Russellville')
cities.insert("Alma", "Carlisle");
cities.display();
cities.remove("Carlisle");
cities.display();