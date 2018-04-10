function detectCapsLock(event) {
    var isCapLock = false
    var e = event || window.event
    var keyCode = e.keyCode || e.which // 按键的keyCode
    var isShift = e.shiftKey || keyCode == 16 || false // shift键是否按住
    // Caps Lock 打开，且没有按住shift键/且按住shift键
    if ((keyCode >= 65 && keyCode <= 90 && !isShift) || (keyCode >= 97 && keyCode <= 122 && isShift)) {
        isCapLock = true
    } else {
        isCapLock = false
    }
}
