import axios from '../../src/index'

// 所有使用的开始
axios({
  methods: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log('返回值', res)
})

axios({
  methods: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then(res => {
  console.log('返回值', res)
})
