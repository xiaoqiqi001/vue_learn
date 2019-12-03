class SingleObject {
  login () {
    alert('SingleObject')
  }
}

// 使用闭包来保存变量的标准标准模版，可以当成对象来用
SingleObject.getInstance = (function () {
  let instance = null
  return function () {
    if (instance === null) {
      instance = new SingleObject()
    }
    return instance
  }
})()

let p1 = SingleObject.getInstance()
p1.login()

let p2 = SingleObject.getInstance()
p2.login()

console.log('p1 === p2', p1 === p2)