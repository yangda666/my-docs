---
title: "js 继承"
icon: "javascript"
order: 3
headerDepth: 2
---

# JavaScript 继承

JavaScript 中的继承有多种实现方式，每种方式都有其优缺点。以下是常见的六种继承方式：

## 1. 原型链继承

### 实现方式

通过将子类的原型指向父类的实例来实现继承。

```javascript
// 父类
function Parent() {
  this.name = "parent";
  this.colors = ["red", "blue", "green"];
}

Parent.prototype.getName = function () {
  return this.name;
};

// 子类
function Child() {
  this.type = "child";
}

// 将子类的原型指向父类的实例
Child.prototype = new Parent();

// 创建子类实例
const child1 = new Child();
const child2 = new Child();

console.log(child1.getName()); // 'parent'
console.log(child2.getName()); // 'parent'

// 问题：引用类型属性被共享
child1.colors.push("yellow");
console.log(child2.colors); // ['red', 'blue', 'green', 'yellow']
```

### 优点

- 实现简单，易于理解

### 缺点

- 引用类型的属性被所有实例共享
- 创建子类实例时，无法向父类构造函数传参
- 无法实现多继承

## 2. 构造函数继承（经典继承）

### 实现方式

在子类构造函数中调用父类构造函数，使用 `call` 或 `apply` 方法。

```javascript
// 父类
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

Parent.prototype.getName = function () {
  return this.name;
};

// 子类
function Child(name, age) {
  // 调用父类构造函数
  Parent.call(this, name);
  this.age = age;
}

// 创建子类实例
const child1 = new Child("child1", 18);
const child2 = new Child("child2", 20);

console.log(child1.name); // 'child1'
console.log(child2.name); // 'child2'

// 引用类型属性不会被共享
child1.colors.push("yellow");
console.log(child1.colors); // ['red', 'blue', 'green', 'yellow']
console.log(child2.colors); // ['red', 'blue', 'green']

// 问题：无法继承父类原型上的方法
console.log(child1.getName); // undefined
```

### 优点

- 解决了原型链继承中引用类型属性共享的问题
- 可以在子类中向父类传参
- 可以实现多继承（调用多个父类构造函数）

### 缺点

- 无法继承父类原型上的属性和方法
- 每个子类实例都会复制一份父类实例属性，造成内存浪费
- 方法都在构造函数中定义，无法复用

## 3. 组合继承（伪经典继承）

### 实现方式

结合原型链继承和构造函数继承，使用构造函数继承属性，使用原型链继承方法。

```javascript
// 父类
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

Parent.prototype.getName = function () {
  return this.name;
};

// 子类
function Child(name, age) {
  // 构造函数继承：继承属性
  Parent.call(this, name);
  this.age = age;
}

// 原型链继承：继承方法
Child.prototype = new Parent();

// 子类自己的方法
Child.prototype.getAge = function () {
  return this.age;
};

// 创建子类实例
const child1 = new Child("child1", 18);
const child2 = new Child("child2", 20);

console.log(child1.getName()); // 'child1'
console.log(child1.getAge()); // 18

// 引用类型属性不会被共享
child1.colors.push("yellow");
console.log(child1.colors); // ['red', 'blue', 'green', 'yellow']
console.log(child2.colors); // ['red', 'blue', 'green']
```

### 优点

- 融合了原型链继承和构造函数继承的优点
- 可以继承父类原型上的方法
- 可以传参
- 引用类型属性不会被共享

### 缺点

- 调用了两次父类构造函数，造成不必要的开销

## 4. 原型式继承

### 实现方式

使用一个函数来包装对象，然后返回这个对象的副本。

```javascript
function inheritObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

// 或者使用 Object.create()
const person = {
  name: "person",
  colors: ["red", "blue", "green"],
  getName: function () {
    return this.name;
  },
};

// 方式一：使用自定义函数
const child1 = inheritObject(person);
child1.name = "child1";
child1.colors.push("yellow");

// 方式二：使用 Object.create()
const child2 = Object.create(person);
child2.name = "child2";
child2.colors.push("black");

console.log(child1.getName()); // 'child1'
console.log(child2.getName()); // 'child2'
console.log(person.colors); // ['red', 'blue', 'green', 'yellow', 'black']
console.log(child2.colors); // ['red', 'blue', 'green', 'yellow', 'black']

// 问题：引用类型属性被共享
child1.colors.push("yellow");
console.log(child2.colors); // ['red', 'blue', 'green', 'yellow', 'black']

// 问题：无法传递参数
const child3 = inheritObject(person);
child3.name = "child3";
child3.colors.push("blue");
console.log(child3.colors); // ['red', 'blue', 'green', 'yellow', 'black', 'blue']
```

### 优点

- 实现简单，不需要创建构造函数

### 缺点

- 引用类型属性会被共享
- 无法传递参数

## 5. 寄生式继承

### 实现方式

在原型式继承的基础上，增强对象，返回新对象。

```javascript
function createAnother(original) {
  const clone = Object.create(original); // 通过调用函数创建一个新对象
  clone.sayHi = function () {
    // 以某种方式增强这个对象
    console.log("hi");
  };
  return clone; // 返回这个对象
}

const person = {
  name: "person",
  colors: ["red", "blue", "green"],
  getName: function () {
    return this.name;
  },
};

const child = createAnother(person);
child.sayHi(); // 'hi'
console.log(child.getName()); // 'person'
```

### 优点

- 在原型式继承的基础上增强了对象

### 缺点

- 引用类型属性会被共享
- 无法传递参数
- 方法无法复用

## 6. 寄生组合式继承（最优解）

### 实现方式

结合寄生式继承和组合继承，通过寄生式继承来继承父类原型，然后将结果指定给子类原型。

```javascript
// 寄生组合式继承的核心函数
function inheritPrototype(Child, Parent) {
  const prototype = Object.create(Parent.prototype); // 创建父类原型的副本
  prototype.constructor = Child; // 修正 constructor
  Child.prototype = prototype; // 将副本赋值给子类原型
}

// 父类
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

Parent.prototype.getName = function () {
  return this.name;
};

// 子类
function Child(name, age) {
  Parent.call(this, name); // 构造函数继承：继承属性
  this.age = age;
}

// 寄生组合式继承：继承方法
inheritPrototype(Child, Parent);

// 子类自己的方法
Child.prototype.getAge = function () {
  return this.age;
};

// 创建子类实例
const child1 = new Child("child1", 18);
const child2 = new Child("child2", 20);

console.log(child1.getName()); // 'child1'
console.log(child1.getAge()); // 18

// 引用类型属性不会被共享
child1.colors.push("yellow");
console.log(child1.colors); // ['red', 'blue', 'green', 'yellow']
console.log(child2.colors); // ['red', 'blue', 'green']
```

### 优点

- 只调用一次父类构造函数
- 避免了在子类原型上创建不必要的属性
- 原型链保持不变，可以使用 `instanceof` 和 `isPrototypeOf`
- 是最理想的继承方式

### 缺点

- 实现相对复杂

## ES6 Class 继承

ES6 引入了 `class` 语法，使继承更加简洁：

```javascript
// 父类
class Parent {
  constructor(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  getName() {
    return this.name;
  }
}

// 子类
class Child extends Parent {
  constructor(name, age) {
    super(name); // 调用父类构造函数
    this.age = age;
  }

  getAge() {
    return this.age;
  }
}

// 创建子类实例
const child1 = new Child("child1", 18);
const child2 = new Child("child2", 20);

console.log(child1.getName()); // 'child1'
console.log(child1.getAge()); // 18

// 引用类型属性不会被共享
child1.colors.push("yellow");
console.log(child1.colors); // ['red', 'blue', 'green', 'yellow']
console.log(child2.colors); // ['red', 'blue', 'green']
```

### 优点

- 语法简洁，易于理解
- 本质上还是基于原型链的继承
- 支持 `super` 关键字调用父类方法

### 注意事项

- `class` 只是语法糖，底层实现仍然是基于原型链
- 必须使用 `new` 关键字调用
- 不存在变量提升

## 总结

| 继承方式       | 优点                   | 缺点                       | 使用场景                 |
| -------------- | ---------------------- | -------------------------- | ------------------------ |
| 原型链继承     | 实现简单               | 引用类型共享、无法传参     | 不推荐使用               |
| 构造函数继承   | 可传参、引用类型不共享 | 无法继承原型方法           | 不推荐单独使用           |
| 组合继承       | 结合两者优点           | 调用两次父类构造函数       | 常用但非最优             |
| 原型式继承     | 实现简单               | 引用类型共享               | 适合不需要构造函数的场景 |
| 寄生式继承     | 增强对象               | 引用类型共享、方法无法复用 | 适合增强对象的场景       |
| 寄生组合式继承 | 最优解                 | 实现相对复杂               | **推荐使用**             |
| ES6 Class      | 语法简洁               | 需要支持 ES6               | **现代开发推荐**         |
