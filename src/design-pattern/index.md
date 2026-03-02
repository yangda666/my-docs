---
title: javaScript设计模式
icon: business
order: 4
category:
  - design-pattern
---

# javaScript 设计模式

## 第一章 基础知识

### 1. 面向对象编程

在 Brendan Eich 为 JavaScript 设计面向对象系统时一开始没有打算加入 class 的概念，而是通过原型链来实现面向对象。原型模式不单是一种设计模式，也被称为一种编程范式。
JavaScript 是基于原型继承的，而不是基于类的继承。
JavaScript 中的对象有一个内部属性 [[Prototype]]，它会指向该对象的原型。
通过原型链，可以实现对象的继承和属性的共享。

```javascript
const person = {
  name: "John",
  age: 30,
};

const person2 = Object.create(person);
console.log(person2.name); // John
```

在 javaScript 中，原型模式是一种基于原型的面向对象编程范式，它通过原型链来实现对象的继承和属性的共享。通过 Object.create()方法可以创建一个新对象，来实现继承。

```javascript
const person = {
  name: "John",
  age: 30,
};

const person2 = Object.create(person);
console.log(person2.name); // John

// 在不支持Object.create的浏览器中可以通过以下方式实现
Object.create =
  Object.create ||
  function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
```

原型模式基本规则：

- 所有的数据都是对象
- 要得到一个对象，不是通过类，而是找一个对象作为原型并克隆它
- 对象会记住它的原型
- 如果对象无法找到需要的属性或者方法，就会去原型对象中寻找

原型模式有以下优点：

- 实现简单，不需要创建构造函数
- 可以实现对象的继承和属性的共享

new 的实现原理：

```javascript
function new(func) {
  const obj = Object.create(func.prototype);
  const result = func.apply(obj, arguments);
  return result !== null && (typeof result === "object" || typeof result === "function") ? result : obj;
}
```

### 2. this 指向

this 指向的四种情况：

- 作为对象的方法调用
- 作为普通函数调用
- 作为构造函数调用
- 作为 call、apply、bind 方法调用

#### 2.1 作为对象的方法调用

```javascript
const obj = {
  name: "John",
  sayHello: function () {
    console.log(this === obj);
    console.log(this.name);
  },
};
obj.sayHello(); // true, John
```

#### 2.2 作为普通函数调用

当函数不作为对象的属性被调用时，也就是我们常说的普通函数方式，此时的 this 总是指
向全局对象。在浏览器的 JavaScript 里，这个全局对象是 window 对象。

```javascript
var name = "window";
function sayHello() {
  console.log(this === window);
  console.log(this.name);
}
sayHello(); // true, window

// 或
var name = "window";

var obj = {
  name: "obj",
  sayHello: function () {
    console.log(this === obj);
    console.log(this.name);
  },
};
var foo = obj.sayHello; // 将 obj.sayHello 赋值给 foo
foo(); // false, window
```

#### 2.3 作为构造函数调用

当函数通过 new 关键字被调用时，this 指向的是新创建的对象。

```javascript
function Person(age) {
  this.name = "John";
  this.age = age;
}
const person = new Person(18);
console.log(person.name); // John
console.log(person.age); // 18
```

#### 2.4 作为 call、apply、bind 方法调用

```javascript
var obj = {
  name: "John",
  sayHello: function () {
    console.log(this.name);
  },
};
obj.sayHello(); // John
obj.sayHello.call({ name: "Jane" }); // Jane
obj.sayHello.apply({ name: "Jack" }); // Jack
obj.sayHello.bind({ name: "Jimmy" })(); // Jimmy
```

手动实现 bind

```javascript
Function.prototype.bind = function (context, ...args) {
  const self = this;
  return function (...args2) {
    return self.apply(context, args.concat(args2));
  };
};

var obj = {
  sayHello: function () {
    console.log(this.name);
  },
};

const sayHello = obj.sayHello.bind({ name: "Jimmy" });
sayHello(); // Jimmy
sayHello.call({ name: "John" }); // John
sayHello.apply({ name: "John" }); // John
```

不使用 bind，apply 手动实现 call

```javascript
Function.prototype.call = function (context, ...args) {
  const fn = this;
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = fn;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

var obj = {
  name: "John",
  sayHello: function () {
    console.log(this.name);
  },
};

obj.sayHello.call({ name: "Jimmy" }); // Jimmy
```

### 3. 闭包

闭包是指一个函数能够访问其外部作用域中的变量。闭包的实现原理是通过函数内部创建一个闭包，闭包内部包含一个函数，这个函数可以访问其外部作用域中的变量。

```javascript
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

闭包的有什么作用

- 封装变量

```javascript
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// 函数柯里化
// 场景：创建不同前缀的日志工具
function createLogger(prefix) {
  // 闭包记住 prefix
  return function (message) {
    console.log(`[${prefix}] ${new Date().toISOString()}: ${message}`);
  };
}

const infoLog = createLogger("INFO");
const errorLog = createLogger("ERROR");

infoLog("系统启动成功"); // [INFO] 2026-...: 系统启动成功
errorLog("数据库连接失败"); // [ERROR] 2026-...: 数据库连接失败
```

## 第二章 设计模式

- 单例模式
  单例模式是一种创建型设计模式，它确保一个类只有一个实例，并提供一个全局访问点。
  ```javascript
  class Singleton {
    static instance = null;
    constructor() {
      if (Singleton.instance) {
        return Singleton.instance;
      }
      return (Singleton.instance = this);
    }
  }
  const singleton = new Singleton();
  const singleton2 = new Singleton();
  console.log(singleton === singleton2); // true
  ```
- 策略模式
  策略模式是一种行为型设计模式，它定义了一系列算法，并将每个算法封装起来，使它们可以互换。

  ```javascript
  const strategies = {
    S: function (salary) {
      return salary * 4;
    },
    A: function (salary) {
      return salary * 3;
    },
    B: function (salary) {
      return salary * 2;
    },
  };

  const calculateBonus = function (strategy, salary) {
    return strategies[strategy](salary);
  };
  console.log(calculateBonus("S", 10000)); // 40000
  console.log(calculateBonus("A", 10000)); // 30000
  console.log(calculateBonus("B", 10000)); // 20000
  ```

- 代理模式
  代理模式是一种结构型设计模式，它提供了一个代理对象，代理对象控制对原始对象的访问。

  ```javascript
  // 缓存代理
  // 每次计算都会很耗时
  const calculate = function (salary) {
    return salary * 1000;
  };
  const proxyCalculate = (function () {
    const cache = {};
    return function (salary) {
      if (cache[salary]) {
        return cache[salary];
      }
      return calculate(salary);
    };
  })();

  // 创建工厂函数
  const createProxy = function (fn) {
    const cache = {};
    return function () {
      const _key = JSON.stringify(arguments);
      if (_key in cache) {
        return cache[_key];
      }
      return (cache[_key] = fn.apply(this, arguments));
    };
  };

  const proxyCalculate = createProxy(calculate);
  console.log(proxyCalculate(10000)); // 10000000
  ```

- 迭代器模式
  迭代器模式是一种行为型设计模式，它提供了一种方法来顺序访问一个聚合对象中的各个元素，而又不暴露其内部的表示。
  大部分编程语言已经内置了迭代器，如 Python、Java、JavaScript 等。

  ```javascript
  const myArray = [1, 2, 3];
  myArray.forEach(function (item) {
    console.log(item);
  });
  // 1 2 3

  // 实现自己迭代器
  const iterator = function (arr, callBack) {
    for (let i = 0; i < arr.length; i++) {
      callBack.call(arr[i], i, arr[i], arr);
    }
  };
  iterator(myArray, function (item, index, arr) {
    console.log(item, index, arr);
  });
  // 1 0 [1, 2, 3]
  // 2 1 [1, 2, 3]
  // 3 2 [1, 2, 3]
  ```
