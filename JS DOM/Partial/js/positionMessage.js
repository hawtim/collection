function positionMessage(){
    if(!document.getElementById) return false;
    if(!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "100px";
    // 全局变量movement，可以在函数之外的任何地方被取消
    moveElement("message",125,25,20);
    if(!document.getElementById("message2")) return false;
    var elem = document.getElementById("message2");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "50px";
    // 全局变量movement，可以在函数之外的任何地方被取消
    moveElement("message2",125,125,20);
    // clearTimeout(movement);
}
addLoadEvent(positionMessage);