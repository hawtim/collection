---
marp: true
title: WebAssembly 从入门到实践
theme: gaia
paginate: true
_paginate: false
---

webAssembly 从入门到实践 🐤
===

160FE 🔗 张浩田 🔗 2019.07.10

---

JavaScript 的性能历史🕛
===

1. 1995 年 `JavaScript` 诞生。它的设计时间非常短，前十年发展迅速，紧接着浏览器厂商们就开始了更多的竞争。
2. 2008年，人们称之为浏览器性能大战的时期开始了。很多浏览器加入了即时编译器，又称之为 `JITs`(just-in-time) 。 在这种模式下，`JavaScript` 在运行的时候，`JIT` 选择模式然后基于这些模式使代码运行更快。所有的突然之间， `JavaScript` 的运行速度快了 10 倍，随着这种改进的性能 `JavaScript` 开始被用于意想不到的事情，比如使用 `Node.js` 和 `Electron` 构建应用程序
3. 现在 `WebAssembly` 可能是的另一个转折点

---

JavaScript 解释器 📝
===

`JavaScript` 是如何在浏览器中运行的呢？

作为一个开发人员，您将 `JavaScript` 添加到页面时，您有一个目标并遇到一个问题

- 目标：你想要的告诉计算机做什么
- 问题：你和计算机使用不通的语言

`JavaScript` 和其他高级语言其实是人类语言，它们的设计是为了让人们认知，而不是为机器设计的

所以 `JavaScript` 引擎的工作就是把人类语言 (比如 `JavaScript` ) 翻译为机器所理解的语言

---

两种翻译方法
===

- 解释器（浏览器早期使用 `JavaScript` 解释器）

> 优点：不需要在执行代码的时候知道整个代码的编译步骤，web 开发者能够立即得到反馈
> 缺点：运行相同代码的时候，比如循环，会一遍又一遍的做同样的事，造成低效

- 编译器（浏览器后期引入 `JavaScript` 引擎）

> 优点：运行相同代码的时候，不需重新转换代码，执行效率更高
> 缺点：在程序开始的时候，它可能需要稍微多一点的时间来了解整个代码编译的步骤

---

JavaScript 引擎的简介
===

在编译 js 代码的时候，编译器在 `JavaScript` 引擎添加了新的部分，称为`监视器/分析器`

该监视器在 `JavaScript` 运行时监控代码，并记录代码片段运行的次数以及使用了哪些数据类型

如果相同的代码行运行了几次，这段代码被标记为 `warm`，运行次数比较多，就被标记为 `hot`

被标记为 `warm` 的代码被扔给基础编译器，只能提升一点点的速度。被标记为 `hot` 的代码被扔给优化编译器，速度提升的更多。

---

webAssembly MDN 🚀
===

`WebAssembly` 是一种运行在现代网络浏览器中的新型代码，并且提供新的性能特性和效果。
它设计的目的不是为了手写代码，而是为诸如 `C`、`C++` 和 `Rust` 等低级源语言提供一个高效的编译目标。
对于网络平台而言，这具有巨大的意义 —— 这为客户端 `app` 提供了一种在网络平台以接近本地速度的方式运行多种语言编写的代码的方式；在这之前，客户端 `app` 是不可能做到的。而且，你在不知道如何编写 `WebAssembly` 代码的情况下就可以使用它。

`WebAssembly` 的模块可以被导入到一个 `web/app` 中，并且暴露出供 `JavaScript` 使用的函数。

`JavaScript` 框架不但可以使用 `WebAssembly` 获得巨大性能优势和新特性，而且还能使得各种功能保持对网络开发者的易用性。

---

为 c c++ 等低级源语言提供一个高效的编译目标？
===

简单说下如何将 `c` `c++` 编译成 `.wasm` 文件

```bash
git clone https://github.com/juj/emsdk.git
cd emsdk

# 在 Windows 上
emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit
```
---

通过一个简单的 `hello world.c`
===

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

这个时候在您的源码文件夹应该有下列文件:

- `hello.wasm` 二进制的 `wasm` 模块代码
- `hello.js` 一个包含了用来在原生 `C` 函数和 `JavaScript/wasm` 之间转换的胶水代码的 `JavaScript` 文件
- `hello.html` 一个用来加载，编译，实例化你的 `wasm` 代码并且将它输出在浏览器显示上的一个 `HTML` 文件

现在使用一个支持 `WebAssembly` 的浏览器，加载生成的 `hello.html `。

如果一切顺利，你应该可以在页面上的 `Emscripten` 控制台和浏览器控制台中看到 `"Hello World"` 的输出。

更多具体的用法这里就暂时不细说了

---

提供高效的编译目标 🎯
===

假设没有 `wasm` 那么要到浏览器或者其他客户端平台运行
那么 `web` 端要转成 `JavaScript`
`Android` 端可能转成 `java` 或者 `kotlin`
`ios` 端可能转成 `swift` 或者 `object-c`

这些语言都不是低级源语言，而通过 `wasm` 直接一步到位，将代码编译成二进制的格式，一步到位。这点是其高效的地方

---

客户端的痛 💔
===

以往客户端的大性能问题，要么通过后台计算和后台数据处理后返回前端一个结果，
但是 `wasm` 提供了一个前端处理计算和处理性能的解决方案，有了 `wasm` 可以执行音视频编码解码，可以结合 `webGL` 进行大数据处理及呈现，解决 `JavaScript` 制作游戏时遇到的性能问题。
通过 `web worker` 开辟子线程， `wasm` 有了很大的发挥空间。为客户端的复杂呈现和复杂数据处理提供了可能性。

---

加载和运行 wasm 💫
===

为了在 `JavaScript` 中使用 `WebAssembly` ，在编译/实例化之前，你首先需要把模块放入内存。比如，通过 `XMLHttpRequest` 或 `Fetch` ，模块将会被初始化为带类型数组

```js
fetch('module.wasm').then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes, importObject)
).then(results => {
  // Do something with the compiled results!
});
fetchAndInstantiate('myModule.wasm', importObject).then(instance => {
  instance.exports.exported_func(); // 调用导出函数：
  var i32 = new Uint32Array(instance.exports.memory.buffer); // 或者获取导出内存的缓存内容：
  var table = instance.exports.table; // 或者获取导出表格中的元素：
  console.log(table.get(0)());
})
```

---

应用 👾
===

- `Figma` — 基于浏览器的多人实时协作 UI 设计工具
- `Google Earth` — 支持各大浏览器的 3D 地图，而且运行流畅
- `Egret Engine` — 最受欢迎的 HTML 5 游戏引擎，让游戏引擎快三倍

- `web` 无插件解码播放 `H264/H265` ( `WebAssembly` 解码 `HTML5` 播放)

---

思考 :thinking:
===

- 如果各种语言都能用来开发 `WebAssembly` ，能不能终结 `js` 在 `web` 上的统治地位？
- `wasm` 支持操作 `DOM`，等技术成熟，各大浏览器都支持 `wasm` ，必然会产生基于 `wasm` 的前端框架，到时 `js` 真的可能被替代了

---

参考文档 :blue_book:
===

- [基于 wasm 的 H265 Web 播放器](https://github.com/sonysuqin/WasmVideoPlayer)

- [WebAssembly 和 Go：对未来的观望](https://www.oschina.net/translate/webassembly-and-go-a-look-to-the-future)

- [eBay 实战 WebAssembly：50 倍性能提升](https://www.codercto.com/a/83131.html)

- [Assemblyscript Doc](https://docs.assemblyscript.org/)

- [WebAssembly 应用案例直击，它们都在用 WebAssembly](https://blog.csdn.net/VhWfR2u02Q/article/details/79235198)

---

致谢 :heart: 160FE
===
