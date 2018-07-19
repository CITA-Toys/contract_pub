require('dotenv').config()
module.exports = {
  chain: process.env.CHAIN,
  privateKey: process.env.PRIVATE_KEY,
}
