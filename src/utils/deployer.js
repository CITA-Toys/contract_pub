const fs = require('fs')
const path = require('path')
const sWeb3 = require('web3')
// const Web3 = require('./web3')
const Web3 = require('cita-web3')
const contractUtils = require('./contract_utils')
const utils = require('./utils')

const SERVER = 'http://39.104.94.244:1301'

const sweb3 = new sWeb3(SERVER)

const web3 = new Web3(new Web3.providers.HttpProvider(SERVER))

const account = sweb3.eth.accounts.create()

// const code = require('./contract_code')[':FileManage']

const from = account.address
const abiTo = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

const to = account.address

let commonParams = {}

async function deployContract(contract, abi, bytecode) {
  contract.new({ ...commonParams, data: bytecode }, (err, contract) => {
    if (err) {
      // logger.error('deploy contract fail with ' + err)
      return
    } else if (contract.address) {
      myContract = contract
      // logger.error('contract address: ' + myContract.address)
      console.log('contract addrss: ' + myContract.address)
      storeAbiToBlockchain(myContract.address, JSON.stringify(abi))

      callMethodContract(myContract)
    }
  })
}

/**
 * 上传abi至区块链
 * @param {string} abi
 */
function storeAbiToBlockchain(address, abi) {
  var hex = utils.fromUtf8(abi)
  if (hex.slice(0, 2) == '0x') hex = hex.slice(2)

  var code = (address.slice(0, 2) == '0x' ? address.slice(2) : address) + hex
  web3.eth.sendTransaction(
    {
      ...commonParams,
      to: abiTo,
      data: code,
    },
    function(err, res) {
      if (err) {
        // logger.error('send transaction error: ' + err)
      } else {
        // logger.info('send transaction result: ' + JSON.stringify(res))
        contractUtils.getTransactionReceipt(web3, res.hash, function(receipt) {
          getAbi(address)
        })
      }
    },
  )
}

function getAbi(address) {
  var result = web3.eth.getAbi(address, 'latest')
  console.log(result)
  // var abi = utils.toUtf8(result)
  // console.log(JSON.stringify(abi[0]))
  // logger.info('get abi: ' + abi)
}

/**
 * 智能合约单元测试
 */
function callMethodContract(myContract) {
  // var result = myContract.set(5, {
  //   ...commonParams,
  //   from: from,
  // })
  // // logger.info('set method result: ' + JSON.stringify(result))

  // contractUtils.getTransactionReceipt(web3, result.hash, function(receipt) {
  //   const value = myContract.get.call()
  //   console.log('get method result: ' + JSON.stringify(value))
  // })
  console.log(myContract.address)
}
module.exports = contract_code => {
  const bytecode = contract_code.bytecode
  const abi = JSON.parse(contract_code.interface)
  const contract = web3.eth.contract(abi)
  contractUtils.initBlockNumber(web3, function(params) {
    commonParams = params
    deployContract(contract, abi, bytecode)
      .then(ins => console.log(ins))
      .catch(err => console.log(err))
  })
}
