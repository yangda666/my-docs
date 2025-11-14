// console.log("A")

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


// 字符串数字相加
function addStringNumber(str1, str2) {
  // let maxLength = Math.max(str1.length, str2.length);
  // str1 = str1.padStart(maxLength, '0')
  // str2 = str2.padStart(maxLength, '0');
  // let carry = 0;
  // let result = '';
  // for (let i = maxLength - 1; i >= 0; i--) {
  //   const num1 = Number(str1[i] || 0)
  //   const num2 = Number(str2[i] || 0)
  //   const sum = num1 + num2 + carry
  //   carry = Math.floor(sum / 10)
  //   result = String(sum % 10) + String(result)
  // }
  // if (carry > 0) {
  //   result = String(carry) + String(result)
  // }
  // return result;

  // var addStrings = function (num1, num2) {
  //   // 1,算出最大字符串长度
  //   // 2. 对小的字符在前面补0
  //   // 3. 求出每一位的字符之和
  //   const maxLen = Math.max(num1.length, num2.length)
  //   num1 = num1.padStart(maxLen, '0')
  //   num2 = num2.padStart(maxLen, '0')
  //   let i = maxLen - 1
  //   carry = 0
  //   result = ''.charAt
  //   while (i > -1) {
  //     const chart1 = num1.chartAt(i)
  //     const chart2 = num2.chartAt(i)
  //     const sum = Number(chart1) + Number(chart2)
  //     carry = Math.floor(sum / 10)
  //     result = String(sum % 10) + result
  //     i--
  //   }

  //   if (carry > 0) {
  //     result = carry + result
  //   }
  //   return result
  // };
}

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



function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

const light = (timer, callback) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, timer);
  });
};

const step = () => {
  Promise.resolve()
    .then(() => light(3000, red))
    .then(() => light(2000, green))
    .then(() => light(1000, yellow))
    .then(() => step()); // 循环调用
};

step();
