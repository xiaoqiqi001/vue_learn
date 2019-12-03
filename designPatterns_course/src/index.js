class Math {
  constructor (a, b) {
    this.a = a
    this.b = b
  }

  @log
  add () {
    return this.a + this.b
  }
}

function log (target, name, descriptor) {
  let oldValue = descriptor.value
  descriptor.value = function () {
    console.log('这里调用了', name, descriptor)
    return oldValue.apply(this, arguments)
  }
  return descriptor
}

let math = new Math(2, 4)
console.log(math.add())
