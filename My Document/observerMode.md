## 观察者模式

目标和观察者是基类，目标提供维护观察者的一系列方法，观察者提供更新接口。具体观察
者和具体目标继承各自的基类，然后具体观察者把自己注册到具体目标里，在具体目标发生
变化的时候，调度观察者的更新方法

## 发布订阅模式

订阅者把自己想订阅的事件注册到调度中心，当该事件触发的时候，发布者发布该事件到调
度中心，由调度中心统一调度订阅者注册到调度中心的处理代码

## 总结

1. 两种模式最大的区别是调度的地方，观察者模式是由具体目标调度的，而发布订阅模式
   是统一由调度中心调度的，所以观察者模式的订阅者和发布者之间是存在依赖的，而发
   布订阅模式则不会
2. 两种模式都可以松散耦合，改进代码管理和潜在的复用

## 代码实现
观察者模式
```js
//观察者列表
function ObserverList() {
  this.observerList = []
}
ObserverList.prototype.add = function(obj) {
  return this.observerList.push(obj)
}
ObserverList.prototype.count = function() {
  return this.observerList.length
}
ObserverList.prototype.get = function(index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index]
  }
}
ObserverList.prototype.indexOf = function(obj, startIndex) {
  var i = startIndex
  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      return i
    }
    i++
  }
  return -1
}
ObserverList.prototype.removeAt = function(index) {
  this.observerList.splice(index, 1)
}

//目标
function Subject() {
  this.observers = new ObserverList()
}
Subject.prototype.addObserver = function(observer) {
  this.observers.add(observer)
}
Subject.prototype.removeObserver = function(observer) {
  this.observers.removeAt(this.observers.indexOf(observer, 0))
}
Subject.prototype.notify = function(context) {
  var observerCount = this.observers.count()
  for (var i = 0; i < observerCount; i++) {
    this.observers.get(i).update(context)
  }
}

//观察者
function Observer() {
  this.update = function() {
    // ...
  }
}
```

发布订阅模式实现代码

```js
var pubsub = {}
;(function(myObject) {
  // Storage for topics that can be broadcast
  // or listened to
  var topics = {}
  // An topic identifier
  var subUid = -1
  // Publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  myObject.publish = function(topic, args) {
    if (!topics[topic]) {
      return false
    }
    var subscribers = topics[topic],
      len = subscribers ? subscribers.length : 0
    while (len--) {
      subscribers[len].func(topic, args)
    }
    return this
  }
  // Subscribe to events of interest
  // with a specific topic name and a
  // callback function, to be executed
  // when the topic/event is observed
  myObject.subscribe = function(topic, func) {
    if (!topics[topic]) {
      topics[topic] = []
    }
    var token = (++subUid).toString()
    topics[topic].push({
      token: token,
      func: func
    })
    return token
  }
  // Unsubscribe from a specific
  // topic, based on a tokenized reference
  // to the subscription
  myObject.unsubscribe = function(token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0, j = topics[m].length; i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1)
            return token
          }
        }
      }
    }
    return this
  }
})(pubsub)
```

## 参考文献

《Learning JavaScript Design Patterns》 by Addy Osmani https://addyosmani.com/resources/essentialjsdesignpatterns/book/
