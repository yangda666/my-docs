---
title: webpack 基础入门
icon: reactDiff
order: 1
category:
  - webpack
---

### 1. webpack 是什么？

webpack 是一个开源的 js 模块打包工具，其核心的功能是解决模块间的依赖，把各个模块按照特定的规则和顺序组织在一起，最终合并为一个 js 文件， 这个过程叫做模块打包。

- **解决的问题**
  - js 模块间的依赖
  - 模块化打包（JS、CSS、图片等静态资源）
  - 处理浏览器兼容、代码拆分、按需加载
- **和其他构建工具对比（简单了解即可）**
  - vite
  - rollup
  - parcel

### 2. 什么是模块

js 以前没有模块的概念， 当时开发时的问题

- **依赖关系不明确** 需要手动维护 js 的加载顺序 页面中多个 script 的依赖关系是隐式的，很难发现是谁依赖了谁，
- **变量污染** script 中的 定义的变量挂在全局中，污染全局对象，容易产生命名冲突。
- **服务器资源浪费** 会触发多个脚本资源的请求，没有 http2 时链接成本时比较高的

模块化后的优势

- **依赖关系明确** 通过导入与导出我们可以清楚的知道模块间的依赖关系
- **变量作用域** 模块间的作用域隔离，变量会自动被定义在模块作用域中，不会污染全局对象。
- **服务器资源浪费** 我们可以通过构建工具将多个模块合并为一个资源，从而减少服务器的资源开销。

### 2. 核心概念

- **Entry（入口）**
- **Output（输出）**
- **Loader**
- **Plugin**
- **Mode（development / production）**
- **Devtool（source map）**

### 3. 从零搭建最小 webpack 项目

- **初始化项目**
  - `npm init -y` / `pnpm init`
- **安装依赖**
  - `webpack`
  - `webpack-cli`
- **编写最小配置文件**
  - `webpack.config.js`
  - 指定 `entry` / `output`
- **运行打包**
  - 在 `package.json` 中添加 script

### 4. 常用 Loader 简介（占个位，后续可展开）

- 处理 JS：`babel-loader`
- 处理 CSS：`css-loader`、`style-loader`、`sass-loader`
- 处理资源文件：`url-loader`、`file-loader`、Asset Modules

### 5. 小结

- webpack 解决了什么问题
- 基本打包流程回顾
