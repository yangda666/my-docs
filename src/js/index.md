---
title: 你不知道的javaScript
icon: business
order: 2
category:
  - js
---

# 你不知道的 javaScript

## 第一章 作用域和闭包

### 1.1 作用域

- 编译原理

  - 分词/词法分析
    这是编译过程的第一步。分词器（词法分析器）会将源代码的字符流分解成有意义的记号（tokens）。这些记号是代码的最小单位，比如关键字、变量名、运算符、标点符号等。
    例如，对于代码 var a = 5;，分词器可能会生成以下记号：var、a、=、5、;。

  - 解析/语法分析
    在分词之后，解析器会将记号流转换成抽象语法树（AST）。AST 是代码的结构化表示，包含了代码的语法结构和语义信息。
    例如，对于代码 var a = 5;，解析器可能会生成以下 AST：

    ```
    {
      type: 'VariableDeclaration',
      name: 'a',
      value: {
        type: 'Literal',
        value: 5
      }
    }
    ```

  - 代码生成

    最后，编译器会将 AST 转换成可执行的代码。这个过程会根据不同的目标平台（如浏览器、Node.js）生成特定的代码。
    例如，对于代码 var a = 5;，编译器可能会生成以下代码：

    ```
    var a = 5;
    ```

- 执行上下文

  - 执行上下文是 JavaScript 执行代码时的环境。它包含了变量、函数、作用域等信息，决定了代码的执行顺序和行为。

  - 执行上下文的类型

    - 全局执行上下文
    - 函数执行上下文
    - 块级执行上下文

  - 全局执行上下文是默认的执行上下文，当 JavaScript 代码在全局范围内执行时，就会创建全局执行上下文。
  - 函数执行上下文是在函数调用时创建的，每个函数调用都会创建一个新的执行上下文。
  - 块级执行上下文是在块级作用域中创建的，每个块级作用域都会创建一个新的执行上下文。

  - 执行上下文栈

    - 执行上下文栈是 JavaScript 执行代码时的栈结构。它用于管理执行上下文，决定了代码的执行顺序和行为。
    - 执行上下文栈的栈顶是当前正在执行的执行上下文，栈底是全局执行上下文。

  - 执行上下文的生命周期

    - 执行上下文的生命周期分为创建阶段、执行阶段和销毁阶段。
    - 创建阶段是执行上下文创建时的阶段，包括变量、函数、作用域等信息。
    - 执行阶段是执行上下文执行时的阶段，包括代码的执行顺序和行为。
    - 销毁阶段是执行上下文销毁时的阶段，包括变量、函数、作用域等信息。

### 1.2 闭包

闭包是 JavaScript 中一个重要的概念，它指的是一个函数可以“记住”并访问其词法作用域，即使在其外部被调用时。闭包允许函数访问外部函数的变量，即使外部函数已经执行完毕。

#### 闭包的特点

1. **保持对外部变量的引用**：闭包可以访问其外部函数的变量，即使外部函数已经返回。
2. **私有变量**：通过闭包，可以创建私有变量，这些变量只能通过闭包内部的函数访问。
3. **函数工厂**：闭包可以用于创建函数工厂，即根据不同的参数生成不同的函数。

#### 示例

以下是一个简单的闭包示例：

- 保持对外部变量的引用

```javascript
function createCounter(num) {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 输出: 1
console.log(counter()); // 输出: 2
```

- 私有变量

```javascript
function createPerson(name) {
  let age = 0;
  return {
    name: name,
    grow: function () {
      age++;
    },
  };
}

const person = createPerson("John");
person.grow();
console.log(person.age); // 输出: 1
```

- 函数工厂

```javascript
function createCounter(num) {
  return function (inner) {
    return num + inner;
  };
}

const counter1 = createCounter(1);
const counter2 = createCounter(2);
console.log(counter1(1)); // 输出: 2
console.log(counter2(1)); // 输出: 3
```

### 1.3 提升

提升是 JavaScript 中一个重要的概念，它指的是变量和函数在编译阶段被提升到其作用域的顶部。提升允许我们在声明之前使用变量和函数。

#### 提升的特点

1. **变量提升**：变量在声明之前可以被访问，其值为 `undefined`。
2. **函数提升**：函数在声明之前可以被调用。
3. **重复声明**：重复声明同一个变量或函数，后面的声明会覆盖前面的声明。

- 变量提升

```javascript
console.log(a); // 输出: undefined
var a = 1;
```

- 函数提升

```javascript
console.log(add(1, 2)); // 输出: 3
function add(a, b) {
  return a + b;
}
```

- 重复声明

  - 同变量名

  ```javascript
  var a = 1;
  var a = 2;
  console.log(a); // 输出: 2
  ```

  - 同函数名

  ```javascript
  function add(a, b) {
    return a + b;
  }

  function add(a, b) {
    return a + b + 1;
  }

  console.log(add(1, 2)); // 输出: 4
  ```

  - 函数与变量同名

  ```javascript
  var a = 1;
  function a() {
    return 2;
  }

  console.log(a()); // 输出: 1
  ```

### 1.4 作用域链

作用域链是 JavaScript 中一个重要的概念，它指的是变量和函数在作用域中的链式关系。作用域链决定了变量和函数在作用域中的访问顺序。

#### 作用域链的特点

1. **嵌套作用域**：作用域可以嵌套，形成链式关系。
2. **变量查找顺序**：作用域链决定了变量和函数在作用域中的查找顺序。
3. **执行上下文**：作用域链决定了执行上下文在作用域中的查找顺序。

#### 作用域链的示例

```javascript
function createCounter(num) {
  return function (inner) {
    return num + inner;
  };
}
```
