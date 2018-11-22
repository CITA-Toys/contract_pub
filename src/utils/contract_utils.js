const sWeb3 = require('web3')
const SERVER = 'http://47.75.129.215:1337'
const sweb3 = new sWeb3(SERVER)
const account = sweb3.eth.accounts.privateKeyToAccount("0xd8aa320d1f286fcd1bf8e487cbdb5337db2b87cc46ef2c705917196dba3f822c")
const privkey = account.privateKey

const quota = 999999;

console.log('privkey: ', privkey)
console.log('address: ', account.address)

var getTransactionReceipt = function (web3, hash, callback) {

    // wait for receipt
    var count = 0;
    var filter = web3.eth.filter('latest', function (err) {
        if (!err) {
            count++;
            if (count > 20) {
                filter.stopWatching(function () {});
            } else {
                web3.eth.getTransactionReceipt(hash, function (e, receipt) {
                    if (receipt) {
                        filter.stopWatching(function () {});
                        callback(receipt)
                    }
                })
            }
        } else {
            // no handle
        }
    });
}

var initBlockNumber = function (web3, callback) {
    web3.eth.getBlockNumber(function (err, res) {
        if (!err) {
            commonParams = {
                privkey: privkey,
                nonce: getRandomInt(),
                quota: quota,
                validUntilBlock: res + 88,
                version: 1
            };
            callback(commonParams);
        } else {
            console.error(err)
        }
    });
}

var getRandomInt = function () {
    return Math.floor(Math.random() * 100).toString();
}

module.exports = {
    getTransactionReceipt: getTransactionReceipt,
    initBlockNumber: initBlockNumber,
    getRandomInt: getRandomInt
}
