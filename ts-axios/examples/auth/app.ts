import axios from '../../src/index'

axios.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'Yee',
    password: '123456'
  }
}).then(res => {
  console.log(res)
})

