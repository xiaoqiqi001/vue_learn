import { AxiosRequestConfig } from './types/index'
import { buildUrl } from './helps/url'
import xhr from './xhr'
import { transformRequest } from './helps/data'
import { processHeaders } from './helps/headers'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl (config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

function transformRequestData (config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders (config: AxiosRequestConfig): any {
  const {headers = {}, data} = config
  return processHeaders(headers, data)
}

export default axios
