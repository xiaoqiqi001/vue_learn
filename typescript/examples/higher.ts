// 交叉类型
// 将两个类型进行合并
// 合并两个对象：有两个参数和两个泛形，第一个参数的类型是T，第二个参数的类型是U，那么返回值就是T&U
function extend<T, U> (origin: T, copy: U): T&U {
  let result = {...origin, ...copy} as T&U
  return result
}

interface twoNumber{
  a: number
  b: number
}

interface twoString {
  c: string,
  d: string
}

let myTwoNumber: twoNumber = {
  a: 1,
  b: 2
}
let myTwoString: twoString = {
  c: 'fff',
  d: 'dddd'
}
console.log(extend<twoNumber, twoString>(myTwoNumber, myTwoString))

// ------ 联合类型： number | string
function unionFn(a: number | string) {}

// ------- 类型保护：在使用了联合类型导致变量类型模棱两可的时候，可以使用类型保护直接说明类型
// 判断传入的参数是否为number类型
function protect (a: number | string): a is number {
  return typeof a === 'number'
}
// 类型保护的使用方法：类型谓词函数
function isNumber(x): x is number {
  return typeof x === 'number'
}
function isString(x): x is string {
  return typeof x === 'string'
}
function paddingLeft (val: string, padding: number | string): string {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + val
  }
  if (isString(padding)) {
    return val + padding
  }
  throw new Error('类型不正确')
}
function paddingLeftTypeOf (val: string, padding: number | string): string {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + val
  }
  if (typeof padding === 'string') {
    return val + padding
  }
  throw new Error('类型不正确')
}


// ------------ 字符串字面量
// 定义一个Easing的type，它的值是ease-in | ease-out | ease-in-out
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'
let testEase: Easing = 'ease-in'
// let testEase1: Easing = 'ease-in1' // xxxxxxxxxx