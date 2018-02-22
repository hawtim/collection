function Node(element) {
    this.element = element
    this.next = null
    this.previous = null
}

function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.remove = remove;
    this.findLast = findLast;
    this.dispReverse = dispReverse;
}

function find(item) {
    var currNode = this.head
    while (!(currNode.next == null) && currNode.element != item) {
        currNode = currNode.next
    }
    return currNode
}

function insert(newElement, item) {
    var newNode = new Node(newElement)
    var current = this.find(item)
    newNode.next = current.next
    newNode.previous = current
    current.next = newNode
}

function display() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

// 双向列表的 remove 方法比单项链表的效率更高，因为不需要再查找前驱节点了

function remove(item) {
    var currNode = this.find(item)
    if (!(currNode.next == null)) {
        currNode.previous.next = currNode.next
        currNode.next.previous = currNode.previous
        currNode.next = null
        currNode.previous = null
    }
}

function findLast() {
    var currNode = this.head
    while (!(currNode.next == null)) {
        currNode = currNode.next
    }
    return currNode
}

function dispReverse() {
    var currNode = this.head
    currNode = this.findLast()
    while (!(currNode.previous == null)) {
        console.log(currNode.element)
        currNode = currNode.previous
    }
}

var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
cities.remove("Carlisle");
cities.display();
cities.dispReverse();