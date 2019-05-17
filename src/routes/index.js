const Router = require('koa-router')
const controllerFaucet = require('../controllers/faucet')
const controllerHome = require('../controllers/home')
const log = require('../log/index')

const router = new Router()

router.get('', controllerHome.index)

router.get('/static', controllerHome.index)

router.get('/faucet', controllerFaucet.index)
router.post('/faucet/getNos', controllerFaucet.getNos)
router.get('/faucet/getNos', controllerFaucet.index)


module.exports = router
