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

## 第二章 this 全面解析

### 什么是 this

this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。当一个函数被调用时，会创建一个执行上下文 。这个执行上下文会包含函数在哪里被调用（调用栈） 、函数的调用方法、传入的参数等信息。this 就是记录的其中一个属性，会在函数执行的过程中用到。

### 为什么需要 this

```javascript
function identify() {
  return this.name.toUpperCase();
}
function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}
var me = {
  name: "Kyle",
};
var you = {
  name: "Reader",
};
identify.call(me); // KYLE
identify.call(you); // READER
speak.call(me); // Hello, 我是KYLE
speak.call(you); // Hello, 我是 READER
```

这段代码可以在不同的上下文对象（me 和 you）中重复使用函数 identify() 和 speak()，不用针对每个对象编写不同版本的函数。

### 我们对 this 的误解

- 误解一：人们很容易把 this 理解成指向函数自身

```javascript
function foo(num) {
  console.log("foo: " + num);
  // 记录foo被调用的次数
  this.count++;
}
foo.count = 0;
var i;
for (i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// foo被调用了多少次？
console.log(foo.count); // 0
```

输出的结果为 0 为什么？
console.log 语句产生了 4 条输出，证明 foo(..) 确实被调用了 4 次，但是 foo.count 仍然是 0。显然从字面意思来理解 this 是错误的执行 foo.count = 0 时，的确向函数对象 foo 添加了一个属性 count。但是函数内部代码 this.count 中的 this 并不是指向那个函数对象，所以虽然属性名相同，根对象却并不相同，困惑随之产生。

- 误解二：人们很容易把 this 的作用域指向函数

```javascript
function foo() {
  var a = 2;
  this.bar();
}
function bar() {
  console.log(this.a);
}
foo(); // ReferenceError: a is not defined
```

这段代码非常完美（同时也令人伤感）地展示了 this 多么容易误导人。
首先，这段代码试图通过 this.bar() 来引用 bar() 函数。这是绝对不可能成功的。调用 bar() 最自然的方法是省略前面的 this，直接使用词法引用标识符。

### this 的全面解析

- 调用位置

  在理解 this 的绑定过程之前，首先要理解调用位置：调用位置就是函数在代码中被调用的位置（而不是声明的位置） 。只有仔细分析调用位置才能回答这个问题：这个 this 到底引用的是什么？

  通常来说，寻找调用位置就是寻找“函数被调用的位置”，是我们关心的，调用位置就在当前正在执行的函数的前一个调用中。

- 绑定规则

  - 默认绑定

    独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则。

    ```javascript
    function foo() {
      console.log(this.a);
    }
    var a = 2;
    foo(); // 2
    ```

  - 隐式绑定

    调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含

    ```javascript
    function foo(){
      console.log(this.a);
    }
    var obj = {
      a: 2;
      foo: foo
    };
    obj.foo(); // 2
    ```

    首先需要注意的是 foo() 的声明方式，及其之后是如何被当作引用属性添加到 obj 中的。但是无论是直接在 obj 中定义还是先定义再添加为引用属性，这个函数严格来说都不属于 obj 对象。

    然而，调用位置会使用 obj 上下文来引用函数，因此你可以说函数被调用时 obj 对象“拥有”或者“包含”它。

    无论你如何称呼这个模式，当 foo() 被调用时，它的落脚点确实指向 obj 对象。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。因为调用 foo() 时 this 被绑定到 obj，因此 this.a 和 obj.a 是一样的。

    <b>对象属性引用链中只有最顶层或者说最后一层会影响调用位置</b> 例如

    ```javascript
    function foo(){
      console.log(this.a);
    }
    var obj1 = {
      a: 42;
      foo: foo
    }
    var obj = {
      a: 2;
      obj1: obj1
    };

    obj.obj1.foo(); // 42
    ```

    <b>隐式丢失</b>

    ```javascript
    function foo(){
      console.log(this.a);
    }

    var obj = {
      a: 2;
      foo: foo
    };

    var bar = obj.foo;

    var a = "oop, global";

    bar(); // oop, global
    ```

    虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的

    bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

    <b>参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值</b>

    ```javascript
    function foo() {
      console.log(this.a);
    }

    function doFoo(fn) {
      // fn其实引用的是foo
      fn(); // <-- 调用位置！
    }

    var obj = {
      a: 2,
      foo: foo,
    };

    var a = "oops, global"; // a是全局对象的属性
    doFoo(obj.foo); // "oops, global"
    ```

  - 显式绑定

    `call`, `apply`,在 JavaScript 提供的绝大多数函数以及你自己创建的所有函数都可以使用 call(..) 和 apply(..) 方法。它们的第一个参数是一个对象，它们会把这个对象绑定到 this，接着在调用函数时指定这个 this。因为你可以直接指定 this 的绑定对象。

    ```javascript
    function foo() {
      console.log(this.a);
    }
    var obj = {
      a: 2,
    };
    foo.call(obj); // 2

    // 通过foo.call(..)，我们可以在调用 foo 时强制把它的this 绑定到obj 上。
    ```

  - New 绑定

    使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

    1. 创建（或者说构造）一个全新的对象。
    2. 这个新对象会被执行[[原型]] 连接。
    3. 这个新对象会绑定到函数调用的 this。
    4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

    ```javascript
    function foo(a) {
      this.a = a;
    }
    var bar = new foo(2);
    console.log(bar.a); // 2
    ```

    使用 new 调用 foo(...)时 会创建一个新的对象，并将新对象绑定到 foo(...)调用的 this 上，并返回这个对象，因此 bar 这个对象中有了 a 属性。

- 优先级

  - 默认绑定的优先级时最低

  - 显示绑定的优先级高于隐式绑定

    ```javascript
    function foo() {
      console.log(this.a);
    }

    var obj1 = {
      a: 2,
      foo: foo,
    };

    var obj2 = {
      a: 3,
      foo: foo,
    };

    obj1.foo(); // 2
    obj2.foo(); // 3
    obj1.foo.call(obj2); // 3
    obj2.foo.call(obj1); // 2
    ```

  - new 绑定的优先级高于隐式绑定

    ```javascript
    function foo(something) {
      this.a = something;
    }
    var obj1 = {
      foo: foo,
    };
    var obj2 = {};

    obj1.foo(2);
    console.log(obj1.a); //2

    obj1.foo.call(obj2, 3);
    console.log(obj2.a); //3

    var bar = new obj1.foo(4);
    console.log(obj1.a); //2
    console.log(bar.a); //4
    ```

- 绑定例外

- this 词法
