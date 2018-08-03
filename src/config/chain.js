const Nervos = require('@nervos/web3').default
require('dotenv').config()

let chain = process.env.CHAIN

let privateKey = process.env.PRIVATE_KEY
const nervos = Nervos(chain)

const account = nervos.eth.accounts.privateKeyToAccount(privateKey)

const transaction = {
  from: account.address,
  privateKey,
  nonce: 999999,
  quota: 1000000,
  chainId: 1,
  version: 0,
  validUntilBlock: 999999,
  value: '',
}

if (process.env.USE_PRIVATE_CONFIG) {
  const {
    privateKey: key,
    chain: _chain,
  } = require('./private')
  privateKey = key
  chain = _chain
}

module.exports = {
  chain,
  privateKey,
  nervos,
  account,
  transaction,
}
