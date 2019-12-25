import { AxiosTransformer } from "../types";

export default function transform (headers: any, data: any, fns?: AxiosTransformer | AxiosTransformer[]): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(headers, data)
  })
  return data
}