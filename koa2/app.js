const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const koaViews = require('koa-views')
const serve = require('koa-static')
const session = require('koa-session');
const admin = require('./router/admin/admin')
const index = require('./router/index')

const app = new Koa()

app.keys = ['some secret hurr'];
 
const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app));
// app.use(async ctx => {
//   ctx.body = "fuck"
// })

app.use(
  koaViews('views', {
    map: {
      html: 'ejs'
    }
  })
)

app.use(serve(__dirname + '/views'))

app.use(bodyParser())

// router.get('/', async (ctx, next) => {
//   ctx.body = '11111'
//   next()
// }).get('/', async (ctx, next) => {
//   ctx.body += JSON.stringify(ctx.query)
//   next()
// }).get('/:id?', async (ctx, next) => {
//   ctx.body = JSON.stringify(ctx.params)
//   next()
// })
// router.get('/news', async ctx => {
//   ctx.body = '222222'
// })

app.use(async (ctx, next) => {
  // 这里是全局处理
  // ctx.body = ''
  console.log('这里是cookie', ctx.cookies.get('token'))
  console.log('这里是session', ctx.session.test)
  await next()
  if (ctx.status === 404) {
    ctx.status = 404
    await ctx.render('404', {
      name: '404'
    })
  }
  ctx.cookies.set('token', '123', {
    maxAge: 10 * 1000
  })
  ctx.session.test = 'aaa';
})

router.use('/admin', admin)
router.use(index)

app.use(router.routes()).use(router.allowedMethods())

app.listen(8088)
