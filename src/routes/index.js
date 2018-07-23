const Router = require('koa-router')
const controller = require('../controllers/contracts')
const controllerFaucet = require('../controllers/faucet')
const controllerHome = require('../controllers/home')
const log = require('../log/index')

const router = new Router()

router.get('', controllerHome.index)

router.get('/static', controllerHome.index)

router.get('/faucet', controllerFaucet.index)
router.post('/faucet/getNos', controllerFaucet.getNos)
router.get('/faucet/getNos', controllerFaucet.index)

router.get('/contracts', controller.index)
router.get('/contracts/new', controller.new)
router.post('/contracts/create', controller.create)
router.get('/contracts/attack/:rounds', controller.attack)

module.exports = router
