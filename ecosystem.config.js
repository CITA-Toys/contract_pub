module.exports = {
  apps : [{
    name: "appchain_testnet_faucet",
    script: "./src/index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
