// timer.js
var Timer = {
    _data: {},
    start: function(key) {
        Timer._data[key] = new Date()
    },
    stop: function(key) {
        var time = Timer._data[key]
        if (time) {
            Timer._data[key] = new Date() - time
        }
    },
    getTime: function(key) {
        return Timer._data[key]
    }
}


Timer.start('createElement')
for (var i = 0; i < count; i ++) {
    element = document.createElement('div')
}
Timer.stop('createElement')
