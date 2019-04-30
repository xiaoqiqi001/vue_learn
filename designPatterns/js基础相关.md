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
    func(); // 1 2 3
```

2. 第一个函数柯里化
```javascript
    // 使用最外层的函数来存储计算所有数据的函数和存入的所有数据
    let cost = function(fn){
      let args = []
      return function(){
        if (arguments.length === 0) {
          return fn.apply(this, args)
        }else{
          [].push.apply(args, arguments)
        }
      }
    }

    function getAll(){
      let money = 0
      Array.prototype.forEach.call(arguments, item => {
        money += item
      })
      return money
    }

    let myCost = cost(getAll)
    myCost(1)
    myCost(1)
    myCost(1)
    console.log(myCost()) // 3
```

3. 节流函数
```javascript
    // 接收一个事件响应函数，返回节流函数
    // 可以看出闭包大多数用来处理对一个函数进行修饰，返回另一个函数这种情况
    let saveStream = function(fn, interval){
      // 是否为第一次调用
      let firstTime=true,
        // 当前函数对象 
        __self=fn, 
        timer
      return function () {
        // 使用__me来存储当函数的当前对象
        let args = arguments, __me = this
        if (firstTime) {
          __self.apply(__me, args)
          return firstTime = false
        }
        if (timer) {
          return false
        }
        timer = setTimeout(() => {
          clearTimeout(timer)
          timer = null
          fn.apply(__me, args)
        }, interval || 500)
      }
    }
```