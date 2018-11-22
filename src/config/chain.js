const AppChain = require('@appchain/base').default
require('dotenv').config()

let chain = process.env.CHAIN
const appchain = AppChain(chain)

let privateKey = process.env.PRIVATE_KEY

const account = appchain.base.accounts.privateKeyToAccount(privateKey)
appchain.base.accounts.wallet.add(account)

const transaction = {
  from: account.address,
  nonce: 999999,
  quota: 1000000,
  chainId: 1,
  version: 1,
  validUntilBlock: 999999,
  value: '',
}

module.exports = {
  chain,
  privateKey,
  appchain,
  account,
  transaction,
}
