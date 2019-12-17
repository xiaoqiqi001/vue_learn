import axios from '../../src/index'

axios({
  methods: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
