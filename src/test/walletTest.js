import {
  getState,
  generate,
  unlockFile,
  sign,
  transaction
} from "../services/wallet";

function genarateWallet(payload) {
  const wallet_returned = generate(payload);
  console.log(wallet_returned);
}
async function getCurrentWalletState(payload){
    const current_wallet = await getState(payload.url, payload.address)
    console.log(current_wallet)
}

// genarateWallet("Aa458545147");
getCurrentWalletState({
    url:'https://testnet.nebulas.io',
    address:'n1JqnCs7izSsRAuEz1jD8ZV2YP5cW9oCSi6'
})
