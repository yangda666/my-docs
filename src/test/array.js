

const a = [1,2,3,5,7,9,11,45,32,23]

const b = [1,23,4,5,6,7,9,32,23,56,27]


// 求数组的交集
function intersection(a, b) {
  return a.filter(item=> b.includes(item))
}

// 求数组的并集
function fn1(a, b){
  const set = new Set([...a, ...b])
  return [...set]
}



// 求数组的差
function diff(a, b) {
  return a.filter(item => !b.includes(item))
}

const seleted = [{id: 1, name: "张三"}, {id: 2, name: "王二"},{id: 3, name: "王五"}]
const allPerson = [{id: 1, name: "张三"}, {id: 2, name: "王二"},{id: 3, name: "王五"},{id: 4, name: "李四"}]



function diff(all, seleted){
  // 获取 b 中的所有 id集合
  const seletedIds = [...seleted.map(item=> item.id)]
  return all.filter(item=> !seletedIds.includes(item.id))
}