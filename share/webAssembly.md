# WebAssembly 是什么

`WebAssembly` 是一种运行在现代网络浏览器中的新型代码，并且提供新的性能特性和效果。

它设计的目的不是为了手写代码，而是为诸如`C`、`C++`和`Rust`等低级源语言提供一个高效的编译目标。

对于网络平台而言，这具有巨大的意义

——这为客户端app提供了一种在网络平台以接近本地速度的方式运行多种语言编写的代码的方式；

在这之前，客户端app是不可能做到的。

而且，你在不知道如何编写 `WebAssembly` 代码的情况下就可以使用它。

`WebAssembly` 的模块可以被导入的到一个web app（或Node.js）中，并且暴露出供`JavaScript`使用的`WebAssembly`函数。

`JavaScript` 框架不但可以使用 `WebAssembly` 获得巨大性能优势和新特性，而且还能使得各种功能保持对网络开发者的易用性。

## 为什么是为 c c++ 等低级源语言提供一个高效的编译目标

简单说下如何将 `c` `c++` `rust` 编译成 `.wasm` 文件

```bash
git clone https://github.com/juj/emsdk.git
cd emsdk

# 在 Windows 上
emsdk install --build=Release sdk-incoming-64bit binaryen-master-64bit
emsdk activate --global --build=Release sdk-incoming-64bit binaryen-master-64bit

```

通过一个简单的 `hello world.c`

```c
#include <stdio.h>

int main(int argc, char ** argv) {
  printf("Hello World\n");
}
```

```bash
emcc hello.c -s WASM=1 -o hello.html
```

这个时候在您的源码文件夹应该有下列文件:

`hello.wasm`     二进制的 `wasm` 模块代码
`hello.js`        一个包含了用来在原生C函数和 `JavaScript/wasm` 之间转换的胶水代码的 `JavaScript` 文件
`hello.html`     一个用来加载，编译，实例化你的 `wasm` 代码并且将它输出在浏览器显示上的一个 `HTML` 文件

现在使用一个支持 `WebAssembly` 的浏览器，加载生成的 `hello.html `。

如果一切顺利，你应该可以在页面上的 Emscripten 控制台和 浏览器控制台 中看到 "Hello World" 的输出。

更多具体的用法这里就暂时不细说了


## 我们来看看他是如何提供一个高效的编译目标

假设没有 wasm 那么要到浏览器或者其他客户端平台运行，
那么 web端要转成 JavaScript 
安卓端可能转成 java 或者 kotlin 
ios端可能转成 swift 或者 object-c

这些语言都不是低级源语言，而通过 wasm 直接一步到位，将代码编译成二进制的格式，一步到位。这点是其高效的地方


## 客户端的痛

以往客户端的大性能问题，要么通过后台计算和后台数据处理后返回前端一个结果，
但是 wasm 提供了一个前端处理计算和处理性能的解决方案，有了 wasm 可以执行音视频编码解码，可以结合 webgl 进行大数据处理及呈现，解决 JavaScript 制作游戏时遇到的性能问题。
通过 web worker 开辟子线程， wasm 有了很大的发挥空间。为客户端的复杂呈现和复杂数据处理提供了可能性。

例子

## 加载和运行 wasm

为了在JavaScript中使用WebAssembly，在编译/实例化之前，你首先需要把模块放入内存。比如，通过XMLHttpRequest或Fetch，模块将会被初始化为带类型数组

```js
fetch('module.wasm').then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes, importObject)
).then(results => {
  // Do something with the compiled results!
});

fetchAndInstantiate('myModule.wasm', importObject).then(function(instance) {
  // 调用导出函数：
  instance.exports.exported_func();

  // 或者获取导出内存的缓存内容：
  var i32 = new Uint32Array(instance.exports.memory.buffer);

  // 或者获取导出表格中的元素：
  var table = instance.exports.table;
  console.log(table.get(0)());
})
```