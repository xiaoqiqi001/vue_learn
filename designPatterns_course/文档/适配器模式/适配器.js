class Adaptee {
  specificRequest () {
    return '德国标准插头'
  }
}

class Target {
  constructor () {
    this.adaptee = new Adaptee()
  }

  request () {
    let res = this.adaptee.specificRequest()
    return `${res} - 转换后 - 中国标准插头`
  }
}

let target = new Target
console.log(target.request())
