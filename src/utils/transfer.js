const chalk = require('chalk')
const log = require('../log/index')
const { chain, privateKey, nervos, account, transaction } = require('../config/chain')

const checkBalance = async (to) => {
  const balance = await nervos.appchain.getBalance(to)
  console.log(chalk.green.bold(`Now ${to} has balance of ${balance}`))
}

const transfer = async (to, value) => {

  log('start transfer from', transaction.from, 'to', to, 'transer', value)

  const current = await nervos.appchain.getBlockNumber()

  const tx = {
    ...transaction,
    to,
    value,
    validUntilBlock: +current + 88,
  }

  return await nervos.appchain.sendTransaction(tx)
}

module.exports = transfer
