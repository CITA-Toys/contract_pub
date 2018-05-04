const path = require('path')
const Koa = require('koa')
const BodyParser = require('koa-body')
const views = require('koa-views')
const serve = require('koa-static')

const router = require('./routes/index')

const app = new Koa()

app
  .use(
    views(path.join(__dirname, './views'), {
      extension: 'pug',
    }),
  )
  .use(serve('./public'))

app.use(BodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(8095, () => {
  console.log('server')
})
