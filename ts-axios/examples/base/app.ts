import axios from '../../src/index'

// axios({
//   methods: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   methods: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   methods: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   methods: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   methods: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   methods: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   methods: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// axios({
//   methods: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21, 31])

// axios({
//   methods: 'post',
//   url: '/base/buffer',
//   data: arr
// })

axios({
  methods: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

axios({
  methods: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;'
  },
  data: {
    a: 1,
    b: 2
  }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  methods: 'post',
  url: '/base/post',
  data: searchParams
})

