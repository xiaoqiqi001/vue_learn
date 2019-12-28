import { AxiosRequestConfig }  from './types'
import { processHeaders } from './helps/headers';
import { transformRequest, transformResponse } from './helps/data';
// 请求的默认配置文件
const defaults: AxiosRequestConfig = {
  methods: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  transformRequest: [
    function (headers: any, data: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function (headers: any, data: any): any {
      return transformResponse(data)
    }
  ]
}

// 每一种请求方法对应的要往请求头里面的添加的字段和值
const methodsNoData = ['delete', 'get', 'head', 'options']
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-type': 'application/x-www-form-urlencoded'
  }
})

export default defaults


