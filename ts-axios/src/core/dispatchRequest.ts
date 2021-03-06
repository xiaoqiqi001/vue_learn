import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { buildUrl, isAbsoluteURL, combineURL } from '../helps/url'
import xhr from './xhr'
import { transformRequest, transformResponse } from '../helps/data'
import { processHeaders, flattenHeaders } from '../helps/headers'
import transform from './transform'

// 这个文件主要处理主请求：对请求头，请求数据进行处理，对是否重复使用cancel进行判断，返回请求结果
// 其他所有的程序调用的axios函数，接收一个AxiosRequestConfig类型的参数，返回一个AxiosPromise类型的值
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 检查config.cancelToken有没有被使用过
  throwIfCancellationRequested(config)
  // 处理请求的配置
  processConfig(config)
  // 发送请求
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理请求配置的主函数，接收一个AxiosRequestConfig类型的参数
function processConfig(config: AxiosRequestConfig): void {
  // 处理请求的url
  config.url = transformUrl(config)
  // 处理请求头
  // config.headers = transformHeaders(config)
  // 处理请求的数据
  // config.data = transformRequestData(config)
  config.data = transform(config.headers, config.data, config.transformRequest)
  // 对请求头里面属性值进行整理和删除
  config.headers = flattenHeaders(config.headers, config.methods!)
}

// 处理请求配置中的url
export function transformUrl (config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!) ) {
    url = combineURL(baseURL, url)
  }
  return buildUrl(url!, params, paramsSerializer)
}

// 处理请求的数据
function transformRequestData (config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 处理请求头
function transformHeaders (config: AxiosRequestConfig): any {
  const {headers = {}, data} = config
  return processHeaders(headers, data)
}

// 处理返回的数据
function transformResponseData (res: AxiosResponse) : AxiosResponse {
  // res.data = transformResponse(res.data)
  res.data = transform(res.headers, res.data, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested (config: AxiosRequestConfig):void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
