import { AxiosRequestConfig } from './types/index'

export default function xhr (config: AxiosRequestConfig): void {
  const {data = null, url, methods = 'get', headers} = config

  const request = new XMLHttpRequest()
  request.open(methods.toUpperCase(), url, true)
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers['name']
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}