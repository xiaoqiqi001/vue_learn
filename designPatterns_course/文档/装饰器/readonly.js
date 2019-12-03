function readonly (target, name, descriptor) {
  console.log(target, name, descriptor)
  descriptor.writable = false
  return descriptor
}

class Person {
  constructor () {
    this.firstName = 'A'
    this.lastName = 'B'
  }

  @readonly
  name () {
    return `${this.firstName} ${this.lastName}`
  }
}

let p = new Person()
console.log(p.name())
p.name = function () {}
