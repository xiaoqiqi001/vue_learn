// 明星信息
let star = {
  name: '张XX',
  age: 25,
  phone: 123443543534
}

let agent = new Proxy(star, {
  get: function (target, key) {
    if (key === 'phone') {
      // 返回经纪人自己的电话
      return 1234567
    }
    if (key === 'price') {
      return 120000
    }
    return target[key]
  },
  set: function (target, key, value) {
    if (key === 'customPrice') {
      if (value < 100000) {
        throw new Error('价格太低')
      } else {
        target[key] = value
        // 必须有，否则不会赋值成功
        return true
      }
    }
  }
})

console.log('明星的名字、年龄和电话、报价', agent.name, agent.age, agent.phone, agent.price)
agent.customPrice = 150000
console.log('结果', agent)