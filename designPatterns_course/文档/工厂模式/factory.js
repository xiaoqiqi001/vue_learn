class Product {
  constructor(name) {
    this.name = name
  }

  init () {
    alert('init')
  }

  fn1 () {
    alert('fn1')
  }
}

class Creator {}

Creator.create = function (name) {
  return new Product(name)
}

let p = Creator.create('p1')
p.init()
p.fn1()
