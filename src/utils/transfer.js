const chalk = require('chalk')
const log = require('../log/index')
const {
  citaSDK,
  transaction
} = require('../config/chain')

const transfer = async (to, value) => {

  log('start transfer from', transaction.from, 'to', to, 'transer', value)

  const current = await citaSDK.base.getBlockNumber()

  const tx = {
    ...transaction,
    to,
    value,
    validUntilBlock: +current + 88,
  }

  return await citaSDK.base.sendTransaction(tx)
}

module.exports = transfer
