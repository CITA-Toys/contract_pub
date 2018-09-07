const {
  nervos
} = require('../src/config/chain')
const transfer = require('../src/utils/transfer')

const to = "0xe82C84b9C7fF19a41ed98807B2174Dc6a5Cce31C"
test(`transfer to ${to}`, async () => {
  jest.setTimeout(10000)
  const balance = await nervos.appchain.getBalance(to)
  console.log(balance)
  const txRes = await transfer(to, '0x10')
  console.log(txRes)
  return await new Promise((resolve, reject) => {
    setTimeout(async () => {
      const balance2 = await nervos.appchain.getBalance(to)
      console.log(balance2)
      expect(+balance2).toBe(+balance + 16)
      resolve()
    }, 5000)
  })
})
