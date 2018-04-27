const Router = require('koa-router')
const controller = require('../controllers/contracts')
const router = new Router({
  prefix: '/contracts',
})

router.get('/new', controller.new)
router.post('/create', controller.create)
module.exports = router
