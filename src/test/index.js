console.log("A")

setTimeout(() => {
  console.log('B')
}, 0);

Promise.resolve().then(() => {
  console.log('C')
})

console.log('D');

(async function () {
  console.log('E')
  await new Promise((res) => {
    console.log('F');
    res()
  })
  console.log('G')
})();

console.log('H')
