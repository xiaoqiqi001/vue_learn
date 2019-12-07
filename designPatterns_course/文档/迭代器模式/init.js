// 迭代器的模型
class Iterator {
  constructor (container) {
    this.list = container.list
    this.index = 0
  }

  hasNext() {
    if (this.index >= this.list.length) {
      return false
    }
    return true
  }

  next () {
    if (this.hasNext()) {
      return this.list[this.index++]
    }
    return null
  }
}

// 迭代器的容器
class Container {
  constructor (list) {
    this.list = list
  }

  getIterator () {
    return new Iterator(this)
  }
}

let con = new Container([1,2,3,4,5])
let iterator = con.getIterator()
console.log("TCL: iterator", iterator)
while(iterator.hasNext()) {
  console.log(iterator.next())
}