---
marp: true
title: 爱乡宝项目前端技术分享
theme: default
paginate: true
_paginate: false
---

爱乡宝项目前端技术分享
===
技术选型及基础建设 :building_construction:

---

关于爱乡宝
===

爱乡宝项目是一个

---

前端框架
===

本次前端框架的考虑还是从团队成员技术栈考虑
结合平台的业务积累
基于 `vue-cli@2.9.6` 后期 vue 版本升级到 `vue@2.6.10`

---

UI 框架
===

UI 框架采用了有赞团队出品的 `vantUI`
有 `h5` 版本和 `weapp` 小程序版本
两个版本提供了一个统一 `UI` 视觉和基本 90% 同步的 `api` 方法，
（小程序版本的 `api` 会更多一点，需要兼容， `weapp` 的使用上复杂得多）

---

两套脚手架
===

webpack3 + h5 + weapp 脚手架关键目录

H5(vue-cli)

```bash
aixiang160
├─front           # 前端目录
   ├─buildH5      # webpack 打包
   ├─configH5     # webpack 配置
   ├─mainH5.js    # 入口文件
```

weapp(mpvue-cli)

```bash
aixiang160
├─front         # 前端目录
   ├─build      # webpack 打包
   ├─config     # webpack 配置
   ├─main.js    # 入口文件
```

---

构建脚本
===

脚本配置， `ces` 为 `cross-env-shell`, `wds` 为 `webpack-dev-server`

```json
"scripts": {
  // 小程序构建命令
  "dev": "ces NODE_ENV=development MODE=miniapp node build/dev-server.js",
  "start": "yarn dev",
  "build": "ces NODE_ENV=production MODE=miniapp node build/build.js",
  // H5 构建命令
  "devH5": "ces NODE_ENV=development MODE=H5 wds buildH5/webpack.devH5.conf.js",
  "testH5": "ces NODE_ENV=testing MODE=H5 env_config=test node buildH5/build.js",
  "buildH5": "ces NODE_ENV=production MODE=H5 env_config=prod node buildH5/build.js",
  // 全部跑起来~
  "all": "yarn dev && yarn devH5",
},
```

---

代码规范
===

代码格式化采用 `prettier` & `js-beautify` & `vetur` 结合 `editorconfig` 完成代码的自动格式化

```json
{
  "prettier.semi": false,
  "prettier.useTabs": false,
  "prettier.singleQuote": true,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "auto"
    }
    // ...
  }
}
```

---

`prettier.config.js`
===

```js
// prettier.config.js or .prettierrc.js
module.exports = {
  trailingComma: "es5", // 如果使用 all 选项需要 node 8
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  bracketSpacing: false,
}
```

---

`.editorconfig`
===

```.editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

---

代码质量校验
===

采用 `eslint` 和 `stylelint` 来约束代码风格，使用 `postcss` 来处理构建 `css` 的过程

---

`ESLint`
===

`ESLint` 最初是由 Nicholas C. Zakas 于2013年6月创建的开源项目。它的目标是提供一个插件化的 `javascript` 代码检测工具。

---

`Stylelint`
===

`Stylelint` 是现代的 CSS 校验工具，可以帮助您避免错误并在您的样式中强制执行约定。

- 最新的 `CSS` 语法，包括自定义属性和 `CSS4`
- 从 `HTML`， `markdown` 和 `CSS-in-JS` 对象和模板文字中提取嵌入式样式
- 解析类似 `CSS` 的语法，如 `SCSS`，`Sass`，`Less` 和 `SugarSS`
- 超过 `170` 条内置规则来捕获错误，限制并强制执行风格约定
- 支持插件，支持可共享的配置, 自动修复一些违规行为

---

`PostCSS`
===

`postcss` 是一个用 `JavaScript` 工具和插件转换 `CSS` 代码的工具

---

**`eslint的配置`**
===

```js
settings: {
  'import/resolver': { // webpack resolve 设置
    webpack: { config: './buildH5/webpack.baseH5.conf.js', }
  }
}
```

这个是用来解析 `webpack` 里的定义好的路径解析

```js
resolve: {
  extensions: ['.js', '.vue', 'less', '.css', '.json', '.html'],
  alias: {
    '@': resolve('src'),
    'vue$': 'vue/dist/vue.esm.js',
    'flyio': 'flyio/dist/npm/fly',
    'wx':  resolve('src/utils/wx'),
  }
}
```

---

常见的规则定义
===

```js
rules: {
  // no useless spaces
  "no-multi-spaces": 1,
  // allow debugger during development
  'no-debugger': nodeEnv == 'production' ? 2 : 0,
  'no-console': nodeEnv == 'production' ? 2 : 0,
  'no-new': 0,
  'global-require': 0,
  'import/no-extraneous-dependencies': 0,
  'import/no-unresolved': 0,
  'import/no-mutable-exports': 0,
  'prefer-destructuring': 0,
  'camelcase': 0,
  // 'no-unused-vars': 0,
  'no-shadow': 0,
  'no-param-reassign': 0,
  'consistent-return': 0,
  'default-case': 0,
  'no-unused-expressions': 0,
  'eqeqeq': 0
},
```

---

**`stylelint的配置`**
===

`stylelint.config.js` 通过 `order/properties-order` 属性来设置 `css` 属性的先后顺序和排序

```js
"rules": {
  "order/order": [ "declarations", "custom-properties", "dollar-variables", "rules", "at-rules" ],
  // 自定义调整属性优先级，Andy Ford "Order of the Day: CSS Properties"
  "order/properties-order": [
    {
      groundName: "Display & Flow",
      emptyLineBefore: "never",
      properties: [ "display", "visibility", "float", "clear", ]
    },
    {
      groundName: "Positioning",
      emptyLineBefore: "never",
      properties: [ "position", "top", "right", "bottom", "left", "z-index", "transform", ]
    },
    {
      // ...
    }
  ]
}
```

---

运行脚本
===

```json
"script": {
    "lint": "yarn lint:js && yarn lint:css && yarn lint:assets",
    // 校验及修复 js
    "lint:js": "eslint --fix --ext .js,.vue src",
    // 校验及修复 css
    "lint:css": "stylelint src/**/*.vue src/**/*.less --fix",
    // 校验公共的 scss
    "lint:assets": "stylelint src/**/*.scss --custom-syntax postcss-scss --fix",
}
```

---

`PostCSS` 的插件
===

我们或多或少都听过，`PostCSS` 里面有一个插件 `autoprefixer` 用来自动补全 `css` 浏览器前缀

---

构建小程序
===

使用 `postcss-mpvue-wxss` 插件

```js
const options = {
  cleanSelector: ['*'],
  remToRpx: 75, // 基准 fontSize， 例如 2rem -> 75rpx
  replaceTagSelector: Object.assign(replaceTagSelectorMap, {
    '*': 'view, text' // 将覆盖前面的 * 选择器被清理规则
  })
}
const plugin = {
  "postcss-mpvue-wxss": options,
  "postcss-import": {},
  "postcss-url": {}
}
```
---

`H5` 开发
===

平时我们使用 `蓝湖`，但蓝湖不提供 `rem` 单位

- `vscode` 插件/批量一键替换

解决方案:
- `postcss-pxtorem` => `copy from 蓝湖` => `yarn lint` => `code commit`

```js
plugins = {
  'postcss-pxtorem': {
    rootValue: 37.5,
    selectorBlackList: [], // 忽略转换正则匹配项
    propList: ['*']
  }
}
```

---

项目文档及注释规范
===

选用 `vuepress` 来实行文档的可持续集成
选用 `commitizen` 来约束 `git` 提交规范，有利于直接生成 `changelog`

```json
"commit": "git-cz",
"release": "standard-version",
"docs:dev": "vuepress dev docs",
"docs:build": "vuepress build docs "
```

---

项目构建集成遇到的坑 :hole:
===

`lint-staged` 用来校验暂存区的代码的是否符合规范，避免全量检查，结合 `husky` 的 `git hook` 实现代码提交时校验

实践发现：一旦校验的文件较多并且错误较多时，会导致暂存区文件修改内容丢失。

那么，其他场景遇到这种情况怎么办？

我是这么解决的， `vscode` 在编辑的时候会生成缓存文件，所以当你按下 `ctrl + z` 的时候，你可以回到丢失之前的状态。

前提是你没关闭编辑器。

---

Q&A :question:
===

---

## 其他分享主题 :thinking:

### 基于 vant 的 H5 和 小程序同构
:man_technologist:

### 基于 vant 的二次封装及 vuepress 的文档同步
:arrows_counterclockwise:

### 爱乡宝前端监控和前端埋点
:footprints:


---

参考文献 :blue_book:
===

[使用ESLint+Prettier来统一前端代码风格](https://juejin.im/post/5b27a326e51d45588a7dac57)
[使用 postcss-pxtorem px 转 rem](https://www.cnblogs.com/gr07/p/10333147.html)
[VuePress搭建指南](https://fangzheng.xyz/Other/VuePress/1.vuepress-auto-sidebar.html#%E4%BB%8B%E7%BB%8D)

---

## 致谢 :heart: 160FE
