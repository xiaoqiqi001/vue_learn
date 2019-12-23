import { isPlainObject } from './utils'

// 处理请求数据
export function transformRequest (data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 处理返回数据
export function transformResponse (data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    }catch(e) {
      // todo sth
    }
  }
  return data
}
