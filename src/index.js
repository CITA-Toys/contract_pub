const path = require('path')
const Koa = require('koa')
const BodyParser = require('koa-body')
const views = require('koa-views')

const router = require('./routes/index')

const app = new Koa()

app.use(
  views(path.join(__dirname, './views'), {
    extension: 'pug',
  }),
)

app.use(BodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('server')
})
