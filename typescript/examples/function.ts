// 定义一个完成的函数类型
let test: (otherX: number, otherY: number) => number = function (x: number, y:number) {
  return x + y
}



// -------- 可选参数
function test1(a: string, b?: string): string {
  return a + b
}
test1('ssss')


// ------ 多余参数
// 可以使用otherArgu参数来获取传进来的多余的参数
function test2(a: number, ...otherArgu: number[]): string {
  return a + otherArgu.join('')
}
test2(34444)



// ------- 函数的重载
// 在这里对reload函数进行了两次定义，也就是说，x不但可以是一个数字类型的，也可以是一个数字数组类型的，并且返回值也可以不同
function reload (x: number): number
function reload (x: number[]): string
function reload (x) {
  if (x instanceof Array) {
    return x.join('')
  }
  return x
}
reload(1)
// 根据上面的代码，声明也可以改成这样
function reload1(x: number | number[]): number | string
function reload1 (x) {
  if (x instanceof Array) {
    return x.join('')
  }
  return x
}
reload1([1])

