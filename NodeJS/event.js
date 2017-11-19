// events 模块只提供了一个对象， events.EventEmitter 
// EventEmitter 的核心就是事件触发与事件监听器功能的封装
var EventEmitter = require('events').EventEmitter
var event = new EventEmitter()
event.on('some_event', function() {
    console.log('some_event 事件触发')
})
setTimeout(function() {
    event.emit('some_event')
}, 1000)

var events = require('events'); 
var emitter = new events.EventEmitter(); 
//event.js 文件
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 