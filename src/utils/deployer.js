const fs = require('fs')
const path = require('path')
const sWeb3 = require('web3')
// const Web3 = require('./web3')
const Web3 = require('cita-web3')
const contractUtils = require('./contract_utils')
const utils = require('./utils')

// const SERVER = 'http://39.104.94.244:1301'
const SERVER = 'http://47.75.129.215:1337'

const sweb3 = new sWeb3(SERVER)

const web3 = new Web3(new Web3.providers.HttpProvider(SERVER))

const account = sweb3.eth.accounts.create()

// const code = require('./contract_code')[':FileManage']

const from = account.address
const abiTo = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

const to = account.address

let commonParams = {}

// async function deployContract(contract, abi, bytecode) {
//   contract.new({ ...commonParams, data: bytecode }, (err, contract) => {
//     if (err) {
//       // logger.error('deploy contract fail with ' + err)
//       return
//     } else if (contract.address) {
//       myContract = contract
//       // logger.error('contract address: ' + myContract.address)
//       console.log('contract addrss: ' + myContract.address)
//       storeAbiToBlockchain(myContract.address, JSON.stringify(abi))

//       callMethodContract(myContract)
//     }
//   })
// }

const deployContract = (contract, abi, bytecode) => {
  return new Promise((resolve, reject) => {
    contract.new({ ...commonParams, data: bytecode }, (err, contract) => {
      if (err) {
        // logger.error('deploy contract fail with ' + err)
        reject(err)
        return
      } else if (contract.address) {
        myContract = contract
        resolve(myContract)
      }
    })
  })
    .then(async contract => {
      return await storeAbiToBlockchain(myContract, JSON.stringify(abi))
    })
    .then(contract => {
      return contract
    })
    .catch(err => {
      throw err
    })
}

/**
 * 上传abi至区块链
 * @param {string} abi
 */
const storeAbiToBlockchain = (contract, abi) => {
  const address = contract.address
  var hex = utils.fromUtf8(abi)
  if (hex.slice(0, 2) == '0x') hex = hex.slice(2)

  var code = (address.slice(0, 2) == '0x' ? address.slice(2) : address) + hex
  return new Promise((resolve, reject) => {
    web3.eth.sendTransaction(
      {
        ...commonParams,
        to: abiTo,
        data: code,
      },
      function(err, res) {
        if (err) {
          reject(err)
          // logger.error('send transaction error: ' + err)
        } else {
          resolve(contract)
        }
      },
    )
  })
}

module.exports = contract_code => {
  return new Promise((resolve, reject) => {
    const bytecode = contract_code.bytecode
    const abi = JSON.parse(contract_code.interface.replace(/\\/, ''))
    const contract = web3.eth.contract(abi)
    contractUtils.initBlockNumber(web3, function(params) {
      commonParams = params
      deployContract(contract, abi, bytecode)
        .then(ins => {
          console.log(ins.address)
          resolve(ins)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  })
}
