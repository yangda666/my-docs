---
title: webpack 进阶与性能优化
icon: reactDiff
headerDepth: 1
order: 2
category:
  - webpack
---

## webpack 进阶与性能优化

### 1. 构建速度优化

- **多进程 / 多实例**
  - `thread-loader`
  - `fork-ts-checker-webpack-plugin`
- **缓存**
  - `cache` 选项
  - `babel-loader` 缓存
- **合理的 Source Map 配置**

### 2. 打包体积优化

- **Tree Shaking**
- **Code Splitting（代码分割）**
  - `splitChunks`
  - 动态 `import()`
- **压缩与丑化**
  - `TerserPlugin`
  - CSS 压缩

### 3. 生产环境最佳实践

- **区分开发 / 生产配置**
  - `webpack-merge`
  - 单独的 `webpack.dev.js` / `webpack.prod.js`
- **长效缓存**
  - `contenthash`
  - 资源命名策略
- **静态资源部署与 CDN**

### 4. 构建问题排查

- **分析打包结果**
  - `webpack-bundle-analyzer`
- **常见坑记录**
  - 路径问题
  - loader / plugin 冲突

### 5. 小结

- 进阶配置使用场景
- 性能优化 checklist
