import { AxiosRequestConfig } from "../types";
import { isPlainObject, deepMerge } from '../helps/utils'

const strats = Object.create(null)

// 如果config2中有值就取config2的，没有的话就取config1
function defaultStrat (val1: any, val2: any): any {
  return val2 !== undefined ? val2 : val1
}

// 只取config2中的值
function fromVal2Strat (val1: any, val2: any): any {
  if (val2) {
    return val2
  }
}

// 深度合并策略函数
function deepMergeStrat (val1: any, val2: any): any {
  // 如果val2是一个对象，就直接合并val1和val2
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  // 如果不是一个普通对象就直接返回值
  } else if(typeof val2 !== 'undefined') {
    return val2
  // 如果只有val1是一个普通对象，就拷贝一份val1出来
  } else if(isPlainObject(val1)){
    return deepMerge(val1)
  // 否则就返回val1
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratsKeysFromVal2 = ['url', 'params', 'data']
stratsKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers', 'auth']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

// 对config进行合并
export default function mergeConfig (config1: AxiosRequestConfig, config2?: AxiosRequestConfig):AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)
  // config2的每一个key调用它对应的合并策略函数
  for(let key in config2) {
    mergeField(key)
  }

  // 对config1的中的key，但是没在config2中的每一个key调用合并的策略函数
  for(let key in config1) {
    if (!(key in config2)) {
      mergeField(key)
    }
  }

  function mergeField (key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}