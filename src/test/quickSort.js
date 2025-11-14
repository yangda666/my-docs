// function quickSort(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 1 + i; j < arr.length; j++) {
//       if (arr[i] < arr[j]) {
//         [arr[j], arr[i]] = [arr[i], arr[j]]
//       }
//     }
//   }
//   return arr;
// }

// console.log(quickSort([3, 4, 1, 8, 5, 9]));

function flatArr(arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element instanceof Array) {
      result = result.concat(flatArr(element))
    } else {
      result.push(element)
    }

  }
  return result
}

console.log(flatArr([[3, [4, 1]], 8, 5, 9]));
