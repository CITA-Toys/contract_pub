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
const abiTo = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

/**
 * 上传abi至区块链
 * @param {string} abi
 */
const storeAbiToBlockchain = (contractAddress, abi) => {
  console.log(chalk.blue('Start to store abi'))
  console.log(chalk.yellow(`contract address: ${contractAddress}`))
  const address = contractAddress
  var hex = nervos.utils.fromUtf8(JSON.stringify(abi))
  if (hex.slice(0, 2) == '0x') hex = hex.slice(2)

  var code = (address.slice(0, 2) == '0x' ? address.slice(2) : address) + hex
  console.log('code')
  console.log(chalk.blue(code))
  return new Promise((resolve, reject) => {
    return nervos.appchain.getBlockNumber().then(current => {
      return nervos.appchain.sendTransaction({
        ...transaction,
        validUntilBlock: current + 88,
        to: abiTo,
        data: code,
      }).then(res => {
        console.log(chalk.yellow(JSON.stringify(res)))
        resolve(res)
      }).catch(err => reject(err))

    })
  }).catch(err => console.error(err))
}


module.exports = contract_code => {
  return new Promise((resolve, reject) => {
    const bytecode = contract_code.bytecode
    const abi = JSON.parse(contract_code.interface.replace(/\\/, ''))
    // const contract = new nervos.appchain.Contract(abi)
    return nervos.appchain.deploy(bytecode, transaction).then(contractResult => {
      if (contractResult && contractResult.contractAddress) {
        const contract = new nervos.appchain.Contract(abi, contractResult.contractAddress)
        storeAbiToBlockchain(contractResult.contractAddress, abi)
        resolve({
          contractResult,
          contract,
        })
      }
      reject(contractResult)
    })
  })
}
