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
<!-- *page_number: false -->

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

### 耗时比较
<!-- *template: gaia -->
<!-- *page_number: false -->

##### JavaScript Vs. WebAssembly

---

### JS 引擎

<br>

- Parsing - 源码转换过程
- Compiling+optimizing - 基础编译和优化编译过程
- Re-optimizing - 重新优化过程
- Execution - 执行代码的过程
- Garbage collection - 清理内存的时间

---

### WebAssembly

<br>

- decode - 解码
- compile+optimize - 编译和优化
- execute - 执行代码的过程

---

### 请求

下载执行与 JavaScript 等效的 WebAssembly 文件需要更少的时间，因为它的体积更小。WebAssembly 设计的体积更小，可以以二进制形式表示。

即使使用 gzip 压缩的 JavaScript文件很小，但 WebAssembly 中的等效代码可能更小。

---

### 解析

JavaScript 源码一旦被下载到浏览器，源将被解析为抽象语法树（AST）。

通常浏览器解析源码是懒惰的，浏览器首先会解析他们真正需要的东西，没有及时被调用的函数只会被创建成存根。

在这个过程中，AST被转换为该 JS 引擎的中间表示（称为字节码）。

相反，WebAssembly 不需要被转换，因为它已经是字节码了。它仅仅需要被解码并确定没有任何错误。

---

### 编译 + 优化

JavaScript 是在执行代码期间编译的。

因为 JavaScript 是动态类型语言，相同的代码在多次执行中都有可能都因为代码里含有不同的类型数据被重新编译。

WAS 与机器代码更接近。类型是程序的一部分
- 编译器不需要在运行代码时花费时间去观察代码中的数据类型，在开始编译时做优化
- 编译器不需要在每次执行相同代码中判断数据类型是否一样

---

### 重新优化

有时 JIT 抛出一个优化版本的代码，然后重新优化。

JIT 基于运行代码的假设不正确时，会发生这种情况。例如，当进入循环的变量与先前的迭代不同时，或者在原型链中插入新函数时，会发生重新优化。

在 WebAssembly 中，类型是明确的，因此 JIT 不需要根据运行时收集的数据对类型进行假设。这意味着它不必经过重新优化的周期。

> So we deleted re-optimize 

---

### 执行

WebAssembly 是专门给编译器阅读的，提供了一组更适合机器的指令

---

### 垃圾回收

在 JavaScript 中，开发者不需要担心内存中无用变量的回收，JS 引擎使用一个叫垃圾回收器的东西来自动进行垃圾回收。

WAS 不支持垃圾回收，完全靠手动管理内存，这在开发上可能会造成困难，但它的确提升了性能

---

### 对比结果


- 文件加载 - WebAssembly 文件体积更小，所以下载速度更快。
- 解析 - 解码 WebAssembly 比解析 JavaScript 要快
- 编译和优化 - 编译和优化所需的时间较少，因为在将文件推送到服务器之前已经进行了更多优化，JavaScript 需要为动态类型多次编译
- 代码重新优化 - WebAssembly 代码不需要重新优化，因为编译器有足够的信息可以在第一次运行时获得正确的代码执行 - 
- 执行可以更快，WebAssembly 指令更接近机器码
- 垃圾回收 - 目前 WebAssembly 不直接支持垃圾回收，垃圾回收都是手动控制的，所以比自动垃圾回收效率更高。

---

### 机器是如何解析和运行 WebAssembly 代码？

<!-- *template: gaia -->
<!-- *page_number: false -->

 WebAssembly 

- 计算部分 - 由算术逻辑单元（ALU）完成

- 短期储存 - 由寄存器（Registers）提供

- 长期储存 - 由随机存储器（RAM）提供

---

### 代码的转换

我们知道 WAS 的代码非常接近机器码，但 WAS 和机器汇编不一样，机器语言（X86,ARM）都对应特定的机器架构。

```
ADD R1 R2
```

我们希望将任何一种高级编程语言转换为任何一种汇编语言，这样的话需要创建一大堆不同的翻译器。

> 这样做的效率非常低

---

### 中间代码 IR

为了解决这个问题，大多数编译器会在高级语言和汇编语言之间多加一层，编译器将高级语言翻译成一种更低级的语言，但比机器码的等级高，这就是中间代码 IR

> 编译器可以将任何一种高级语言转换成一种中间语言

---

### WebAssembly 指令

###### 虚拟指令

将 WebAssembly 当做是另外一种目标汇编语言，我们上面说了，汇编语言和机器架构是一一对应的
当 WebAssembly 运行在用户机器的 web 平台上，你不知道你的代码将会运行在哪种机器结构上
所以 WebAssembly 需要避免代码直接在物理机上运行，因为平台的不同可能会导致代码出错
因此，WebAssembly 的代码，是一个概念上的机器语言，也被称为虚拟指令，它比JS更快转换成机器代码，不直接和特定的硬件特定的机器代码对应

---




### WebAssembly 🚀
<!-- *template: gaia -->
<!-- *page_number: false -->

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

