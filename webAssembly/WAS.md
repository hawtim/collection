<!-- $theme: gaia -->
<!-- page_number: true -->
<!-- prerender: true -->

# WebAssembly
<!-- *page_number: false -->
<!-- *template: invert -->

### 从入门到实践 :dove:

###### 张浩田
###### 2019.07.10

---

## JavaScript 的性能历史🕛

1. 1995 年 `JavaScript` 诞生。
2. 2008年，浏览器加入了即时编译器，又称之为 `JIT`(just-in-time) 。
> <small>在编译器模式下，JS 的运行速度快了 10 倍，随着这种性能改进， JS 开始被用于意想不到的事情，比如使用 `NodeJS` 和 `Electron` 构建应用程序</small>
4. 9102年: `WebAssembly` 可能是 web 构建的新转折点

---

## JavaScript 解释器 📝

<!-- *template: gaia -->

:man_mechanic: 人类 :arrow_right: 机器

:question: 目标 & 问题

:hammer_and_wrench: 人类语言 :arrow_right: 机器语言

---

## 两种翻译方式
<!-- *template: invert -->

- 解释器
- 编译器
---

### 解释器


浏览器早期使用 `JavaScript` 解释器

==优点:== 在执行代码时不需知道整个代码的编译步骤

==缺点:== 运行相同代码的，比如循环，会重复转换代码，造成低效

---

### 编译器

浏览器后期引入 `JavaScript` 引擎

==优点:== 运行相同代码的时候，不需重新转换代码，执行效率更高

==缺点:== 在程序开始的时候，它可能需要稍微多一点的时间来了解整个代码编译的步骤

---


### JavaScript 引擎的简介
<!-- *template: gaia -->

- 监视器/分析器 & 作用
- 细节原理

---

### 监视器/分析器 & 作用

在编译 js 代码的时候，编译器在 `JavaScript` 引擎添加了新的部分，称为`监视器/分析器`

该监视器在 `JavaScript` 运行时监控代码，并记录代码片段运行的次数以及使用了哪些数据类型

---

### 细节原理

<!-- *template: invert -->

如果相同的代码行运行了几次，这段代码被标记为 `warm`，运行次数比较多，就被标记为 `hot`

被标记为 `warm` 的代码被扔给基础编译器，只能提升一点点的速度。被标记为 `hot` 的代码被扔给优化编译器，速度提升的更多。

---

### WebAssembly 🚀
<!-- *template: gaia -->

###### 运行在现代网络浏览器中的新型代码

---

### MDN
<!-- *template: invert -->

###### 新的性能特性和效果
- 为诸如 `C`、`C++` 和 `Rust` 等低级源语言提供一个高效的编译目标
- 提供了一种以接近本地速度运行多种语言编写的代码的方式
- 模块可以导入到`web/app` 中，并暴露函数供 JS 使用
- JS 框架可以使用 `WebAssembly` 来获得巨大性能优势和新特性

---

#### 提供高效的编译目标？

假设没有 `wasm` 编译结果要到客户端平台运行？
- `web` 端要转成 `JavaScript`
- `Android` 端可能转成 `java` 或者 `kotlin`
- `ios` 端可能转成 `swift` 或者 `object-c`

这些语言都不是低级源语言，而通过 `wasm` 直接一步到位，将代码编译成二进制的格式，一步到位。这点是其高效的地方

---

### 将 `c` `c++` 编译成 `.wasm` 文件

```bash
git clone https://github.com/juj/emsdk.git
cd emsdk
# 在 Windows 上
emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit
```
```c
#include <stdio.h>
int main(int argc, char ** argv) {
  printf("Hello World\n");
}
```

```bash
emcc hello.c -s WASM=1 -o hello.html
```
---

### 输出


- `hello.wasm` 
> 二进制的 `wasm` 模块代码
- `hello.js` 
> 包含了在原生 C 函数和 `JavaScript/wasm` 之间转换的胶水代码文件
- `hello.html` 
> 一个用来加载，编译，实例化你的 `wasm` 代码并且将它输出在浏览器显示上的一个 `HTML` 文件

---

### 使用

现在使用一个支持 `WebAssembly` 的浏览器，加载生成的 `hello.html `。

如果一切顺利，你应该可以在页面上的 `Emscripten` 控制台和浏览器控制台中看到 `"Hello World"` 的输出。

更多具体的用法这里 >>

---


### 客户端的痛 💔

<!-- *template: default  -->

> 客户端的大性能问题

WebAssembly 提供了前端处理计算和处理性能的解决方案：
- 音视频编码解码 H264、H265
- WebGL 进行大数据处理及呈现 
- JavaScript 制作游戏的性能问题


---

### 加载和运行 wasm 💫


为了在 JS 中使用 `WebAssembly`，在编译/实例化之前，你首先需要把模块放入内存。

比如，通过 `XMLHttpRequest` 或 `Fetch` ，模块将会被初始化为带类型数组

---

### Example

```js
fetch('module.wasm').then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes, importObject)
).then(results => {
  // Do something with the compiled results!
});
fetchAndInstantiate('myModule.wasm', importObject)
.then(instance => {
  // 调用导出函数：
  instance.exports.exported_func(); 
  // 或者获取导出内存的缓存内容：
  var i32 = new Uint32Array(instance.exports.memory.buffer); 
  // 或者获取导出表格中的元素：
  var table = instance.exports.table; 
})
```
---

### 应用 👾

<!-- *template: invert  -->

![bg 150%](./images/google-earth.png)

- `Figma` — 基于浏览器的多人实时协作 UI 设计工具，运行速度提升 3 倍

- `Google Earth` — 支持各大浏览器的 3D 地图，而且运行流畅

- `Egret Engine` — 最受欢迎的 HTML 5 游戏引擎，让游戏引擎快 3 倍

- `H264/H265` —  解码 `H264/H265` WEB 播放器

> 使用 WebAssembly 能获得数倍的性能提升

---

### 思考 :thinking:


> 如果各种语言都能用来开发 WebAssembly ，能不能终结 JS 在 Web 上的统治地位？

> WebAssembly 支持操作 DOM ，等技术成熟。各大浏览器都支持 WebAssembly 必然会产生基于 WebAssembly 的前端框架，到时 JS 真的可能被替代了

---

### 参考文档 :blue_book:

<!-- template: default  -->

- [基于 wasm 的 H265 Web 播放器](https://github.com/sonysuqin/WasmVideoPlayer)

- [WebAssembly 和 Go：对未来的观望](https://www.oschina.net/translate/webassembly-and-go-a-look-to-the-future)

- [eBay 实战 WebAssembly: 50 倍性能提升](https://www.codercto.com/a/83131.html)(实践细节)

- [Assemblyscript Doc](https://docs.assemblyscript.org/)

- [WebAssembly 应用案例直击，它们都在用 WebAssembly](https://blog.csdn.net/VhWfR2u02Q/article/details/79235198)

- [几张图让你看懂WebAssembly](https://www.jianshu.com/p/bff8aa23fe4d)

- [WebAssembly 现状与实战](https://blog.csdn.net/hb_zhouyj/article/details/81565601)

---

### 致谢 :heart: 160FE

<!-- *template: default  -->
<!-- *page_number: false -->

