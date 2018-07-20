const log = console.log.bind(console, '>>>')

log.mark = () => log('这是个标记')

log.error = () => {

}

module.exports = log