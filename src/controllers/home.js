const log = require('../log/index')

const home = {
  index: async (ctx, next) => {
    await ctx.render('index')
  }
}
module.exports = home
