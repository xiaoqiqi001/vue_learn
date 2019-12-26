import { AxiosRequestConfig, AxiosPromise, Methods, AxiosResponse, ResolvedFn, RejectedFn } from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig';

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise),
  rejected?: RejectedFn
}


export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor (initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request (url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {} as AxiosRequestConfig
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)

    let chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while(chain.length) {
      let { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  // 下面调用的
  get (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._reqeustMethodWithoutData(url, 'get', config)
  }

  delete (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._reqeustMethodWithoutData(url, 'delete', config)
  }

  head (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._reqeustMethodWithoutData(url, 'head', config)
  }

  options (url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._reqeustMethodWithoutData(url, 'options', config)
  }

  post (url: string, data?: any,  config?: AxiosRequestConfig): AxiosPromise {
    return this._reqeustMethodWithData(url, 'post', data, config)
  }

  put (url: string, data?: any,  config?: AxiosRequestConfig): AxiosPromise {
    return this._reqeustMethodWithData(url, 'put', data, config)
  }

  patch (url: string, data?: any,  config?: AxiosRequestConfig): AxiosPromise {
    return this._reqeustMethodWithData(url, 'patch', data, config)
  }

  _reqeustMethodWithoutData (url: string, method: Methods, config?: AxiosRequestConfig): AxiosPromise {
    // return dispatchRequest(Object.assign(config || {}, {
    //   methods: method,
    //   url: url
    // }))
    return this.request(Object.assign(config || {}, {
      methods: method,
      url: url
    }))
  }

  _reqeustMethodWithData (url: string, method: Methods, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    // return dispatchRequest(Object.assign(config || {}, {
    //   methods: method,
    //   url: url,
    //   data
    // }))
    return this.request(Object.assign(config || {}, {
      methods: method,
      url: url,
      data
    }))
  }
}