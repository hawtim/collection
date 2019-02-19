EventUtil.addHandler(document, 'mousemove', (e) => {
    var myDiv = document.getElementById('myDiv')
    myDiv.style.left = event.clientX + 'px'
    myDiv.style.top = event.clientY + 'px'
})

var DragDrop = function() {
    var dragdrop = new EventTarget()
    var dragging = null
    var diffX = 0
    var diffY = 0

    function handleEvent(event) {
        // 获取事件和目标
        event = EventUtil.getEvent(event)
        var target = EventUtil.getTarget(event)
        // 确定事件类型
        switch(event.type) {
            case 'mousedown':
                if (target.className.indexOf('draggable') > -1) {
                    dragging = target
                    diffX = event.clientX - target.offsetLeft
                    diffY = event.clientY - target.offsetTop
                    dragdrop.fire({
                        type: 'dragstart',
                        target: dragging,
                        x: event.clientX,
                        y: event.clientY
                    })
                }
                break
            case 'mousemove':
                if (dragging !== null) {
                    // 指定位置
                    dragging.style.left = (event.clientX - diffX) + 'px'
                    dragging.style.top = (event.clientY - diffY) + 'px'
                    dragdrop.fire({
                        type: 'drag',
                        target: dragging,
                        x: event.clientX,
                        y: event.clientY
                    })
                }
                break
            case 'mouseup':
                dragdrop.fire({
                    type: 'dragend',
                    target: dragging,
                    x: event.clientX,
                    y: event.clientY
                })
                dragging = null
                break
        }
    }
    dragdrop.enable = function() {
        EventUtil.addHandler(document, 'mousedown', handleEvent)
        EventUtil.addHandler(document, 'mousemove', handleEvent)
        EventUtil.addHandler(document, 'mouseup', handleEvent)
    },
    dragdrop.disable = function () {
        EventUtil.removeHandler(document, "mousedown", handleEvent)
        EventUtil.removeHandler(document, "mousemove", handleEvent)
        EventUtil.removeHandler(document, "mouseup", handleEvent)
    }
    return dragdrop
}()


// 拖放回自动针对所有包含 draggable 类的元素启用
DragDrop.enable()

// 支持事件
DragDrop.addHandler('dragstart', function(event) {
    var status = document.getElementById('status')
    status.innerHTML = 'Started dragging ' + event.target.id
})
DragDrop.addHandler('drag', function(event) {
    var status = document.getElementById('status')
    status.innerHTML += '</br> Dragged ' + event.target.id + ' to (' + event.x + ',' + event.y + ')'
})
DragDrop.addHandler('dragend', function(event) {
    var status = document.getElementById('status')
    status.innerHTML += "<br/> Dropped " + event.target.id + " at (" + event.x +
    "," + event.y + ")";
})