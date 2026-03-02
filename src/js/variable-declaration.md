---
title: "变量声明 相关"
icon: "javascript"
order: 2
headerDepth: 2
---

# var let const 的区别

- 变量声明
  `var` 可以重复声明相同的变量
  `let` 相同作用域中不能重复声明
  `const` 相同作用域中不能重复声明

- 作用域
  `var` 函数作用域
  `let` 块级作用域
  `const` 块级作用域

- 变量提升
  在变量声明前是否可以使用
  `var` 会有变量提升
  `let` 变量不会提升
  `const` 变量不会提升

- 全局变量是否会挂在 window 中
  `var` 声明的全局变量会挂在window中
  `let` 声明的全局变量不会挂在window中
  `const` 声明的全局变量不会挂在window中

- 声明变量是否需要初始化
  `var` 声明的变量时不需要初始化
  `let` 声明的变量时不需要初始化
  `const` 声明的变量时必须初始化

- 变量的引用是否可以被修改
  `var` 可以修改
  `let` 可以修改
  `const` 不可以修改
