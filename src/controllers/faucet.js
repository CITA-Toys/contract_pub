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
  return await ctx.render('faucet/index', params)
}

const index = async (ctx, next) => {
  await renderIndex(ctx)
}

const sendNos = async (ctx, address, captcha) => {
  if (ctx.session.captcha !== captcha) {
    throw '验证码错误'
  }

  const res = await transfer(address, '0x10')

  if (res.status === 'OK') {
    return res
  } else {
    log(res)
    throw '交易失败'
  }
}

const getNos = async (ctx, next) => {
  let {
    address,
    captcha,
  } = ctx.request.body

  captcha = captcha.toLocaleLowerCase()

  try {
    const res = await sendNos(ctx, address, captcha)
    await renderIndex(ctx, {success: true, hash: res.hash})
  } catch (err) {
    await renderIndex(ctx, {address, alert: err})
  }
}

const Faucet = {
  index,
  getNos,
}

module.exports = Faucet
