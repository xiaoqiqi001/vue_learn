var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = this.firstName + " " + this.lastName;
    }
    return User;
}());
function greeter(person) {
    console.log('hello ' + person.firstName + ' ' + person.lastName);
}
// let user:Person = {
//   firstName: 'little',
//   lastName: 'new'
// }
var user = new User('little', 'new');
greeter(user);
// 枚举类型
var Color;
(function (Color) {
    Color[Color["Red"] = 2] = "Red";
    Color[Color["Green"] = 4] = "Green";
    Color[Color["Blue"] = 5] = "Blue";
})(Color || (Color = {}));
var c = Color.Red;
var testEnum = Color[2]; // testEnum = 'Red'
console.log('testEnum is ', testEnum);
