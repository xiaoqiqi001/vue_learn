import axios from '../../src/axios'
import qs from 'qs'
import { AxiosTransformer } from '../../src/types';

axios.defaults.headers.common['test2'] = 123

// axios({
//   url: '/config/post',
//   methods: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// }).then(res => {
//   console.log(res)
// })

// axios({
//   transformRequest: [(function(headers, data) {
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/config/post',
//   methods: 'post',
//   data: {
//     a: 1
//   }
// }).then((res) => {
//   console.log(res.data)
// })

const instance = axios.create({
  transformRequest: [(function(headers, data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})

instance({
  url: '/config/post',
  methods: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
