const path = require('path')
const Koa = require('koa')
const session = require('koa-session')
const BodyParser = require('koa-body')
const views = require('koa-views')
const serve = require('koa-static')
const log = require('./log/index')
const router = require('./routes/index')
const config = require('./config/koa')


// const test = () => {
//   app.use(async (ctx, next) => {
//     const start = Date.now()
//     await next()
//     const ms = Date.now() - start
//     ctx.set('X-Response-Time', `${ms}ms`)
//     log(1, start)
//   })
//
// // logger
//
//   app.use(async (ctx, next) => {
//     const start = Date.now()
//     await next()
//     const ms = Date.now() - start
//     log(2, start)
//     console.log(`${ctx.method} ${ctx.url} - ${ms}`)
//   })
//
// // response
//
//   app.use(async ctx => {
//     const start = Date.now()
//     log(3, start)
//     ctx.body = 'Hello World'
//   })
// }
//
// // test()

const appinited = () => {
  const app = new Koa()

  app.keys = config.keys

  app.use(session(config.session, app))

  app.use(
    views(path.join(__dirname, './views'), {
      extension: 'pug',
    }),
  )
    .use(serve('./public'))

  app.use(BodyParser())

  app.use(router.routes())

  app.use(router.allowedMethods())

  return app
}

const appstart = (app) => {
  app.listen(8095, () => {
    log('start server')
  })
}

const main = () => {
  const app = appinited()
  appstart(app)
}

main()
