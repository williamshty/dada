'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var nebulas = require('nebulas');
var axios = require('axios');
var JSON = require('circular-json');

var getState = async function getState(url, address) {
  try {
    var state = await axios.post(url + '/v1/user/accountstate', { "address": address });
    return JSON.stringify(state.data);
  } catch (err) {
    return JSON.stringify(err.response);
  }
};

//generate a random account and use passphrase to encrypt the keyfile
var generate = function generate(passphrase) {
  var account = nebulas.Account.NewAccount();
  var keyStr = account.toKeyString(passphrase);
  var addr = account.getAddressString();
  return JSON.stringify({ key: keyStr, address: addr });
};

//Unlock offline
var unlockFile = function unlockFile(keyfile, passphrase) {
  var account = new nebulas.Account();
  account = account.fromKey(keyfile, passphrase);
  return account;
};

//Sign offline
var sign = function sign(options) {
  var tx = new nebulas.Transaction(options);
  tx.signTransaction();
  return tx;
};

var transaction = async function transaction(url, key, passphrase, value, func, args) {
  try {
    var address = key.address;
    console.log(address);
    var state = await axios.post(url + '/v1/user/accountstate', { "address": address });
    var nonce = parseInt(state.data.result.nonce) + 1;
    console.log(nonce);
    var options = {
      "chainID": url == 'https://testnet.nebulas.io' ? 1001 : 100,
      "from": address,
      "to": "n1gEQHqY4qDkNhfR9cdhukyfBw7BvXNcZpG", //contract address
      "value": value, //string in wei
      "nonce": nonce, //int
      "gasPrice": "1000000", //string
      "gasLimit": "2000000", //string
      "contract": { "function": func, "args": args }
    };
    var test = await axios.post(url + '/v1/user/call', options);
    if (test.data.execute_err && test.data.execute_err !== "") {
      return { testError: test.data };
    }
    var account = unlockFile(key, passphrase);
    options.from = account;
    var tx = sign(options);
    console.log(tx.toProtoString());
    var receipt = await axios.post(url + '/v1/user/rawtransaction', { "data": tx.toProtoString() });
    return receipt.data;
  } catch (err) {
    console.log('err');
    return JSON.stringify(err);
  }
};
exports.getState = getState;
exports.generate = generate;
exports.unlockFile = unlockFile;
exports.sign = sign;
exports.transaction = transaction;
