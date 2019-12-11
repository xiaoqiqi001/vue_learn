// 定义一个完成的函数类型
var test = function (x, y) {
    return x + y;
};
// -------- 可选参数
function test1(a, b) {
    return a + b;
}
test1('ssss');
// ------ 多余参数
// 可以使用otherArgu参数来获取传进来的多余的参数
function test2(a) {
    var otherArgu = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgu[_i - 1] = arguments[_i];
    }
    return a + otherArgu.join('');
}
test2(34444);
function reload(x) {
    if (x instanceof Array) {
        return x.join('');
    }
    return x;
}
reload(1);
function reload1(x) {
    if (x instanceof Array) {
        return x.join('');
    }
    return x;
}
reload1([1]);
