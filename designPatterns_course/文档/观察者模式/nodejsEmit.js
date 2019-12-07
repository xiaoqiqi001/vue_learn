const EventEmitter = require('events').EventEmitter

const emitter1 = new EventEmitter()
emitter1.on('test', function (){
  console.log(111)
})

emitter1.on('test', function () {
  console.log(222)
})

emitter1.emit('test')

class Dog extends EventEmitter {
  constructor (name) {
    super()
    this.name = name
  }
}

let testDog = new Dog('heihei')

testDog.on('roll', function (test) {
  console.log(`${this.name} is rolling, ${test}`)
})

testDog.emit('roll', 'gogogo')
