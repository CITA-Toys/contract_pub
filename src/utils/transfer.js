const chalk = require('chalk')
const log = require('../log/index')
const {
  appchain,
  transaction
} = require('../config/chain')

const transfer = async (to, value) => {

  log('start transfer from', transaction.from, 'to', to, 'transer', value)

  const current = await appchain.base.getBlockNumber()

  const tx = {
    ...transaction,
    to,
    value,
    validUntilBlock: +current + 88,
  }

  return await appchain.base.sendTransaction(tx)
}

module.exports = transfer
