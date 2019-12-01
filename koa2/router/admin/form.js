const router = require('koa-router')()
router.post('/login', async (ctx, next) => {
  ctx.body += '这里是1'
  await next()
  ctx.body += JSON.stringify(ctx.request.body)
}).post('/login', async (ctx, next) => {
  ctx.body += '这里是2'
  await next()
  ctx.body += '这里是3'
})

router.get('/form', async (ctx) => {
  await ctx.render('form', {
    name: 'littlenew'
  })
})

module.exports = router.routes()