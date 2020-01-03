import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helps/headers'
import { createError } from '../helps/errors'
import { isURLSameOrigin } from '../helps/url';
import cookie from '../helps/cookie'
import { isFormdata } from '../helps/utils';

// 这个文件主要用于发送请求
export default function xhr (config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      methods = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()


    request.open(methods.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    function configureRequest (): void {
      if (responseType) {
        request.responseType = responseType
      }
  
      if (timeout) {
        request.timeout = timeout
      }
  
      // 跨域情况下是否需要带上凭证
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents () : void {
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

      // 添加上传/下载事件监听
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if ( onUploadProgress ) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders (): void {
      if ( isFormdata(data) ) {
        delete headers['Content-Type']
      }
  
      // 防范xsrf
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }
  
      Object.keys(headers || []).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers['name']
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel () {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    request.send(data)

    function handleReponse (response: AxiosResponse) {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(createError(`request failed with status code ${response.status}`, config, null, request, response))
      }
    }
  })
}