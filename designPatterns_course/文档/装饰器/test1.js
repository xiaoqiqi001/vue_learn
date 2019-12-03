@testDec('fuck')
class Demo {
  constructor () {
    this.isDec = 1111111
  }
}

function testDec (isDec) {
  return function testDec (target) {
    target.prototype.isDec = isDec
  }
}

alert((new Demo).isDec)