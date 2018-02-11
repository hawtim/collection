function EventTarget() {
    this.handlers = {}
}

EventTarget.prototype = {
    constuctor: EventTarget,
    addHandler: function (type, handler) {
        if (typeof this.handlers[type] == 'undefined') {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    },
    fire: function(event) {
        if (!event.target) {
            event.target = this
        }
        if (this.handlers[event.type] instanceof Array) {
            var handlers = this.handlers[event.type]
            for(var i = 0, len = handlers.length; i < len; i ++) {
                handlers[i](event)
            }
        }
    },
    removeHandler: function(type, handler){
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type]
            for (var i = 0, len = handlers.length; i < len; i++) {
              if (handlers[i] == handler) {
                  break;
              }
            }
            handlers.splice(i, 1)
        }
    }
}

// EventTarget 类型有一个单独的属性handlers 用于存储事件处理程序
// 还有三个方法，
// addHandler() 用于注册给定类型事件的事件处理程序 
// fire() 用于触发一个事件
// removeHandler() 用于注销某个时间类型的事件处理程序

// 使用 EventTarget 类型的自定义事件可以如下使用

function handleMessage(event) {
    console.log('Message received:' + event.message)
}
var target = new EventTarget()
target.addHandler("message", handleMessage)
target.fire({type: "message", message: 'hello world!'})
target.removeHandler('message', handleMessage)
target.fire({type: "message", message: 'Hello world!'})