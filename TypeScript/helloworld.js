"use strict";
// 多态与继承
var Hello = (function () {
    function Hello(fiestName, lastName) {
        this.firstName = fiestName;
        this.lastName = lastName;
    }
    Hello.prototype.greeter = function () {
        return "hello! 欢迎来到typescript的世界，" + this.firstName + " " + this.lastName;
    };
    return Hello;
}());
var user = new Hello("zhang", "hawtim");
document.body.innerHTML = user.greeter();
