import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseHeaders } from './helps/headers'
import { createError } from './helps/errors'

export default function xhr (config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {data = null, url, methods = 'get', headers, responseType, timeout} = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers['name']
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.open(methods.toUpperCase(), url!, true)

    request.onerror = function handlError() {
      reject(
        createError('Network Error', config, null, request)
      )
    }

    request.ontimeout = function handleTimeout () {
      reject(
        createError(`Timeout of ${timeout}`, config, 'ECONNABORTED', request)
      )
    }

    request.onreadystatechange = function handleLoad () {
      if (request.status === 0) {
        return
      }
      if (request.readyState === 4) {
        const responseHeader = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType === 'text' ? request.responseText : request.response
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeader,
          config: config,
          request
        }
        handleReponse(response)
      }
    }

    request.send(data)

    function handleReponse (response: AxiosResponse) {
      if (response.status >= 200 && response.status <300) {
        resolve(response)
      } else {
        reject(createError(`request failed with status code ${response.status}`, config, null, request, response))
      }
    }
  })
}