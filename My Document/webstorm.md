前端狗一枚，最近刚上手webstorm 用上就觉得好用了。
文章内容转载于http://www.html5jscss.com/ide-webstrom.html
自己用markdown语法编辑并优化排版，希望方便大家查阅。
好了不多说，有心看到的朋友就点个喜欢就好了。欢迎勘误。感恩。

# webstorm 特色功能

-  任何一个编辑器都需要保存(Ctrl + S)，这是所有win平台上编辑类软件的特点，但是webstorm编辑文件右上角是没有那个熟悉的*的。

**好处**：省去了Ctrl + S之后，在结合Firefox的vim，基本不动鼠标就可以看到结果页面了。 
**坏处**：没有以前的 * 标识，万一键盘误操作也会被立即存储。

- 任何一个编辑器只要文件关闭了就没有历史记录了，但是webstorm有。
> 菜单栏 VCS->Local History -> Show History（快捷键：Alt + ~   -> 7）

> hawtim tips：   Ctrl + ~  能够弹出切换弹窗，能够实现：
> * 编辑器风格(theme)快速切换，
> * 代码配色(code style)快速切换，
> * 窗口模式(view)快速切换，
> * 不同IDE下的快捷键(keymap)切换，
> * 编辑器整体(editor theme)配色快速切换

> **好处**：只要 webstorm 不关闭，你的文件随时可以返回到之前的操作（这也是为啥在 webstorm 里Ctrl + Y 是删除一行的原因了）。
> **坏处**：webstorm 关闭重启后这些历史记录就没有了；还有一个坏处就是由此带来的内存消耗也必然比较大。**

-  任何一个编辑器，除了服务器svn之外，没有本地版本，但是webstorm提供一个本地文件修改历史记录（快捷键：Alt + Shift + C）。也可以 Ctrl + E 弹出最近打开的文件。

>**好处**：相当于本地 svn。
**坏处**：内存消耗也必然比较大。

-  集成了zencoding，html5，ftp，即时编辑（chrome）,自动完成,基于 Mozilla 的 JavaScript 调试器，JSLint、Less支持、CoffeeScript 支持、Node.JS、单元测试、集成 git 和 svn 版本控制等特性。

-  在编写 CSS 中，会智能的提示各种文件以及图片的路径，就不用再去确认这个文件是否存在了。
***
# webstorm安装后的一些设置技巧：

- 如何更改主题（字体&配色）：
File -> settings -> Editor -> colors&fonts -> scheme name.[主题下载地址](http：//phpstorm-themes.com/)
***
- 如何让webstorm启动的时候不打开工程文件：
File -> Settings-> General去掉Reopen last project on startup.
***
- 如何完美显示中文：
File -> Settings-> Appearance中勾选Override default fonts by (not recommended)，设置 Name：NSimSun，Size：12
***
- 如何显示行号：
File -> Settings-> Editor，”Show line numbers” 打上勾，就显示行号了
***
- 如何代码自动换行：
File -> settings -> Editor “Use Soft Wraps in editor” 打上钩，代码就自动换行了
***
- 如何点击光标，显示在本行末尾：
File -> Settings-> Editor “Allow placement of caret after end of line” 去掉勾就行了。
***
- 如何修改快键键：
File -> Settings-> Keymap，然后双击要修改快捷的功能会有提示框出来，按提示操作
***
- 换成自己熟悉编辑器的快键键：
File -> Settings-> Keymap，支持像 Visual Studio、Eclipse、NetBeans 这样的主流 IDE。
***
- javascript 类库提示。 File -> settings -> Javascript -> Libraries -> 然后在列表里选择自己经常用到的 javascript 类库，最后 Download and Install 就 ok 了.
***
- 在开发js时发现，需要ctrl + return 才能选候选项： File -> Setting -> Editor -> Code Completion -> Preselect the first suggestion： “Smart” 改为 “Always”
***
- js提示比较迟缓 File -> Code Completion -> Autopopup in 下 1000 改为 0
***
- git配置：File -> settings -> Editor -> github，进去改 github 的账户，如果没有 git 则不需要.
***
- 插件安装：File -> plugins，然后就选择给力的插件再安装. (“css-X-fire” 插件,用于当使用 firebug 修改 css 属性时，编辑器内的css代码也会发生变化。）
>  hawtim tips：关于使用 webstorm 的双向解决方案可以查看 https：//segmentfault.com/a/1190000003709651 
***

# webstorm使用心得
- 收藏夹功能：当工程目录很庞大时，有些子目录很经常打开，但层级又很深，这时候可以把目录添加到收藏夹里面，添加成功后，左侧有个“Favorites”菜单。
- 面包屑导航：除了左侧的工程页面，可以选择目录之外，在顶部菜单下有一个类似网站面包屑导航一样的目录也可以实现相同功能。
点击每个目录就会有下拉菜单显示其下的子目录，很实用。
- 构造器界面：注释符合格式的话就会出现。
如果是js文件则是js类的函数和对象；
css文件的话则是这个css文件的概括；
html文件的话则是节点的结构图。
话说这几个就是为了方便查看代码的结构性.
- todo界面：给代码加todo注释就会出现这个界面
- 双栏代码界面：右击代码选项卡上的文件，然后右键 -> spilt vertically(左右两屏)或者spilt horizontally(上下两屏)
- 本地历史功能：找回代码的好办法
***
### git使用
webstorm中只集成了git的常用操作，并不能完全替代命令行工具。
在界面的右下角可以查看处于哪个git分支。也可以在上面点击切换或者新建分支。
查看当前代码与版本库代码的差异：右击代码界面任意区域，选择git -> compare with然后选择要比较的版本库。
***
# webstorm的快捷键说明：

- ### Editing**编辑相关快捷键**
**Ctrl + Space**：Basic code completion (the name of any class, method or variable) 基本代码完成（任何类、函数或者变量名称），改为Alt+S
**Ctrl + Shift + Enter**：Complete statement 补全当前语句
**Ctrl + P**：Parameter info (within method call arguments) 参数信息 包括方法调用参数
**Ctrl + mouseover** ：codeBrief Info 简单信息
**Ctrl + F1** ： Show description of error or warning at caret 显示光标所在位置的错误信息或者警告信息
**Alt + Insert**：Generate code…（Getters, Setters, Constructors）新建一个文件或者生成代码，…构造函数，可以创建类里面任何字段的getter与setter方法
**Ctrl + O**：Override methods 重载方法
**Ctrl + I**：Implement methods 实现方法
**Ctrl + Alt + T**：Surround with…（if, else, try, catch, for, etc）用\* 来围绕选中的代码行（ \* 包括 if 、 while 、 try catch 等）
**Ctrl + /**： Comment/uncomment with line comment 行注释/取消行注释
**Ctrl + Shift + /**： Comment/uncomment with block comment 块注释/取消块注释
**Ctrl + W**： Select successively increasing code blocks 选择代码块，一般是增量选择
**Ctrl + Shift + W** ：Decrease current selection to previous state 上个快捷键的回退，减量选择代码
**Alt + Q**： Context info 上下文信息
**Alt + Enter**： Show intention actions and quick-fixes 意图行动，快速见效
**Ctrl + Alt + L**：Reformat code 根据模板格式对代码格式化
**Tab/ Shift + Tab**： Indent/unindent selected lines 对所选行进行缩排处理/撤销缩排处理
**Ctrl + X or Shift + Delete**：  Cut current line or selected block to clipboard 剪切当前行或所选代码块到剪切板
**Ctrl + C or Ctrl + Insert**：  Copy current line or selected block to chipboard 拷贝当前行或者所选代码块到剪切板
**Ctrl + V or Shift + Insert**：Paste from clipboard 粘贴剪切板上的内容
**Ctrl + Shift + V**：Paste from recent buffers 粘贴缓冲器中最新的内容
**Ctrl + D**：Duplicate current line or selected block 复制当前行或者所选代码块
**Ctrl + Y**：Delete line at caret 删除光标所在位置行
**Ctrl + Shift + J**：Smart line join（HTML and JavaScript only）加入智能行 （HTML 和JavaScript）
**Ctrl + Enter**：Smart line split（HTML and JavaScript only）分离智能行 （HTML 和JavaScript）
**Shift + Enter**： Start new line 另起一行
**Ctrl + Shift + U**：Toggle case for word at caret or selected block 光标所在位置大小写转换
**Ctrl + Shift + ]**：/[Select till code block end/start 选择直到代码块结束/开始
**Ctrl + Delete**：Delete to word end 删除文字结束
**Ctrl + Backspace**：Delete to word start 删除文字开始
**Ctrl + NumPad+/-**：Expand/collapse code block 扩展/缩减代码块
**Ctrl + Shift + NumPad+**：Expand all 扩张所有
**Ctrl + Shift + NumPad-**：Collapse 缩减所有
**Ctrl + F4**：Close active editor tab 关闭活跃编辑标签

- ### Search/replace**搜索/替代相关快捷键**
**Ctrl + F**： Find 当前文件内快速查找代码
**Ctrl + Shift + F**： Find in path 指定文件内寻找路径
**F3**： Find next 查找下一个
**Shift + F3**：Find previous 查找上一个
**Ctrl + R**： Replace 当前文件内代码替代
**Ctrl + Shift + R**： Replace in path 指定文件内代码批量替代

- ### Usage Search**搜索相关快捷键**
**Alt + F7/Ctrl + F7**： Find usages/Find usages in file 找到使用/在文件找到使用
**Ctrl + Shift + F7**： Highlight usages in file文件中精彩使用
**Ctrl + Alt + F7**： Show usages 显示使用

- ### Running**运行**
**Alt + Shift + F10**： Select configuration and run 选择构架，运行
**Alt + Shift + F9**： Select configuration and debug 选择构架，修补漏洞
**Shift + F10**： Run 运行
**Shift + F9**： Debug 修补漏洞
**Ctrl + Shift + F10**： Run context configuration from editor 从编辑运行内容构架
**Ctrl + Shift + X**： Run command line 运行命令行

- ### Debugging **Debugging相关快捷键**
**F8**： Step over 不进入函数
**F7**： Step into 单步执行
**Shift + F7**： Smart step into 智能单步执行
**Shift + F8**： Step out 跳出
**Alt + F9**： Run to cursor 运行到光标处
**Alt+ F8**： Evaluate expression 评估表达
**F9**： Resume program 重新开始程序
**Ctrl + F8**： Toggle breakpoint 切换断点
**Ctrl + Shift + F8**: View breakpoints 查看断点

- ### Navigation **定位相关快捷键**
**Ctrl + N**: Go to class跳转到指定类
**Ctrl + Shift + N**: Go to file 通过文件名快速查找工程内的文件
**Ctrl + Alt + Shift + N**: Go to symbol 通过一个字符查找函数位置
**Alt + Right / left**: Go to next/ previous editor tab 进入下一个/ 上一个编辑器选项卡
**F12**： Go back to previous tool window 进入上一个工具窗口
**Esc**： Go to editor（from tool window） 从工具窗口进入编辑器
**Shift + Esc**： Hide active or last active window 隐藏活动窗口
**Ctrl + Shift + F4**： Close active run/message/find/…tab 关闭活动….标签
**Ctrl + G**： Go to line 跳转到第几行
**Ctrl + E**： Recent files popup 弹出最近打开的文件
**Ctrl + Alt + Left/Right**： Navigate back/forward 导航前进/后退
**Ctrl + Shift + Backspace**： Navigate to last edit location 向最近编辑定位导航
**Alt + F1**： Select current file or symbol in any view 查找当前选中的代码或文件在其他界面模块的位置
**Ctrl + B or Ctrl + Click**： Go to declaration跳转到定义处
**Ctrl + Alt + B**： Go to implementation(s) 跳转方法实现处
**Ctrl + Shift + B**： Go to type declaration 跳转方法定义处
**Ctrl + Shift + I**： Open quick definition lookup 打开定义快速查找
**Ctrl + U**： Go to super-method/super-class 跳转方法/超阶级
**Alt + Up/Down**： Go to previous/next method 在方法间快速移动定位
**Ctrl + ]/[**： Move to code block end/start 跳转到编码块结束/开始
**Ctrl + F12**： File structure popup 文件结构弹出
**Ctrl + H**： Type hierarchy 类型层次
**Ctrl + Alt + H**： Call hierarchy 调用层次结构
**F2/ Shift + F2**： Next/previous highlighted error 跳转到后一个/前一个错误，高亮错误或警告快速定位，使用这个快捷键可以快捷在出错的语句之间进行跳转。
**F4/Ctrl + Enter**： Edit source/ View source 编辑源代码/查看源代码
**Alt + Home**： Show navigation bar 显示导航栏
**F11**： Toggle bookmark 切换标记
**Ctrl + F11**： Toggle bookmark with mnemonic 采用记忆切换标记
**Ctrl + #[0-9]**： Go to numbered bookmark 跳转到带编号的标记
**Shift + F11**： Show bookmark 显示标记

- ### Refactoring **重构相关快捷键**
**F5**： Copy 拷贝
**F6**： Move 移动
**Alt + Delete**： Safe Delete 安全删除
**Shift + F6**： Rename 重新命名
**Ctrl + Alt + N**： Inline Variable 嵌入变量
**Ctrl + Alt + M**：Extract Method( Javascript only) 提取函数
**Ctrl + Alt + V**： Introduce Variable 引入变量
**Ctrl + Alt + F**： Introduce Field 引入域
**Ctrl + Alt + C**： Introduce Constant 引入常量

- ### VCS/Local History **版本控制系统/ 本地历史相关快捷键**
**Alt +　BackQuote( )**： ‘VCS’quick popup 快速弹出 VCS
**Ctrl + K**： Commit project to VCS 提交项目至VCS
**Ctrl + T**： Update project from VCS 从VCS 更新项目
**Alt + Shift + C**： View recent changes 查看最新改变

- ### General **常用的相关快捷键**
**Ctrl + Shift + A**： Find action 查找并调用编辑器的功能
**Alt + #[0-9]**： Open corresponding tool window 快速切换打开界面模块
**Ctrl + Alt + F11**： Toggle full screen mode 切换全屏模式
**Ctrl + Shift + F12**： Toggle maximizing editor 切换最大化编辑器
**Alt + Shift + F**： Add to Favorites 将当前文件添至收藏夹
**Alt + Shift + I**： Inspect current file with current profile 使用当前属性检查当前文件
**Ctrl + BackQuote( )**： Quick switch current scheme 快速转换现有组合
**Ctrl + Alt + S**： Open setting dialog 打开设置对话框
**Ctrl + Tab**：Switch between tabs and tool window 标签和工具窗的转换（与windows快捷键冲突）