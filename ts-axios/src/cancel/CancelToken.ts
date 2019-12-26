import { CancelExecutor, CancelTokenSource, Canceler } from "../types";
import Cancel from './Cancel'


interface ResolvePromise {
  (reason: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor (executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise(resolve => {
      resolvePromise = resolve
    })

    // 要取消请求的时候执行的函数，通过闭包将this.reason和resolvePromise函数都保存起来
    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      // 要取消请求的时候就把上面的promise设置成relove状态，xhr文件中的then中会执行request.abort
      resolvePromise(this.reason)
    })
  }

  // 判断异常有没有被使用过
  throwIfRequested () {
    if (this.reason) {
      throw this.reason
    }
  }

  static source (): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel,
      token
    }
  }
}