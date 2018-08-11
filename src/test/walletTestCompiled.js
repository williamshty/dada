'use strict';

var _wallet = require('../services/wallet');

function genarateWallet(payload) {
  var wallet_returned = (0, _wallet.generate)(payload);
  console.log(wallet_returned);
}
async function getCurrentWalletState(payload) {
  var current_wallet = await (0, _wallet.getState)(payload.url, payload.address);
  console.log(current_wallet);
}

// genarateWallet("Aa458545147");
getCurrentWalletState({
  url: 'https://testnet.nebulas.io',
  address: 'n1JqnCs7izSsRAuEz1jD8ZV2YP5cW9oCSi6'
});
