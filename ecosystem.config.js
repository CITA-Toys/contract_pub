module.exports = {
  apps : [{
    name: "cita_testnet_faucet",
    script: "./src/index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
