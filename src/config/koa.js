require('dotenv').config()

const session = {
  key: process.env.APP_SESSION_KEY /** (string) cookie key (default is koa:sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true,
  /** (boolean) can overwrite or not (default true) */
  httpOnly: true,
  /** (boolean) httpOnly or not (default true) */
  signed: true,
  /** (boolean) signed or not (default true) */
  rolling: false,
  /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/,
}

let keys = process.env.APP_KEYS.split(',')

if (process.env.USE_PRIVATE_CONFIG) {
  const { sessionKey, appKeys } = require('./private')
  session.key = sessionKey
  keys = appKeys
}

module.exports = {
  session,
  keys,
}
