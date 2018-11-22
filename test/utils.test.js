const {
  appchain
} = require('../src/config/chain')
const transfer = require('../src/utils/transfer')

const to = "0xe82C84b9C7fF19a41ed98807B2174Dc6a5Cce31C"
test(`transfer to ${to}`, async () => {
  jest.setTimeout(100000)
  const balance = await appchain.base.getBalance(to)
  const txRes = await transfer(to, '0x10')
  const receipt = await appchain.listeners.listenToTransactionReceipt(txRes.hash)
  if (receipt.errorMessage) {
    throw new Error(errorMessage)
  }
  return await new Promise((resolve, reject) => {
    setTimeout(async () => {
      const balance2 = await appchain.base.getBalance(to)
      expect(+balance2).toBe(+balance + 16)
      resolve()
    }, 10000)
  })
})
