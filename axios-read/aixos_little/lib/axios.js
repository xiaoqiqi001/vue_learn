var Promise = require('es6-promise').Promise;

// axios请求主体
function axios(options) {
  // 给options选项给一个默认的method get
  options = merge({
    method: 'get'
  }, options);

  var promise = new Promise(function (resolve, reject) {
    var request = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');

    // xhr请求成功的时候，将结果集解析并返回
    function onload() {
      if (request.status >= 200 && request.status < 300) {
        resolve(parse(request.responseText));
      } else {
        onerror();
      }
    }

    function onerror() {
      reject(new Error('Can\'t connect to ' + JSON.stringify(options.url)));
    }

    try {
      request.open(options.method, options.url, true);
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          onload();
        }
      };

      request.onload = request.load = onload;
      request.onerror = request.error = onerror;

      // 合并默认头、默认头上的方法和options头上的方法
      var headers = merge(
        defaults.headers.common,
        defaults.headers[options.method] || {},
        options.headers || {}
      );

      // 设置所有的请求头
      for (var key in headers) {
        request.setRequestHeader(key, headers[key]);
      }
    } catch (e) {
      reject(e);
    }

    request.send(options.data || null);
  });

  promise.success = function (fn) {
    promise.then(function(response) {
      fn(response);
    });
    return promise;
  };

  promise.error = function(fn) {
    promise.then(null, function(response) {
      fn(response);
    });
    return promise;
  };

  return promise;
}

// 请求表单数据类型
var CONTENT_TYPE_APPLICATION_JSON = {'Content-Type': 'application/json;charset=utf-8'};
var defaults = axios.defaults = {
  headers: {
    common: {'Accept': 'application/json, text/plain, */*'},
    patch: merge(CONTENT_TYPE_APPLICATION_JSON),
    post: merge(CONTENT_TYPE_APPLICATION_JSON),
    put: merge(CONTENT_TYPE_APPLICATION_JSON)
  }
};

// 对结果集进行解析
function parse(response) {
  // 如果是json串，就返回解析结果，如果不是就直接返回结果集
  try {
    return JSON.parse(response);
  } catch(e) {
    return response;
  }
}

// 将参数上的所有对象，从左向右合并，合并成一个大对象，返回
function merge() {
  var result = {};
  forEach(arguments, function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key];
      }
    }
  });
  return result;
}

// 对数组中的每一个元素执行fn函数
function forEach(arr, fn) {
  for (var i=0, l=arr.length; i<l; i++) {
    fn.call(null, arr[i], i, arr);
  }
}

// 给axios对象挂上属性名称为get, delete, head的请求方法
function createShortMethods() {
  forEach(arguments, function (method) {
    axios[method] = function (url, options) {
      // 每个函数返回一个axios对象，而且这个对象方法已经确定
      return axios(merge(options || {}, {
        method: method,
        url: url
      }));
    };
  });
}

// 给axios对象挂上属性名称为post, put, putch的请求方法
function createShortMethodsWithData() {
  forEach(arguments, function (method) {
    axios[method] = function (url, data, options) {
      return axios(merge(options || {}, {
        method: method,
        url: url,
        data: data
      }));
    };
  });
}

createShortMethods('delete', 'get', 'head');
createShortMethodsWithData('post', 'put', 'patch');

module.exports = axios;
