1. 使用js实现一个AOP
```javascript
    Function.prototype.before = function( beforefn ){
      var __self = this; // 保存原函数的引用
      return function(){ // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply( this, arguments ); // 执行新函数，修正this
        return __self.apply( this, arguments ); // 执行原函数
      }
    };
    Function.prototype.after = function( afterfn ){
      //从下面的链式调用可以看出，这里的__self指向的是上面的before返回的函数
      var __self = this;
      return function(){
        // 先执行了before返回的函数
        var ret = __self.apply( this, arguments );
        afterfn.apply( this, arguments );
        return ret;
      }
    };
    // 定义原函数
    var func = function(){
      console.log( 2 );
    };
    func = func.before(function(){
      console.log( 1 );
    }).after(function(){
      console.log( 3 );
    });
    func();
```