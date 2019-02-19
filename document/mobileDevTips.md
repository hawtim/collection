### 禁止自动识别电话和android自动识别邮箱

``` html
<meta content="telephone=no" name="format-detection" />
<meta content="email=no" name="format-detection" />
```

### 使用无衬线字体

```css
body {
    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
}
```

### 禁止长按链接与图片弹出菜单

```css
a, img {
    -webkit-touch-callout: none; /* 禁止长按链接与图片弹出菜单 */
}
```

### 去除A连接input标签,点击出现自带的阴影样式

winphone系统
`<meta name="msapplication-tap-highlight" content="no">`

```css
a,button,input,textarea {
    -webkit-tap-highlight-color: rgba(0,0,0,0); /*ios android去除自带阴影的样式*/
}
```

### 伪元素改变number类型input框的默认样式
```css
input[type=number]::-webkit-textfield-decoration-container {
    background-color: transparent;
}
input[type=number]::-webkit-inner-spin-button {
     -webkit-appearance: none;
}
input[type=number]::-webkit-outer-spin-button {
     -webkit-appearance: none;
}
```

### 改变webkit表单输入框placeholder的颜色

```css
input::-webkit-input-placeholder{color:#AAAAAA;}
input:focus::-webkit-input-placeholder{color:#EEEEEE;}
```

### 单击延迟

click 事件因为要等待双击确认,会有 300ms 的延迟,体验并不是很好。
开发者大多数会使用封装的 tap 事件来代替 click 事件, 所谓的 tap 事件由 touchstart 事件 + touchmove 判断 + touchend 事件封装组成。

### 手机拍照和上传图片

```html
<input type="file">的 accept 属性
<!-- 选择照片 -->
<input type="file" accept="image/*">
<!-- 选择视频 -->
<input type="file" accept="video/*">
```

### 防止手机中网页放大和缩小，这点是最基本的，最为手机网站开发者来说应该都知道的，就是设置meta中的viewport

有些手机网站我们看到如下声明：

`<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">`

设置了DTD的方式是XHTML的写法，假如我们页面运用的是html5，可以不用设置DTD,直接声明<!DOCTYPE html>。

使用viewport使页面禁止缩放。 通常把user-scalable设置为0来关闭用户对页面视图缩放的行为。

完整的viewport设置，当然，`user-scalable=0`,有的人也写成`user-scalable=no`，都可以的。

`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">`

### 苹果手机的一些设置。

`<meta name="apple-mobile-web-app-capable" content="yes">`

* 如果content设置为yes，Web应用会以全屏模式运行，反之，则不会。
* content的默认值是no，表示正常显示。
* 你可以通过只读属性`window.navigator.standalone`来确定网页是否以全屏模式显示。

### format-detection设置。

```html
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
```

format-detection 启动或禁用自动识别页面中的电话号码、邮箱地址。

### 上下拉动滚动条时卡顿、慢

```css
body {
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
}
```

Android3+和iOS5+支持CSS3的新属性为overflow-scrolling

### 禁止复制、选中文本

```css
Element {
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
```

解决移动设备可选中页面文本(视产品需要而定)

### 长时间按住页面出现闪退

```css
element {
    -webkit-touch-callout: none;
}
```

### iphone及ipad下输入框默认内阴影

```css
Element{
    -webkit-appearance: none;
}
```

### ios和android下触摸元素时出现半透明灰色遮罩

```css
Element {
    -webkit-tap-highlight-color:rgba(255,255,255,0)
}
```

### audio元素和video元素在ios和andriod中无法自动播放

```js
$('html').one('touchstart', function(){
    audio.play()
})
```

### active兼容处理 即 伪类 :active 失效

方法一：body 添加 ontouchstart

`<body ontouchstart="">`

方法二：js给 document 绑定 touchstart 或 touchend 事件

```html
<style>
a {
  color: #000;
}
a:active {
  color: #fff;
}
</style>
<a href="foo">bar</a>
<script>
  document.addEventListener(‘touchstart‘,function(){},false);
</script>
```

要做到全兼容的办法，可通过绑定`ontouchstart`和`ontouchend`来控制按钮的类名

```css

.btn-blue {
    display:block;
    height:42px;
    color:#FFFFFF;
    font-size:18px;
    line-height:42px;
    border-radius:4px;
    text-align:center;
    background-color: #4185F3;
}

.btn-blue-on{
    background-color: #357AE8;
}

```

```html
<div class="btn-blue">按钮</div>

<script type="text/javascript">
    var btnBlue = document.querySelector(".btn-blue")

    btnBlue.ontouchstart = function() {
        this.className = "btn-blue btn-blue-on"
    }

    btnBlue.ontouchend = function() {
        this.className = "btn-blue"
    }
</script>
```


### 动画定义3D启用硬件加速

```css
Element {
    -webkit-transform:translate3d(0, 0, 0)
    transform: translate3d(0, 0, 0);
}
```

注意：3D变形会消耗更多的内存与功耗

### Retina屏的1px边框

```css
Element{
    border-width: thin;
}
```

### 旋转屏幕时，字体大小调整的问题

```css
*{
   -webkit-text-size-adjust:100%;
}
```

### 顶部状态栏背景色

`<meta name="apple-mobile-web-app-status-bar-style" content="black" />`

说明：

* 除非你先使用apple-mobile-web-app-capable指定全屏模式，否则这个meta标签不会起任何作用。
* 如果content设置为default，则状态栏正常显示。
* 如果设置为blank，则状态栏会有一个黑色的背景。
* 如果设置为blank-translucent，则状态栏显示为黑色半透明。
* 如果设置为default或blank，则页面显示在状态栏的下方，即状态栏占据上方部分，页面占据下方部分，二者没有遮挡对方或被遮挡。
* 如果设置为blank-translucent，则页面会充满屏幕，其中页面顶部会被状态栏遮盖住（会覆盖页面20px高度，而iphone4和itouch4的Retina屏幕为40px）。
* 默认值是default。兼容性 iOS 2.1 +

### 设置缓存

`<meta http-equiv="Cache-Control" content="no-cache" />`


手机页面通常在第一次加载后会进行缓存，然后每次刷新会使用缓存而不是去重新向服务器发送请求。如果不希望使用缓存可以设置no-cache。

### 桌面图标

```html
<link rel="apple-touch-icon" href="touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png" />
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png" />
```

### 浏览器私有及其它meta

QQ浏览器私有

全屏模式
`<meta name="x5-fullscreen" content="true">`

强制竖屏
`<meta name="x5-orientation" content="portrait">`

强制横屏
`<meta name="x5-orientation" content="landscape">`

应用模式
`<meta name="x5-page-mode" content="app">`

UC浏览器私有

全屏模式
`<meta name="full-screen" content="yes">`

强制竖屏
`<meta name="screen-orientation" content="portrait">`

强制横屏
`<meta name="screen-orientation" content="landscape">`

应用模式
`<meta name="browsermode" content="application">`

其它

针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓

`<meta name="HandheldFriendly" content="true">`

微软的老式浏览器

`<meta name="MobileOptimized" content="320">`

windows phone 点击无高光

`<meta name="msapplication-tap-highlight" content="no">`

### IOS中input键盘事件keyup、keydown、keypress支持不是很好

* 问题是这样的，用input search做模糊搜索的时候，在键盘里面输入关键词，会通过ajax后台查询，然后返回数据，然后再对返回的数据进行关键词标红。
* 用input监听键盘keyup事件，在安卓手机浏览器中是可以的，但是在ios手机浏览器中变红很慢，用输入法输入之后，并未立刻相应keyup事件，只有在通过删除之后才能相应！

解决方法：可以用html5的oninput事件去代替keyup

```html
<input type="text" id="testInput">

<script>
    document.getElementById('testInput').addEventListener('input', function(e){
        var value = e.target.value
    })
</script>
```