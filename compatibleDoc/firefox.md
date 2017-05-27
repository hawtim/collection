#### 火狐上alert()的使用
```js
alert() // 当里面没有参数时会在火狐中无法运行，IE可以。
alert('') // 有参数火狐才会执行，在火狐调试时要特别注意。
```

#### event对象
event.srcElement从字面上可以看出来有以下关键字：事件,源他的意思就是：当前事件的源，
我们可以调用他的各种属性就像:document.getElementById(”")这样的功能，
经常有人问firefox 下的event.srcElement 怎么用，在此详细说明：
IE下,event对象有srcElement属性,但是没有target属性;Firefox下,event对象有target属性,但是没有srcElement属性.但他们的作用是相当的，即：
firefox 下的event.target = IE 下的event.srcElement
解决方法:
使用obj(obj = event.srcElement ? event.srcElement : event.target;)来代替IE下的event.srcElement或者Firefox下的event.target
IE 中可以直接使用event 对象，而FF 中则不可以，解决方法之一如下：
var theEvent = window.event || arguments.callee.caller.arguments[0];
第二种是将event 作为参数来传递: function xxx(e){var theEvent = window.event || e;}

#### srcElement 和target
在IE 中srcElement 表示产生事件的源，比如是哪个按钮触发的onclick 事件，FF 中则是target。
```js
var theEvent = window.event || arguments.callee.caller.arguments[0];
var srcElement = theEvent.srcElement;
if (!srcElement){
    srcElement = theEvent.target;
    document.onclick = function(e){
        var theEvent = window.event || e;
        var srcElement = theEvent.srcElement;
        if (!srcElement) {
        srcElement = theEvent.target;
        }
    }
}

function clickAction(){
    var theEvent = window.event || arguments.callee.caller.arguments[0];
    var srcElement = theEvent.srcElement;
    if (!srcElement) {
       srcElement = theEvent.target;
       // do something;
    }
}

function clickAction(e){
    var theEvent = window.event || e;
    var srcElement = theEvent.srcElement;
    if (!srcElement) {
       srcElement = theEvent.target;
       // do something;
    }
}
```

#### event.keyCode 和event.which
FF不支持window.event.keyCode，代替着是event.which
```js
//在网页上面屏蔽tab键的代码
document.onkeydown = function (e){
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which;
    if(code == 9){
       return false;
    }
}
```

#### document.all

document.all是ie在dom标准确立之前的一个得到元素的一个集合，根据id和name，的一个元素大集合，后来DOM标准确定了，getElementById逐渐慢慢取代了all对象集的地位，但是firefox为了兼容一些为ie写的使用document.all的脚本，不得已，加入了document.all支持，但是也不支持if(document.all)判断，并且在有正确xhtml的doctype下会屏蔽使用document.all

#### 判断页面加载完成

IE: document.onreadystatechange=function(){document.readyState=="complete"}

FF: document.addEventListener("DOMContentLoaded",handle,false)

当某一事件被触发时需要执行某个函数，在IE下可用attachEvent，在FF下则要用addEventListener。

attachEvent()有两个参数，第一个是事件名称，第二个是需执行的函数；

addEventListener()有三个参数，第一个是事件名称，但与IE事件不同的是，事件不带"on",比如"onsubmit"在这里应为"submit"，第二个是需执行的函数，第三个参数为布尔值；

#### 设置容器位置left、top
IE：可以不用加单位px
FF：一定要加单位px

#### 一种用来输入整数的方法。
```html
IsInt:<input type="text" onkeyup="isInt(event);">
```
```js
//是否整型
function isInt(e){
    //keyCode:IE支持，which:FF支持。
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which;
    if(code < 48 || code > 57){
       //alert(code);//srcElement:IE支持，target:FF支持
       var val = e.srcElement ? e.srcElement : e.target;
       val.value = val.value.substring(0,val.value.length-1);
    }
}

// "||"：也可以用来赋值，在FF中没有window.event，要对象赋对象。isInt(event);

function isInt(e){
    var oEvent = e || window.event; //用来判断是IE或者FF，并赋值给对象。
    var oTarget = oEvent.target || oEvent.srcElement; //用来取IE或者FF的对象。
}
```