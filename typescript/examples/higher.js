var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// 交叉类型
// 将两个类型进行合并
// 合并两个对象：有两个参数和两个泛形，第一个参数的类型是T，第二个参数的类型是U，那么返回值就是T&U
function extend(origin, copy) {
    var result = __assign(__assign({}, origin), copy);
    return result;
}
var myTwoNumber = {
    a: 1,
    b: 2
};
var myTwoString = {
    c: 'fff',
    d: 'dddd'
};
console.log(extend(myTwoNumber, myTwoString));
