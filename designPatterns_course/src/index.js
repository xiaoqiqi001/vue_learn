function each (data) {
  // 生成遍历器
  // let iterator = data[Symbol.iterator]()

  // console.log('next is ', iterator.next())
  // console.log('next is ', iterator.next())
  // console.log('next is ', iterator.next())
  // console.log('next is ', iterator.next())
  // console.log('next is ', iterator.next())
  // console.log('next is ', iterator.next())
  // console.log('next is ', iterator.next())
  // console.log('next is ', iterator.next())
  // console.log('next is ', iterator.next())

  // let item = {done: false}
  // while(!item.done){
  //   item = iterator.next()
  //   console.log(item.value)
  // }

  // 带有遍历器特性的对象 data[Symbol.iterator]有值，才可以用forOf来便利
  for (const iterator of data) {
    console.log(iterator)
  }
}

let arr = [1,2,3,4,5]
let map = new Map()
map.set('b', 100)
map.set('a', 200)

each(arr)
each(map)