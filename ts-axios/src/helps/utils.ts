const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend <T, U> (to: T, from: U): T&U {
  for(let key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T&U
}

// 合并多一个对象，从右向左
export function deepMerge (...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        // val为要合并的每一个对象
        if (isPlainObject(val)) {
          // result[key]已经是一个对象，就将val对象的属性合并到result[key]中取
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            // 如果result[key]不是一个对象，但是val是一个对象，就拷贝一个出来
            result[key] = deepMerge(val)
          }
        // 如果val不是一个对象就直接赋值过去
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
