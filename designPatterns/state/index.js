const StateMachine = require('javascript-state-machine')

//初始化状态机模型
let fsm = new StateMachine({
  init: '收藏',
  transitions: [
    {
      name: 'doStore',
      from: '收藏',
      to: '取消收藏'
    },
    {
      name: 'deleteStore',
      from: '取消收藏',
      to: '收藏'
    }
  ],
  methods: {
    // 执行收藏
    onDoStore () {
      console.log('收藏成功')
    },
    // 监听取消收藏
    onDeleteStore () {
      console.log('监听取消收藏')
    }
  }
})

function test() {
  if (fsm.is('收藏')) {
    fsm.doStore()
  } else {
    fsm.deleteStore()
  }
  setTimeout(test, 1000)
}
test()