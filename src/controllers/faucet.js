const svgCap = require('svg-captcha')
const log = require('../log/index')
const transfer = require('../utils/transfer')

const newCaptcha = async (ctx) => {
  const opts = {
    color: true,
    noise: 3,
    height: 44,
  }
  const cap = svgCap.create(opts)
  ctx.session.captcha = cap.text.toLocaleLowerCase()
  return cap.data
}

const renderIndex = async (ctx, params = {}) => {
  params.svg = await newCaptcha(ctx)
  params.inputPlaceholder = 'Enter your account address here'
  params.mainTitle = 'Nervos AppChain Testnet Faucet'
  params.buttonLabel = 'Get Testnet Token'
  return await ctx.render('faucet/index', params)
}

const index = async (ctx, next) => {
  await renderIndex(ctx)
}

const checkAddress = (address) => {
  address = address.replace(/^0x/, '')
  const size = address.length
  if (size !== 40) {
    throw "There's something wrong with the account address…"
  }
}

const sendNos = async (ctx, address, captcha) => {
  checkAddress(address)

  if (ctx.session.captcha !== captcha) {
    // 验证码错误
    throw 'Verification Code Errors !'
  }

  const res = await transfer(address, '0x021e19e0c9bab2400000')
  // log('transfer res', res)

  if (res.status === 'OK') {
    return res
  } else {
    throw "There's something wrong with the account address…"
  }
}

const getNos = async (ctx, next) => {
  let { address, captcha } = ctx.request.body

  captcha = captcha.toLocaleLowerCase()

  try {
    const res = await sendNos(ctx, address, captcha)
    // 成功
    const alert = `Successful! hash: ${res.hash}`
    await renderIndex(ctx, { success: true, alert })
  } catch (err) {
    // 地址错误或者其他
    const alert = err
    await renderIndex(ctx, { address, alert })
  }
}

const Faucet = {
  index,
  getNos,
}

module.exports = Faucet
