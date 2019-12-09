interface LabelledValue {
  label: string,
  size: number
}

function printa (labelObj: LabelledValue) {
  console.log(labelObj)
}

printa({label: '123', size: 10})

// 可选属性
interface Square {
  color: string,
  area: number
}

// color和width可选
interface SquareConfig {
  color?: string,
  width?: number
}

function createSquare (config: SquareConfig): Square {
  let resultSquare = {
    color: 'blur',
    area: 1000
  }
  if (config.color) {
    resultSquare.color = config.color
  }
  if (config.width) {
    resultSquare.area = config.width * config.width
  }
  return resultSquare
}

let newSquare = createSquare({color: 'black'})


// ---- 只读属性
interface Point {
  readonly x: number
  readonly y: number
}

let x: Point = {x: 10, y: 20}
// x.x = 100
// 不可变数组
let a: number[] = [1,2,3,4]
// 设置ro数组不能修改
let ro: ReadonlyArray<number> = a
// ro[0] = 2

// ------ 函数类型
// 其实是一个函数的声明
interface searchFunc {
  (source: string, subString: string): boolean
}
// 参数名称不需要和声明变量名称一致
let myFunc: searchFunc = function (src, sub) {
  return true
}

// ------- 索引类型
// 表示索引是数字，值是字符串
interface StringArray {
  [index: number]: string
}
let testIndex: StringArray = ['1']
let testValue: string = testIndex[0]

// ---- 只读的索引定义
interface readonlyStringArray {
  readonly [index: number]: string
}
let testIndex1: readonlyStringArray = ['1']
// testIndex1[1] = '222'
