// 泛形是是指在类的声明初期，还不知道这个类的属性或者方法的类型，可以使用类似于类型变量的东西来描述这个类型，在类创建的时候再将真正的类型传递过去。
// 例子
// 在类的声明的时候，声明一个泛形变量type，这样类里面就可以用这个泛形变量了
var Ubiquitiform = /** @class */ (function () {
    function Ubiquitiform() {
    }
    return Ubiquitiform;
}());
// 在实例话的时候将type赋值为number，上面所有引用type的地方都会成为number
var myUbiquitform = new Ubiquitiform();
myUbiquitform.test = 1;
// 函数的声明必须放在下面
myUbiquitform.add = function (x, y) {
    return x + y;
};
console.log(myUbiquitform.add(2, 4));
