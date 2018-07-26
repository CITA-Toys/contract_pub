const Nervos = require('@nervos/web3').default
const chalk = require('chalk')
const {
  privateKey,
  chain
} = require('../config/chain')

const SERVER = chain
const nervos = Nervos(SERVER)

const account = nervos.eth.accounts.privateKeyToAccount(privateKey)

const transaction = {
  from: '0xb4061fA8E18654a7d51FEF3866d45bB1DC688717',
  privateKey: account.privateKey,
  nonce: 999999,
  quota: 1000000,
  chainId: 1,
  version: 0,
  value: '0x0'
};
module.exports = (contract_code) => {
  return new Promise((resolve, reject) => {
    const bytecode = contract_code.bytecode
    const args = contract_code.args
    console.log(args)
    const abi = JSON.parse(contract_code.interface.replace(/\\/, ''))
    nervos.appchain.getBlockNumber().then(currentHeight => {
      transaction.validUntilBlock = +currentHeight + 88
      new nervos.appchain.Contract(abi).deploy({
        data: bytecode,
        arguments: [args]
      }).send(transaction).then(txResult => {
        nervos.listeners.listenToTransactionReceipt(txResult.hash).then(receipt => {
          console.log(receipt)
          if (receipt.contractAddress) {
            nervos.appchain.storeAbi(receipt.contractAddress, abi, transaction).then(console.log)
          }
          resolve(receipt)
        })
      })
    }).catch(err => {
      reject(err)
    })
  })
}
