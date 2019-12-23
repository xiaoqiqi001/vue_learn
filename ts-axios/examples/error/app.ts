import axios, { AxiosError } from '../../src/index'

// axios({
//   methods: 'get',
//   url: '/error/get1'
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e)
// })

// axios({
//   methods: 'get',
//   url: '/error/get'
// }).then((res) => {
//   console.log(res)
// }).catch((e) => {
//   console.log(e)
// })

// setTimeout(() => {
//   axios({
//     methods: 'get',
//     url: '/error/get'
//   }).then((res) => {
//     console.log(res)
//   }).catch((e) => {
//     console.log(e)
//   })
// }, 5000)

axios({
  methods: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.config)
})
