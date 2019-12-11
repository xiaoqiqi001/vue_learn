// ------- 类声明接口
// interface ClockInterface {
//   currentTime: Date
//   setTime(d: Date)
// }
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// // 这里的MyClock类就实现了ClockInterface接口，所以它必须实现接口里面的方法和拥有接口里面的属性
// class MyClock implements ClockInterface {
//   currentTime: Date
//   constructor (d: Date) {
//     this.currentTime = d
//   }
//   setTime (d: Date) {
//     this.currentTime = d
//   }
// }
// -------- 构造函数声明和类声明
// interface ClockInterface {
//   tick()
// }
// // 类的构造器接口定义
// interface ClockContruct {
//   new(hour: number, minute: number): ClockInterface
// }
// // 工厂方法：创建Clock相关类的实例
// // 构造器接口的定义其实是对类的构造函数的定义进行描述
// function createClock (ctor: ClockContruct, hour: number, minute: number): ClockInterface {
//   return new ctor(hour, minute)
// }
// class DigitalClock implements ClockInterface {
//   hour: number
//   minute: number
//   constructor(hour: number, minute: number) {
//     this.hour = hour
//     this.minute = minute
//   }
//   tick() {
//     console.log('didididi1')
//   }
// }
// class AnalogClock implements ClockInterface {
//   hour: number
//   minute: number
//   constructor(hour: number, minute: number) {
//     this.hour = hour
//     this.minute = minute
//   }
//   tick () {
//     console.log('didididi2')
//   }
// }
// let digital = createClock(DigitalClock, 12, 22)
// let analog = createClock(AnalogClock, 21, 22)
// -------- 子类和父类继承并在子类中调用父类函数的例子
// class Animal {
//   name: string
//   constructor(name: string) {
//     this.name = name
//   }
//   move (distance: number = 5) {
//     console.log(`${this.name} move ${distance}m`)
//   }
// }
// class Horse extends Animal {
//   constructor (name: string) {
//     super(name)
//   }
//   move(distance: number = 50) {
//     console.log('gogogo!')
//     super.move(distance)
//   }
// }
// let horse: Animal = new Horse('ma')
// horse.move(52)
// 类的private、protected
// class Person {
//   protected name: string
//   // 将构造函数设置为受保护的
//   protected constructor(name: string) {
//     this.name = name
//   }
// }
// class Employee extends Person {
//   private department: string
//   constructor(name: string, department: string) {
//     super(name)
//     this.department = department
//   }
//   getElvaterPitch(): string {
//     return `hello, my name is ${this.name}, and I work in ${this.department}`
//   }
// }
// let littlenew = new Employee('littlenew', 'sales')
// // console.log(littlenew.name) // xxxxxxxxxx
// // console.log(littlenew.department) // xxxxxxxxxxx
// console.log(littlenew.getElvaterPitch())
// // let test = new Person('test') // xxxxxxxxxx
//  ----------- readonly修饰符
// class Person {
//   // 设置name为只读的
//   readonly name: string
//   constructor(name: string) {
//     this.name = name
//   }
// }
// let littlenew = new Person('littlenew')
// littlenew.name = 'test' // xxxxxxxxx
// ---------- 类属性的存取器
// class Login {
//   private _fullName: string
//   get fullName(): string {
//     console.log('你怎么突然想知道我叫什么名字呢')
//     return this._fullName
//   }
//   set fullName(name: string) {
//     console.log('你来给我起外号了？')
//     this._fullName = name
//   }
// }
// let login: Login = new Login;
// login.fullName = '123'
// console.log(login.fullName)
// // tsc class.ts -target es5
// ----------- 类的静态属性
// class Grid {
//   static origin = {x: 0, y: 0}
//   scala: number
//   constructor (scala: number) {
//     this.scala = scala
//   }
//   calc (point: {x: number, y: number}) {
//     let xDis: number = point.x - Grid.origin.x
//     let yDis: number = point.y - Grid.origin.y
//     return Math.sqrt(xDis * xDis + yDis * yDis) * this.scala
//   }
// }
// let p1: Grid = new Grid(5)
// console.log(p1.calc({x: 3, y: 4}))
// ---------- 抽象类
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log("Department name is " + this.name);
    };
    return Department;
}());
var ADepartment = /** @class */ (function (_super) {
    __extends(ADepartment, _super);
    function ADepartment() {
        return _super.call(this, 'ln') || this;
    }
    ADepartment.prototype.printMeeting = function () {
        console.log("meet next morning.");
    };
    ADepartment.prototype.printOther = function () {
        console.log('11111');
    };
    return ADepartment;
}(Department));
// 声明一个变量是抽象类类型
var ln = new ADepartment();
ln.printMeeting();
// 上面这个Department类型的变量只能调用抽象类中定义的属性和函数
// ADepartment类中的属性就不能被调用了
// ln.printOther() // xxxxxxxxxx
