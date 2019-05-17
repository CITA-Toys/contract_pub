const svgCap = require('svg-captcha')
const transfer = require('../utils/transfer')
require('dotenv').config()

const microscopeAddr = 'https://microscope.cryptape.com'
const rebirthAddr = 'https://rebirth.cryptape.com'

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
  params.mainTitle = 'CITA Testnet Faucet'
  params.buttonLabel = 'Get Testnet Token'
  return await ctx.render('faucet/index', params)
}

const index = async (ctx, next) => {
  await renderIndex(ctx)
}

const checkAddress = (address) => {
  address = address.toLocaleLowerCase().replace(/^0x/, '')
  const size = address.length
  if (size !== 40) {
    throw "There's something wrong with the account address…"
  }
  return address
}

const sendNos = async (ctx, address, captcha) => {
  address = checkAddress(address)
  const requiredCaptcha = process.env.NODE_ENV === 'test' ? process.env.CAPTCHA : ctx.session.captcha

  if (requiredCaptcha !== captcha) {
    // 验证码错误
    throw 'Verification Code Errors !'
  }

  const res = await transfer(address, process.env.TRANSFER_COUNT || '0x021e19e0c9bab2400000')

  if (res.status === 'OK') {
    return res
  } else {
    throw "There's something wrong with the account address…"
  }
}

const getNos = async (ctx, next) => {
  let {
    address,
    captcha
  } = ctx.request.body

  captcha = captcha.toLocaleLowerCase()

  try {
    const res = await sendNos(ctx, address, captcha)
    // 成功
    const alert = `Successful! hash: ${res.hash}`
    const microscopeLink = `${microscopeAddr}?chain=${rebirthAddr}/#/transaction/${res.hash}`
    await renderIndex(ctx, {
      success: true,
      alert,
      microscopeLink
    })
  } catch (err) {
    // 地址错误或者其他
    const alert = err
    await renderIndex(ctx, {
      address,
      alert
    })
  }
}

const Faucet = {
  index,
  getNos,
}

module.exports = Faucet
