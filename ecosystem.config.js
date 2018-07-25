module.exports = {
  apps : [{
    name: "contract_pub",
    script: "./src/index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
