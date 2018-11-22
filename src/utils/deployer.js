const AppChain = require('@appchain/base').default
const {
  privateKey,
  chain
} = require('../config/chain')

const SERVER = chain
const appchain = AppChain(SERVER)

const account = appchain.base.accounts.privateKeyToAccount(privateKey)

const transaction = {
  from: account.address,
  nonce: 999999,
  quota: 1000000,
  chainId: 1,
  version: 1,
  value: '0x0'
};
module.exports = (contract_code) => {
  return new Promise((resolve, reject) => {
    const bytecode = contract_code.bytecode
    const args = contract_code.args
    console.log(args)
    const abi = JSON.parse(contract_code.interface.replace(/\\/, ''))
    appchain.base.getBlockNumber().then(currentHeight => {
      transaction.validUntilBlock = +currentHeight + 88
      new appchain.base.Contract(abi).deploy({
        data: bytecode,
        arguments: [args]
      }).send(transaction).then(txResult => {
        appchain.listeners.listenToTransactionReceipt(txResult.hash).then(receipt => {
          console.log(receipt)
          if (receipt.contractAddress) {
            appchain.base.storeAbi(receipt.contractAddress, abi, transaction).then(console.log)
          }
          resolve(receipt)
        })
      })
    }).catch(err => {
      reject(err)
    })
  })
}
