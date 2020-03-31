const CITASDK = require('@citahub/cita-sdk').default
require('dotenv').config()

let chain = process.env.CHAIN
const citaSDK = CITASDK(chain)

let privateKey = process.env.PRIVATE_KEY

const account = citaSDK.base.accounts.privateKeyToAccount(privateKey)
citaSDK.base.accounts.wallet.add(account)

const transaction = {
  from: account.address,
  nonce: 999999,
  quota: 1000000,
  chainId: 1,
  version: 2,
  validUntilBlock: 999999,
  value: '',
}

module.exports = {
  chain,
  privateKey,
  citaSDK,
  account,
  transaction,
}
