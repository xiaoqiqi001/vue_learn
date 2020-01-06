require('./index.css')
require('./index.less')
require('./a.js')
require('@babel/polyfill')
// import $ from 'jquery'
// import logo from 'http://img4.imgtn.bdimg.com/it/u=3353171325,1083968507&fm=26&gp=0.jpg'
// console.log(`TCL: logo`, logo)

// console.log(window.$)
console.log(`TCL: $`, $)

let image = new Image()
image.src = 'http://img4.imgtn.bdimg.com/it/u=3353171325,1083968507&fm=26&gp=0.jpg'
document.body.appendChild(image)

let myFn = () => {
  console.log(111)
}

myFn()

'test'.includes('t')
