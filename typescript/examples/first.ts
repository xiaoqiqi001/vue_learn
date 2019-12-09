class User {
  fullName: string
  firstName: string
  lastName: string

  constructor (firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = `${this.firstName} ${this.lastName}`
  }
}

interface Person {
  firstName: string,
  lastName: string
}

function greeter (person: Person) {
  console.log('hello ' + person.firstName + ' ' + person.lastName)
}

// let user:Person = {
//   firstName: 'little',
//   lastName: 'new'
// }

let user = new User('little', 'new')

greeter(user)

// 枚举类型
enum Color {
  Red = 2,
  Green = 4,
  Blue = 5
}

let c:Color = Color.Red

let testEnum: string = Color[2] // testEnum = 'Red'

console.log('testEnum is ', testEnum)

let notSure: any = 4
notSure = '123'
notSure = true
let notSureArr: any[] = [1,2,3]

function test(): void {
  console.log(111)
}

// never表示函数不会正常返回
function rejectError(): never {
  throw new Error('111')
}

let testObj: Object = '111'
testObj = 2222

// 类型转换，强制将any转换成string
let someValue: any = '123'
console.log('someValue.length is ', (<string>someValue).length)
console.log('someValue.length is ', (someValue as string).length)

// 定义一个函数，接收一个对象，两个属性，第一个属性是string类型，第二个是可选类型的number类型
function whole(wholeArgu: {a: string, b?: number}) {
  // 如果没有传b属性，就给一个默认值1000
  let {a, b = 1000} = wholeArgu
  console.log(a, b)
}