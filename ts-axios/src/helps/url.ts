import { isDate, isPlainObject } from './utils'

interface URLOrigin {
  protocol: string
  host: string
}

function encode (url: string): string {
  return encodeURIComponent(url)
    .replace(/%40/g, '@')
    .replace(/%3a/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2c/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5b/ig, '[')
    .replace(/%5d/ig, ']')
}

export function buildUrl (url: string, params?: any): string {
  if (!params) {
    return url
  }

  let parts: string[] = []

  // 对params里面的每一个属性进行处理
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 如果获取到的属性值是空就跳过
    if (val === null || val === undefined) {
      return
    }
    let values = []
    // 将所有的属性值都设置为数组，如果真正的数组，就把key设置为key[]
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    // 对values的每一个值进行处理，并且放入数组
    values.forEach(valEle => {
      if (isDate(valEle)) {
        valEle = val.toISOString()
      } else if(isPlainObject(valEle)) {
        valEle = JSON.stringify(valEle)
      }
      parts.push(`${encode(key)}=${encode(valEle)}`)
    })
  })
  // 组合
  let serializedParams = parts.join('&')
  if (serializedParams) {
    // 如果url上有哈希值，就截断
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 如果url上本来就有查询串，就把查询串拼上去
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}

function isNullOrUnd(val: any): val is null | undefined {
  return val === null || val === undefined
}

const urlParsingNode = document.createElement('a')
const curOrigin = resolveURL(window.location.href)
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (parsedOrigin.protocol === curOrigin.protocol && parsedOrigin.host === curOrigin.host)
}

