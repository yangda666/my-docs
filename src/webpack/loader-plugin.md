---
title: Loader 与 Plugin 详解
icon: reactDiff
headerDepth: 1
order: 3
category:
  - webpack
---

### 1. Loader

- **概念**
  - 本质是一个函数，接收源文件，返回处理后的内容
- **使用方式**
  - 在 `module.rules` 中配置
- **常见 Loader 分类**
  - 处理 JS：`babel-loader`, `ts-loader`
  - 处理样式：`css-loader`, `style-loader`, `less-loader`, `sass-loader`, `postcss-loader`
  - 处理资源：`file-loader`, `url-loader`, Asset Modules
  - 其他：`vue-loader`, `eslint-loader`（已不推荐）

### 2. Plugin

- **概念**
  - 插件通过钩子机制参与 webpack 整个编译生命周期
- **使用方式**
  - 在 `plugins` 数组中实例化
- **常见 Plugin**
  - `HtmlWebpackPlugin`
  - `DefinePlugin`
  - `MiniCssExtractPlugin`
  - `CopyWebpackPlugin`
  - `CleanWebpackPlugin` / `output.clean`

### 3. Loader 与 Plugin 的区别与使用场景

- **Loader**
  - 关注处理某一类资源文件
- **Plugin**
  - 关注打包过程中的某个阶段或整体能力增强

### 4. 自定义 Loader / Plugin（预留）

- 自定义 Loader 思路
- 自定义 Plugin 的基本结构
