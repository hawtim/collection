# 爱乡宝技术选型及基础建设

爱乡宝项目是一个

## 前端框架

本次前端框架的考虑还是从团队成员技术栈考虑，结合平台的业务积累，采用 `vue2.6.10` + `vue-cli2.9.6`

## UI 框架的选型

UI框架采用了有赞团队出品的 `vantUI`， 有 `h5` 版本和 `weapp` 小程序版本，两个版本提供了一个统一 `UI` 视觉和基本 90% 同步的 `api` 方法，（小程序版本的 `api` 会更多一点，因为兼容性的问题， `weapp` 的使用上复杂得多）

## 两套脚手架

webpack3 + H5 + weapp

脚手架目录

### H5（vue-cli）

```bash
buildH5
configH5
main.js
```

### Weapp(mpvue-cli)

```bash
build
config
main.js
```

## 构建脚本

脚本配置

```json
"scripts": {
    // 小程序构建命令
    "dev": "cross-env-shell NODE_ENV=development MODE=miniapp node build/dev-server.js",
    "start": "cross-env-shell NODE_ENV=development MODE=miniapp node build/dev-server.js",
    "build": "cross-env-shell NODE_ENV=production MODE=miniapp node build/build.js",
    // H5 构建命令
    "devH5": "cross-env-shell NODE_ENV=development MODE=H5 webpack-dev-server --inline --progress --config buildH5/webpack.devH5.conf.js",
    "testH5": "cross-env-shell NODE_ENV=testing MODE=H5 env_config=test node buildH5/build.js",
    "buildH5": "cross-env-shell NODE_ENV=production env_config=prod MODE=H5 node buildH5/build.js",
    // 全部跑起来~
    "all": "yarn dev && yarn devH5",
},
```

## 构建集成

### 代码规范

代码格式化采用 `prettier` & `js-beautify` & `vetur` 结合 `editorconfig` 完成代码的自动格式化

```json
{
  "prettier.semi": false,
  "prettier.useTabs": false,
  "prettier.singleQuote": true,
  "html.format.endWithNewline": true,
  "html.format.indentInnerHtml": true,
  "html.format.indentHandlebars": true,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "auto"
    },
    "prettyhtml": {
      "printWidth": 100,
      "singleQuote": true,
      "wrapAttributes": false,
      "sortAttributes": false
    }
  }
}
```

`prettier.config.js`

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

`.editorconfig`

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

### 代码质量校验

采用 `eslint` 和 `stylelint` 来约束代码风格

运行脚本
```json
"script": {
    "lint": "yarn lint:js && yarn lint:css && yarn lint:assets",
    "lint:js": "cross-env-shell NODE_ENV=development eslint --fix --ext .js,.vue src",
    "lint:css": "stylelint src/**/*.vue src/**/*.less --fix",
    "lint:assets": "stylelint src/assets/css/*.scss --custom-syntax ./node_modules/postcss-scss --fix",
}
```

特色介绍下 `eslint` 和 `stylelint` 的配置项

**`eslint`**

```js
// webpack resolve 设置
settings: {
  'import/resolver': {
    webpack: {
      config: './buildH5/webpack.baseH5.conf.js',
    }
  }
}
```

这个是用来解析 `webpack` 里的定义好的路径解析

```js
resolve: {
  extensions: ['.js', '.vue', 'less', '.css', '.json', '.html'],
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    'flyio': 'flyio/dist/npm/fly',
    'wx':  resolve('src/utils/wx'),
    '@root': resolve('/')
  }
},
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

**`stylelint`**

`stylelint.config.js` 通过 `order/properties-order` 属性来设置 `css` 属性的先后顺序和排序

```js
"rules": {
  "at-rule-no-unknown": [
    true,
    {
    "ignoreAtRules": ["function", "if", "each", "include", "mixin"]
    }
  ],
  "order/order": [
    "declarations",
    "custom-properties",
    "dollar-variables",
    "rules",
    "at-rules"
  ],
  // 调整属性优先级，Andy Ford "Order of the Day: CSS Properties"
  "order/properties-order": [
    {
      groundName: "Display & Flow",
      emptyLineBefore: "never",
      properties: [
        "display",
        "visibility",
        "float",
        "clear",
      ]
    },
    {
      groundName: "Positioning",
      emptyLineBefore: "never",
      properties: [
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "z-index",
        "transform",
      ]
    },
    {
      // ...
    }
  ]
}
```

`postcss` 的插件

我们或多或少都听过， `postcss` 里面有一个插件 `autoprefixer` 用来自动补全 `css` 浏览器前缀

对于构建小程序，可以使用 `postcss-mpvue-wxss` 插件

```js
const options = {
  cleanSelector: ['*'],
  remToRpx: 75, // 基准 fontSize， 例如 2rem -> 75rpx
  replaceTagSelector: Object.assign(replaceTagSelectorMap, {
    '*': 'view, text' // 将覆盖前面的 * 选择器被清理规则
  })
}
let plugins = {}
if (process.env.MODE == 'miniapp') {
  plugins = {
    "postcss-mpvue-wxss": options,
    "postcss-import": {},
    "postcss-url": {}
  }
}
```

对于 `H5` 开发，我们常规的工作流是结合 `蓝湖` 一起使用，但蓝湖不提供 `rem` 单位的，每次需要我们去手动转。虽然有 `vscode` 插件，也有批量一键替换，但还是要找一个构建时处理的工具，那样会最爽
所以 `postcss-pxtorem` 解决了问题，直接 `蓝湖` 粘过来样式代码，最后 `yarn lint` 一下，代码提交。

```js
if (process.env.MODE == 'H5') {
  plugins = {
    "postcss-import": {},
    "postcss-url": {},
    "autoprefixer": {
      browsers: ['last 2 versions', 'iOS >= 7', "Android >= 4.1"]
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      selectorBlackList: [], // 忽略转换正则匹配项
      propList: ['*']
    }
  }
}
```

### 项目文档及注释规范

选用 `vuepress` 来实行文档的可持续集成
选用 `commitizen` 来约束 `git` 提交规范，有利于直接生成 `changelog`

```json
"commit": "git-cz",
"release": "standard-version",
"docs:dev": "vuepress dev docs",
"docs:build": "vuepress build docs "
```

### 项目构建集成遇到的坑

`lint-staged` 用来校验暂存区的代码的是否符合规范，避免全量检查，结合 `husky` 的 `git hook` 实现代码提交时校验
但是会出现一旦校验的文件较多并且错误较多时，会导致文件修改内容丢失的问题。

如果你问我，其他场景遇到这种情况怎么办？

我是这么解决的， `vscode` 在编辑的时候会生成缓存文件，所以当你按下 `ctrl + z` 的时候，你可以回到丢失之前的状态。
前提是你没关闭编辑器。

## Q&A

## 其他分享主题

### 基于 vant 的 H5 和 小程序同构

### 基于 `vant` 组件的二次封装及 vuepress 的文档同步

### 爱乡宝 pwa 实践 & 装饰器

### 爱乡宝前端监控和前端埋点

包括前端埋点和上报、数据处理和数据分析、性能分析、异常监控、
