// console.log("A")

// const { useState, useEffect } = require("react")

// const { useEffect, useCallback } = require("react")


// setTimeout(() => {
//   console.log('B')
// }, 0);

// Promise.resolve().then(() => {
//   console.log('C')
// })

// console.log('D');

// (async function () {
//   console.log('E')
//   await new Promise((res) => {
//     console.log('F');
//     res()
//   })
//   console.log('G')
// })();

// console.log('H')


// 1. 宏任务队列 A 
// 2. 微任务队列 
// 3. 事件队列
// 4. 定时器队列
// 5. 网络请求队列
// 6. 文件读取队列
// 7. 数据库操作队列
// 8. 其他异步任务队列

// 执行结果： A D E F H C G B


// // 字符串数字相加
// function addStringNumber(str1, str2) {
//   // let maxLength = Math.max(str1.length, str2.length);
//   // str1 = str1.padStart(maxLength, '0')
//   // str2 = str2.padStart(maxLength, '0');
//   // let carry = 0;
//   // let result = '';
//   // for (let i = maxLength - 1; i >= 0; i--) {
//   //   const num1 = Number(str1[i] || 0)
//   //   const num2 = Number(str2[i] || 0)
//   //   const sum = num1 + num2 + carry
//   //   carry = Math.floor(sum / 10)
//   //   result = String(sum % 10) + String(result)
//   // }
//   // if (carry > 0) {
//   //   result = String(carry) + String(result)
//   // }
//   // return result;

//   // var addStrings = function (num1, num2) {
//   //   // 1,算出最大字符串长度
//   //   // 2. 对小的字符在前面补0
//   //   // 3. 求出每一位的字符之和
//   //   const maxLen = Math.max(num1.length, num2.length)
//   //   num1 = num1.padStart(maxLen, '0')
//   //   num2 = num2.padStart(maxLen, '0')
//   //   let i = maxLen - 1
//   //   carry = 0
//   //   result = ''.charAt
//   //   while (i > -1) {
//   //     const chart1 = num1.chartAt(i)
//   //     const chart2 = num2.chartAt(i)
//   //     const sum = Number(chart1) + Number(chart2)
//   //     carry = Math.floor(sum / 10)
//   //     result = String(sum % 10) + result
//   //     i--
//   //   }

//   //   if (carry > 0) {
//   //     result = carry + result
//   //   }
//   //   return result
//   // };
// }

// console.log(addStringNumber('999', '1'));


// Promise.reject('err!!!')
//   .then(
//     (res) => {
//       console.log('success', res);
//     },
//     (err) => {
//       console.log('error', err);
//     }
//   )
//   .catch((err) => {
//     console.log('catch', err);
//   });



// async function async1() {
// 	console.log('async1 start');
// 	await async2();
// 	console.log('async1 end');
// 	setTimeout(() => {
// 		console.log('timer1');
// 	}, 0);
// }

// async function async2() {
// 	setTimeout(() => {
// 		console.log('timer2');
// 	}, 0);
// 	console.log('async2');
// }

// async1();
// setTimeout(() => {
// 	console.log('timer3');
// }, 0);
// console.log('start');

// 结果： 'async1 start', 'async2', 'start', 'async1 end', 'timer3' ,'timer2', 'timer1'
// - 第一轮：
//   evenloop
//     async()
//     setTimeout(() => {
//       console.log('timer3');
//     }, 0);
//     console.log('start');
// - 执行栈1
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
//     setTimeout(() => {
//       console.log('timer1');
//     }, 0);

// - 执行栈2
//     setTimeout(() => {
//       console.log('timer2');
//     }, 0);
//     console.log('async2');


// 使用 Promise 实现每隔 1 秒输出 1,2,3

// function(){
//   const arr = [1,2,3]
//   arr.forEach(item => {

//   })
// }

// 使用 setTimeOut 实现每隔 1 秒输出 1,2,3


// [1, 3, 4].reduce((pre, cur) => {
//   return pre.then(res => {
//     return new Promise((resolve) => {
//       setTimeout(() => resolve(console.log(cur)), 1000);
//     });
//   })
// }, Promise.resolve())

// 使用 Promise 实现红绿灯交替重复亮
// 实现一个红绿灯交替亮的功能，三个灯亮的时间分别为：红灯 3 秒，绿灯 2 秒，黄灯 1 秒。可以用一个 Promise 链条实现不断循环亮灯

// function red(params) {
//   console.log("red")
// }

// function green(params) {
//   console.log("green")
// }

// function yellow() {
//   console.log("yellow")
// }

// function light(delay, fn) {
//   return new Promise(res => {
//     setTimeout(() => {
//       fn()
//       res()
//     }, delay);
//   })
// }

// function loop() {
//   Promise.resolve().then(() => {
//     light(3000, red)
//   }).then(() =>
//     light(2000, green)
//   ).then(() =>
//     light(1000, yellow)
//   ).then(() =>
//     loop()
//   )
// }

// loop()



// function red() {
//   console.log('red');
// }
// function green() {
//   console.log('green');
// }
// function yellow() {
//   console.log('yellow');
// }

// const light = (timer, callback) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       callback();
//       resolve();
//     }, timer);
//   });
// };

// const step = () => {
//   Promise.resolve()
//     .then(() => light(3000, red))
//     .then(() => light(2000, green))
//     .then(() => light(1000, yellow))
//     .then(() => step()); // 循环调用
// };

// step();

// 封装一个异步加载图片的方法




// 实现一个函数，能够限制并发异步任务的个数。给定一组图片资源 URL，限制同时下载的链接数为 limit，并尽快完成所有图片的加载。
// function loadImage(src) {
//   return new Promise((resolve, reject) => {
//     const image = new Image()
//     image.onload = () => {
//       resolve(image)
//     }
//     image.onerror = () => {
//       reject(new Error("图片加载错误"))
//     }
//     image.src = src
//   })
// }

// function limitLoad(urls, handle, limit) {
//   // 返回一个 Promise，当所有任务完成时 resolve
//   return new Promise((resolve, reject) => {
//     // 如果 urls 为空，直接 resolve
//     if (!urls || urls.length === 0) {
//       resolve([])
//       return
//     }

//     // 保存结果
//     const result = []
//     // 保存正在执行的队列
//     const queue = []
//     const task = handler(url) // 调用加载函数
//       .then((res) => {
//         result.push(res); // 将结果存储到结果数组
//         queue.splice(queue.indexOf(task), 1); // 从队列中移除已完成的任务
//       });







//     resolve(result)
//   })
// }

// 使用示例
// const imageUrls = [
//   'https://example.com/image1.jpg',
//   'https://example.com/image2.jpg',
//   'https://example.com/image3.jpg',
//   'https://example.com/image4.jpg',
//   'https://example.com/image5.jpg',
// ]
// 
// limitLoad(imageUrls, loadImage, 2)
//   .then((images) => {
//     console.log('所有图片加载完成', images)
//   })
//   .catch((error) => {
//     console.error('加载失败', error)
//   })


// 多数元素
// const majorityElement = (arr)=> {
//   let stack = []

//   for (const element of arr) {
//     const stackLen = stack.length
//     if(stackLen === 0 || stack[stackLen-1] === element){
//       stack.push(element)
//     }else{
//       stack.pop()
//     }
//   }

//   return stack.pop()
// }


// function rotate(nums, k)  {
//     const arr = [...nums]
//     const len = arr.length
//     for (let i = 0; i < arr.length; i++) {
//        nums[i] = arr[(i+len- k) % n]
//     }
//     return nums
// };


// 手写promise

// const prmise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(value)
//   }, 100);
// }).then((value)=> {

// }, rej => {

// })

// fulfilled

// rejected
// class MyPromise {
//   status = "peending"
//   value = null
//   onResolvedCallbacks = []
//   onRejectedCallbacks = []


//   constructor(exector){
//     const rsolve = (value)=> {
//       this.status =  "fulfilled"
//       this.value = value
//       this.onResolvedCallbacks.forEach((fn)=> fn(value))
//     }
//     const reject = (reason)=> {
//        this.status =  "rejected"
//        this.value =  reason
//        this.onRejectedCallbacks.forEach((fn)=> fn(reason))
//     }

//     exector(rsolve, reject)
//   }

//   then(res, rej) {
//     if(this.status === "fulfilled") {
//       res(this.value)
//     }
//     if(this.status === "rejected"){
//       rej(this.value)
//     }
//     if(this.status === "peending"){

//       this.onRejectedCallbacks.push(rej)
//       this.onResolvedCallbacks.push(res)
//     }
//   }

// }

// const p1 = new MyPromise((res, rej)=> {
//   setTimeout(()=> {
//     res(1)
//   },1000)
// })
// p1.then((res)=> {
//   console.log(res)
// })

// const useDebounceValue = (value,delay = 200)=> {
//   const [state, setState] = useState(value)

//   useEffect(()=> {
//     const timer =  setTimeout(() => {
//       setState(state)
//     }, delay);
//     return ()=> clearTimeout(timer)
//   },[value,delay])
//   return state
// }

// const decounceFn = debounce(search, delay)

// const  debounce =(fn, delay, immediate)=> {
//   let timer = null;

//   return function(...args){
//     if(immediate === true){
//       fn.call(this, ...args)
//       timer = setTimeout(() => {
//         timer = null
//       }, delay);
//     }else{
//       if(timer) clearTimeout(timer)
//       setTimeout(() => {
//         fn.call(this, ...args)
//         timer = null
//       }, delay);
//     }
    
//   }
// }

// const throttle1 = (fn, delay) => {
//   let timer =null
//   return function(...args){
//     if(!timer){
//      timer = setTimeout(() => {
//         fn.call(this, ...args)
//         timer = null;
//       }, timeout);
//     }
//   }
// }


// const throttle = (fn, delay) => {
//   let last = new Date();
//   return function(...args){
//     const curTimer = new Date()
//     if(curTimer - last<  delay) return
//     fn.call(this, ...args)
//     last =curTimer
//   }
// }

// const debounceImmer = (fn, delay,immer=false)=>{
//   let timer = null 
//   if(immer){
//     fn.call(this, )
//   }
// }




// class MyPromise{

//   constructor(exector){
//     this.value = null
//     this.reason = null
//     this.status = "pending"
//     this.onfulfilledCallBlacks = []
//     const resolve = (value)=> {
//       this.status= "fulfilled"
//       this.value = value
//       this.onfulfilledCallBlacks.forEach(fn=> fn(value))
//     }

//     const reject = (reason) => {
//       this.status = "rejected"
//       this.reason = reason
//     }

//     try {
//       exector(resolve,reject )
//     } catch (error) {
//       this.status= "rejected"
//       this.reason = error
//     }
    

//   }

//   then(onfulfilled, onRejected){
//     if(this.status === "fulfilled"){
//       onfulfilled(value)
//     }
//     if(this.status === "rejected"){
//        onRejected(value)
//     }
//     if(this.status === "pending"){
//       this.onfulfilledCallBlacks.push(onfulfilled)

//     }
//   }


//   all( promises){
//     return new Promise((resolve, rej)=>{
//       let res = []
//       promises.forEach((p, i)=> {
//         promises().then(result=> {
//           res[result] = result
//           if(i=== promises.length ){
//             resolve(result)
//           }
//         }).catch(rej)
//       })
//     })
//   }



  
// }


// new MyPromise((res,rej)=> {
//   setTimeout(() => {
//     res(1233)
//   }, 1000);
// }).then((value)=> {
//   console.log(value)
// })


// 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// function maxDepth(root: TreeNode | null): number {
//   let res = 0
//   let track = 0
//   const dfs = (root) =>{
//     if(root === null) return
//     track++;
// 		res = Math.max(res, track);
// 		dfs(root.left);
//     track--;
// 		dfs(root.right);
		
//   }
  

//   dfs(root)
//   return res
// };


// Input: nums = [1,2,3]

// Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]'
 //// Input: nums = [1,2,3,4]

// Output: [
// [1,2,3,4],[1,2,4,3],[1,3,2,4] [1,3,4,2],[1,4,2,3],[1,4,3,2],
// [2,1,3,4],[2,1,4,3],[2,3,1,4],[2,3,4,1],[2,4,1,3],[2,4,3,1],
// [3,1,2,4],[3,1,4,2],[3,2,1,4],[3,2,4,1],[3,4,1,2],[3,4,2,1],
// [4,1,2,3],[4,1,3,2],[4,2,1,3],[4,2,3,1],[4,3,2,1],[4,2,1,2]
// ]

// /**
//  * @param {number[]} nums
//  * @return {number[][]}
//  */
// var permute = function (nums) {
// 	const n = nums.length;
// 	let res = [];
//   const used = new Array(n).fill(false)
//   const backTrack = (track)=>{
//     if(track.length === n){
//        res.push(track)
//        return
//     }
//     for(let i=0; i < n; i++){
//       if(used[i]){
//         continue
//       }
//       track.push(nums[i])
//       used[i] = true


//       backTrack(track)

//       track.pop()
//       used[i] = false

//     }

//   }
//   backTrack([])



  
// 	return res;
// };


// permute([1,2,3])

// Example 1:

// Input: n = 3

// Output: ["((()))","(()())","(())()","()(())","()()()"]

// Example 2:

// Input: n = 1

// Output: ["()"]

// /**
//  * @param {number} n
//  * @return {string[]}
//  */
// var generateParenthesis = function(n) {
//   let res = []
//   let track =[]

//   const backtrack  = (left, right)=> {
//     if(left > n || right > n || left < right) return

//     if(left === n && right === n ){
//       res.push(track.join(""))
//       return
//     }

//     track.push("(")
//     backtrack(left +1, right)
//     track.pop()

//     track.push(")")
//     backtrack(left, right + 1)
//     track.pop()

//   }

//   backtrack(0, 0)

//   return res
    
// };

// console.log(generateParenthesis(1))  

// const debounce = (fn, delay) =>{
//   let timer = null
//   return function(...args){
//     if(timer) clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.call(this, ...args)
//       timer = null
//     }, delay);
//   }

// }

// const throttle = (fn, delay) => {
//   let timer = null
//   return function(...args){

//     if(timer) return
//     timer = setTimeout(() => {
//      fn.apply(this, ...args)
//      timer =null
//     }, delay);
//   }
// }

// Example 1:

// Input: digits = "23"

// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

// Example 2:

// Input: digits = ""

// Output: []

// Example 3:

// Input: digits = "2"

// Output: ["a","b","c"]

// 支持各合作商的评估字段差异/机型库差异 / 报价规则差异 / 税补贴差异等动态渲染

// const throttle = (fn, delay)=>{
//   let timer = null;

//   return function(...args){

//     if(!timer){
//       timer = setTimeout(() => {
//         fn.call(this, ...args)
//         timer = null
//       }, delay);
//     }
//   }
// }

// const debounce = (fn, delay)=>{
//   let timer = null;
//   return function(...args){
//     if(timer) clearTimeout(time)
//     timer = setTimeout(() => {
//       fn.call(this, ...args)
//       timer = null
//     }, delay);
//   }
// }


// const useDebounceValue = (value, delay)=> {
//   const [debounceValue, setDebounceValue] = useState(value)
//   const timerRef = useRef()
//   useEffect(()=> {
//     timerRef.current = setTimeout(() => {
//       setDebounceValue(value)
//     }, delay);
//     return ()=> {
//       clearTimeout(timerRef.current)
//     }
//   },[value, delay])
// }


// 红灯 3 秒 绿灯 3秒 黄灯2 秒


// const green = ()=> {
//   console.log("green 灯亮")
// }

// const red = ()=> {
//   console.log("red 灯亮")
// }

// const yellow = ()=> {
//   console.log("yellow 灯亮")
// }

// const light= (fn, delay) => {
//   return new Promise((res, rej)=> {
//     setTimeout(() => {
//       fn()
//       res()
//     }, delay);
//   })
// }



// const workLoop = ()=>{
//   Promise.resolve()
//     .then(()=> light(green, 2000))
//     .then(()=> light(yellow, 2000))
//     .then(()=> light(red, 2000))
//     .then(()=>workLoop() )
// }

// workLoop()


// class requsetQueue{
//   constructor(maxCount){
//     this.maxCount = maxCount
//     this.currentLen = 0
//     this.queue = []
//   }

//   add(request) {
//     return new Promise((resolve,reject)=> {
//       this.queue.push({request, resolve,reject })
//       this.processQueue()
//     })
//   }

//   processQueue(){
//     if(this.queue.length > 0  && this.maxCount > this.currentLen){
//       const {request, resolve, reject} = this.queue.shift()
//        this.currentLen ++
//       request()
//         .then((res)=>{
//           resolve(res)
//         })
//         .catch(reject)
//         .finally(()=> {
//           this.currentLen --
//           this.processQueue()
//         })
//     }
//   }

// }

// const mockRequest = (id)=> {

//     return new Promise((resolve, reject)=> {
//         console.log("Start:", id)
//         setTimeout(() => {
//           console.log("End:", id)
//           if(id === 3){
//             reject(2)
//           }
//           resolve(id)
//         }, 3000);
//       })
// }

// const getNume1 = async (num1)=> {
//   await mockRequest(num1)
// }

// const request = new requsetQueue(2);

// request.add(mockRequest(1)).then(res=> console.log("add1", res))

// Promise.all([1,2,3,4,5,6].map(item => request.add(mockRequest(item)))).then(res=> {
//   console.log("执行结果", res)
// },rej => {
//   console.log("执行错误结果", rej)
// })

// new Promise((resolve,reject)=>{
//   setTimeout(() => {
//     resolve()
//   }, 100);
// }).then((res)=> {})
// onfulfilled
// onrejected
// class MyPromise {
//   constructor(executor){
//     this.status = "PENNDING"
//     this.result = null
//     this.reason = null
//     this.resolveCallback = []
//     this.rejectCallback = []
//     const resolve = (res)=>{
//       this.status = "fulfilled"
//       this.result = res
//       this.resolveCallback.forEach(fn=> fn(res))
//     } 

//     const reject = (reason)=> {
//       this.status = "rejected"
//       this.result = reason
//        this.rejectCallback.forEach(fn=> fn(res))
//     }

//     try {
//       executor(resolve, reject)
//     } catch (error) {
//       reject(error)
//     }
    
//   }

//   then(onfulfilled, onrejected){
//     if(this.status === "fulfilled"){
//       onfulfilled(this.result)
//     }
//     if(this.status === "rejected"){
//       onrejected(this.reason)
//     }
//     if(this.status === "PENNDING"){
//       this.resolveCallback.push(onfulfilled)
//       this.rejectCallback.push(onrejected)
//     }
//   }
// }

// const throttle = (fn, delay)=>{
//   let timer = null;

//   return function(...args){
//     if(!timer){
//       timer = setTimeout(() => {
//         fn.apply(this, args)
//         timer = null
//       }, delay);
//     }
//   }
// }

// const debounce = (fn, delay)=> {
//   let timer = null;
//   return function(...args){
//     if(timer) clearTimeout(timer)
//     timer= setTimeout(() => {
//       fn.apply(this, args)
//       timer = null
//     }, delay);
//   }
// }


// class Person {
//   constructor(name){
//     this.name = name
//   }
//   drink(){
//     console.log("喝水")
//   }
// }

// class Student extends Person{
//   constructor(name){
//     super(name)
//   }
//   study(){
//     console.log("学习")
//   }
// }

// const stu1 = new Student("张三")


// 书写evenBus

// const eventBus = new EventBus()
// const dn = ()=> {
//   console.log("11111")
// }

// class EventBus {
//   constructor(){
//     this.event= {}
//   }

//   on(eventName, callBack){
//     if(this.event[eventName]){
//       this.event[eventName].push(callBack)
//     }else{
//       this.event[eventName] = [callBack]
//     }
//   }

//   emit(eventName, ...args){
//     if(this.event[eventName]){
//       this.event[eventName].forEach(callBack => {
//         callBack(...args)
//       });
//     }
//   }

//   once(eventName, callBack){
//     const wrapperFn = (...args)=> {
//       callBack(...args)
//       this.off(eventName, callBack)
//     }
//     this.on(eventName, wrapperFn)

//   }

//   off(eventName,callback ){
//     if(this.event[eventName]){
//       this.event[eventName] = this.event[eventName].filter(fn =>  fn !== callback);
//     }
//   }

//   clear(){
//     this.event= {}
//   }
// }




// function outLog(arr){
  
//   arr.reduce((pre, cur)=>{
//     return pre.then((res)=>{
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log(cur)
//           resolve(cur)
//         }, 1000);
//       })
//     })
//   },Promise.resolve())
// }

// outLog([1,2,3])


// fn.call(Object, ...args)


// Function.prototype.myCall = function(content, ...args){

//   const _content = content || global 

//   content.fn = this


//   const res = _content.fn(...args)
//   delete content.fn
//   return res


// }

// Function.prototype.Mybind = function(content){

//   const _content = content || global 

//   content.fn = this

//   return (...args)=> {
//     return _content.fn(...args)
//   }
// }

// const observer = new IntersectionObserver((entries)=>{
//   entries.forEach(value=>{

//   })
// })

// observer.observe()



// function foo(a) {
// console.log( a + b );
// b = a;
// }
// foo( 2 );

// var num = 99
// function b(){
//   num ++
//   console.log(num)
// }




