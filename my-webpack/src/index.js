// require('./index.css')
require('./index.less')
require('./a.js')
require('@babel/polyfill')
// import $ from 'jquery'
// import logo from 'http://img4.imgtn.bdimg.com/it/u=3353171325,1083968507&fm=26&gp=0.jpg'
// console.log(`TCL: logo`, logo)
import 'myCss';

// console.log(window.$)

let imageEle = new Image()
imageEle.src = '/it/u=3353171325,1083968507&fm=26&gp=0.jpg'
document.body.appendChild(imageEle)

let myFn = () => {
  console.log(111)
}


class Log {
  constructor () {
    console.log('logging...')
  }
}

let log = new Log()

myFn()

'test'.includes('t')

// let xhr = new XMLHttpRequest()
// xhr.open('GET', '/api/user', true)

// xhr.onload = function () {
//   console.log(xhr.response)
// }

// xhr.send()

let xhr1 = new XMLHttpRequest()
xhr1.open('GET', '/test', true)

xhr1.onload = function () {
  console.log(xhr1.response)
}

xhr1.send()

if (env) {
  console.log('当前是测试环境')
}


