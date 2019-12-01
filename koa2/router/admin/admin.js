const router = require('koa-router')()
const form = require('./form')

router.use('/admin', form)

module.exports = router.routes()
