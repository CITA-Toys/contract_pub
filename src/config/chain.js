const Nervos = require('@nervos/chain').default
require('dotenv').config()

let chain = process.env.CHAIN
const nervos = Nervos(chain)

let privateKey = process.env.PRIVATE_KEY

const account = nervos.eth.accounts.privateKeyToAccount(privateKey)

const transaction = {
  from: account.address.toLocaleLowerCase().slice(2),
  // from: account.address,
  privateKey,
  nonce: 999999,
  quota: 1000000,
  chainId: 1,
  version: 0,
  validUntilBlock: 999999,
  value: '',
}

module.exports = {
  chain,
  privateKey,
  nervos,
  account,
  transaction,
}
