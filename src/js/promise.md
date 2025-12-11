---
title: "promise 相关"
icon: "javascript"
order: 2
headerDepth: 2
---

# promise 基础概念

1. promise 的三个状态

 -  pending 待定： 初始状态，既没有被兑现，也没有被拒绝。
 -  fulfilled 兑现： 意味着操作成功完成。
 -  rejected 拒绝： 意味着操作失败。

 状态一旦确定就无法更改

 ```javascript
 const promise = new Promise((resolve, reject) => {
  resolve('成功')
  reject('失败') // 无效值
 })

 setTimeout(console.log, 0, promise) // promise <resolved>
 ```


2. promise.resolve()

- promise.resolve() 方法返回一个以给定值解析后的 Promise 对象。

```javascript
// 传入的是普通值
  let promise = Promise.resolve('hello world')
  setTimeout(console.log, 0, promise) // Promise {<resolved>}

// 传入的是参数本事就是一个期约， 他的行为就是一个空包装, 他的最终的状态会保留 传入的期约的状态
  let promise = Promise.resolve('hello world')
  setTimeout(console.log, 0, promise) // Promise {<resolved>}
  setTimeout(console.log, 0, promise === Promise.resolve(promise)) // true
  setTimeout(console.log, 0, promise === Promise.resolve(Promise.resolve(promise))) // true


  let promise2 = Promise.reject('hello world')
  setTimeout(console.log, 0, promise2) // Promise {<rejected>}
  setTimeout(console.log, 0, promise === Promise.resolve(promise2)) // true
  setTimeout(console.log, 0, promise === Promise.resolve(Promise.resolve(promise2))) // true

  let promise2 = new Promise((resolve, reject) => { })
  setTimeout(console.log, 100, promise2); // Promise {<pending>}
  setTimeout(console.log, 0, promise2 === Promise.resolve(promise2)) 
  setTimeout(console.log, 0, promise2 === Promise.resolve(Promise.resolve(promise2))) 

// 传入的是个错误对象
  let promise = Promise.resolve(new Error('hello world'))
  setTimeout(console.log, 0, promise) // Promise {<resolved>}



```

3. promise.reject()

- promise.reject() 方法返回一个带有拒绝原因的 Promise 对象。

```javascript
let promise = Promise.reject('hello world') 
setTimeout(console.log, 0, promise) // Promise {<rejected>: "hello world"}

// 传入的是参数本事就是一个期约， 不会有 Promise.resolve() 幂等的操作， 而是直接转成为他返回的拒绝理由

const p1 = new Promise((resolve, reject)=> {reject(123)})
setTimeout(console.log, 0, Promise.reject(p1)) //Promise {<rejected>: Promise}

const p2 = new Promise((resolve, reject)=> {resolve(123)})
setTimeout(console.log, 0, Promise.reject(p2)) //Promise {<rejected>: Promise}

```


4. 期约的错误捕获
- try catch 不能捕获期约的错误， 拒绝期约的 错误 不会在同步代码线程中，而是通过浏览器的消息队列进行捕获，只能通过期约的 结构方法进行处理 `then` 或 `catch`
```js

try {
  new Promise((resolve, reject)=> {
    reject(123)
  })
}catch(e) {
  console.log(e)  // 没有打印
}
```






# 2. promise 实例方法

1. 实现thenable接口

- 在ECMAScript 暴露的异步结构中，任何对象都暴露一个then方法，这个方法被认为实现了thenable接口,

```js
class MyThenable {
  then(){
  }
}
```

2. Promise.prototype.then()
- 该方法是为promise添加处理程序的主要方法，这个方法接受两个参数，第一个参数是fulfilled状态的回调函数，第二个参数是rejected状态的回调函数。
- 因为promise的 状态转化只有一次，所以 这两个回调是互斥的。

```js
  function onResolved(value){
   setTimeout(console.log, 0, 'resolved', value)
  }

  function onRejected(reason){
    setTimeout(console.log, 0, 'rejected', reason)
  }

  let p1 = new Promise((resolve, reject) => {setTimeout(resolve, 1000, 'p1')})
  let p2 = new Promise((resolve, reject) => {setTimeout(reject, 1000, 'p2')})
  p1.then(onResolved, onRejected)
  p2.then(onResolved, onRejected)

  // output: (1s later)
  // resolved p1
  // rejected p2
```


- 传递任何非函数类型的参数，都会被忽略

```js
  function onResolved(value){
   setTimeout(console.log, 0, 'resolved', value)
  }

  function onRejected(reason){
    setTimeout(console.log, 0, 'rejected', reason)
  }

  let p1 = new Promise((resolve, reject) => {setTimeout(resolve, 1000, 'p1')})
  let p2 = new Promise((resolve, reject) => {setTimeout(reject, 1000, 'p2')})
  // 非函数参数， 会被静默忽略
  p1.then("global”)
  

  // output: (1s later)
  // resolved p1
  // rejected p2
```

- 返回值是一个新的promise 实例。

```js
  let p1  = new Promise((resolve, reject) => {})
  let p2 = p1.then()
  setTimeout(console.log, 1000, p2) //Promise {<pending>}
  setTimeout(console.log, 1000, p1) // Promise {<pending>}
  setTimeout(console.log, 1000, p1 === p2) // false
```

- 新的 promise 实例，是基于onResolved处理程序的返回值构建，该程序的返回值是通过 Promise.resolve() 包装的。

```js

// 没有显示返回值 
let p1  =  Promise.resolve('foo')
let p2 = p1.then()
let p3 = p2.then(()=> undefined)
let p4 = p2.then(()=> {})
let p5 = p2.then(()=> Promise.resolve())

setTimeout(console.log, 1000, p1) // Promise {<fulfilled>: 'foo'}
setTimeout(console.log, 1000, p2) // Promise {<fulfilled>: 'foo'}
setTimeout(console.log, 1000, p3) // Promise {<fulfilled>:  undefined}
setTimeout(console.log, 1000, p4) // Promise {<fulfilled>:  undefined}
setTimeout(console.log, 1000, p5) // Promise {<fulfilled>:  undefined}

// 显示返回值
let p6 = p2.then(()=> "bar")
let p7 = p2.then(()=> new Promise(()=>{}))

let p8 = p2.then(()=> Promise.resolve("bar"))
let p9 = p2.then(()=> Promise.reject("bar"))
let p10 = p2.then(()=> {throw "bar"})

let p11 = p2.then(()=> new Promise((resolve, reject) => {
  resolve("bar")
}))
let p12 = p2.then(()=> new Error("bar"))


setTimeout(console.log, 1000, p6)       // Promise {<fulfilled>:  "bar"}}      
setTimeout(console.log, 1000, p7)       // Promise {<pending>}     
setTimeout(console.log, 1000, p8)       // Promise {<fulfilled>:  "bar"}}
setTimeout(console.log, 1000, p9)       // Promise {<rejected>:  "bar"}} 
setTimeout(console.log, 1000, p10)      // Promise {<rejected>:  "bar"}}
setTimeout(console.log, 1000, p11)      // Promise {<fulfilled>:  "bar"}}
setTimeout(console.log, 1000, p12)      // Promise {<fulfilled>:  Error: bar}
```


- 新的 promise 实例，是基于onRejected处理程序的返回值构建，该程序的返回值是通过 Promise.resolve() 包装的。 与 onResolved 处理程序 一样，

3. Promise.prototype.catch()

- 该方法就是给promise 添加拒绝的处理程序，只接受一个参数：onRejected 处理程序，就是 Promise.prototype.then(null, onRejected) 的语法糖。

```js
  let p1 = Promise.reject('出错了');
  function onRejected(reason) {
  setTimeout(console.log, 0, reason)
  }
   
  p1.catch(onRejected);
  // 等同于
  p1.then(null, onRejected);


```

- Promise.prototype.catch() 方法返回一个 Promise 实例 ，并且与  Promise.prototype.then()的 onRejected 处理程序一样。


4. Promise.prototype.finally()

- 该方法在 promise 结束时执行，无论结果是 resolve(成功) 或 reject(失败) 都会执行。

```javascript
  let p1 = Promise.resolve();
  let p2 = Promise.reject();
  let finallyFn = function () {
    setTimeout(console.log,0, 'finally')
  }
  p1.finally(finallyFn); // finally
  p2.finally(finallyFn); // finally

```

- 该方法返回一个新的 promise 对象。对于已经确定状态的期约，则返回的是父期约的传递。如果返回的是待定期约，或者 onFiFinally 中抛出错误(显示抛出或返回一个拒绝的期约)，则返回相应的期约。

```javascript

let p1 = Promise.resolve("foo"); 

let p2 = p1.finally()
let p3 = p1.finally(() => undefined)
let p4 = p1.finally(() => {})
let p5 = p1.finally(() => Promise.resolve("bar"))

let p6 = p1.finally(() => Error ("bar"))

setTimeout(console.log,0,p2)
setTimeout(console.log,0,p3)
setTimeout(console.log,0,p4)
setTimeout(console.log,0,p5)
setTimeout(console.log,0,p6)


// output:
// Promise {<fulfilled>: 'foo'}
// Promise {<fulfilled>: 'foo'}
// Promise {<fulfilled>: 'foo'}
// Promise {<fulfilled>: 'foo'}
// Promise {<fulfilled>: 'foo'}

let p7 = p1.finally(() => Promise.reject("bar"))
let p8 = p1.finally(() => {throw "bar"})
let p9 = p1.finally(() => new Promise((resolve, reject) => reject("bar")))
let p10 = p1.finally(() => new Promise((resolve, reject) => resolve("bar")))
let p11 = p1.finally(() => new Promise())
let p12 = p1.finally(() => new Promise(()=>{}))
setTimeout(console.log,0,p7)
setTimeout(console.log,0,p8)
setTimeout(console.log,0,p9)
setTimeout(console.log,0,p10)
setTimeout(console.log,0,p11)
setTimeout(console.log,0,p12)

// outPut:
// Promise {<rejected>: 'bar'}
// Promise {<rejected>: 'bar'}
// Promise {<rejected>: 'bar'}
// Promise {<fulfilled>: 'foo'}
// Promise {<rejected>: TypeError: Promise resolver undefined is not a function}
// Promise {<pending>}

```


# 3. promise 的非重入性（异步的特性， 等待主线程代码执行完毕后，再执行对应的处理程序）

- 当期约的状态落定时，该状态的处理程序仅仅是被排期，而非立即执行。

```js

console.log("start")
let p  = Promise.resolve(2)
p.then(res=> console.log("onResolved handler"))
console.log("end")

// outPut
// start
// end
// onResolved handler


let syncFn;
let p = new Promise(resolve => {
  syncFn =function () {
    console.log("1  invoking resolve()")
    resolve();
    console.log("2  invoking  resolve() return")
  }
})
syncFn()
p.then(() => {console.log("3  onResolved handler")})

console.log("4  syncFn  return")

// outPut:
// 1  invoking resolve()
// 2  invoking  resolve() return
// 4  syncFn  return
// 3  onResolved handler
```



# Promise 的面试代码题

1. 实现红绿灯

```js
 const red = function(){
  console.log("red light")
 }
 const yellow = function(){
  console.log("yellow light")
 }
 const green = function(){
  console.log("green light")
 }

 const light = function(fn , delay){
    return new Promise(resolve=>{
      setTimeout(()=>{
        fn()
        resolve()
      }, delay)
    })
 }

  const stpe = function(){
      light(red, 3000)
        .then(()=>
          light(yellow, 1000)
        ).then(()=>
          light(green, 3000)
        ).then(stpe)
  }

  stpe()

```

2. 每隔一秒一次打印出数组中的值 [1,2,3,4]

```js
  
  const fn = function(res){
    return new Promise(resolve =>{
        setTimeout(()=>{
          console.log(res)
          resolve()
        }, 1000)
      })
  }
  
  function promiselog(arr){
    arr.reduce((p, num)=>{
      return p.then(()=>{
        return fn(num)
      })
    }, Promise.resolve())
  }

  promiselog([1,2,3,4])



```