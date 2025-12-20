---
title: webpack 实战：从零搭一个项目
icon: reactDiff
headerDepth: 1
order: 4
category:
  - webpack
---

### 1. 初始化项目

- 新建项目目录
- `pnpm init` / `npm init -y`
- 约定目录结构：
  - `src/index.js`
  - `src/styles/index.css`
  - `public/index.html`

### 2. 安装基础依赖

- **打包相关**
  - `webpack`
  - `webpack-cli`
  - `webpack-dev-server`
- **开发辅助**
  - `cross-env`

### 3. 编写基础配置

- 新建 `webpack.config.js`
- 配置：
  - `entry`
  - `output`
  - `mode`
  - `devtool`
  - `devServer`

### 4. 加入 Loader 支持

- 处理 JS（含 ES6+）
- 处理 CSS / Less / Sass
- 处理图片 / 字体等资源

### 5. 加入常用 Plugin

- 自动生成 HTML：`HtmlWebpackPlugin`
- 抽离 CSS：`MiniCssExtractPlugin`
- 清理 dist：`CleanWebpackPlugin` 或 `output.clean`

### 6. 拆分开发 / 生产配置（进阶）

- 新建：
  - `webpack.common.js`
  - `webpack.dev.js`
  - `webpack.prod.js`
- 使用 `webpack-merge`

### 7. 小项目实战建议

- 搭一个简单的 SPA（例如 TodoList）
- 逐步加入：
  - 路由
  - 状态管理
  - 代码分割
