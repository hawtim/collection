# 爱乡宝技术选型及基础建设

爱乡宝项目是一个

## 前端框架

本次前端框架的考虑还是从团队成员技术栈考虑，结合平台的业务积累，采用 vue2.0 + vue-cli2.9.6

## UI 框架的选型

UI框架采用了有赞团队出品的 VantUI， 有 h5 版本和 weapp 小程序版本，两个版本提供了一个统一 UI 视觉和基本 90% 同步的 api 方法，（小程序版本的 api 会更多一点，因为兼容性的问题，weapp 的使用上复杂得多）

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

### 代码质量校验

采用 `eslint` 和 `stylelint` 来约束代码风格

```json
"script": {
    "lint": "yarn lint:js && yarn lint:css && yarn lint:assets",
    "lint:js": "cross-env-shell NODE_ENV=development eslint --fix --ext .js,.vue src",
    "lint:css": "stylelint src/**/*.vue src/**/*.less --fix",
    "lint:assets": "stylelint src/assets/css/*.scss --custom-syntax ./node_modules/postcss-scss --fix",
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

`lint-stage` 用来校验暂存区的代码的是否符合规范，结合 `husky` 的 `git hook` 实现代码提交时校验
但是会出现一旦校验的文件较多并且错误较多时，会导致文件修改内容丢失的问题。

如果丢失了
