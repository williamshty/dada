import {
  getState,
  generate,
  unlockFile,
  sign,
  transaction
} from "../services/wallet";
var _ = require("lodash");

function genarateWallet(payload) {
  const wallet_returned = generate(payload);
  console.log(`key is ${JSON.parse(JSON.parse(wallet_returned).key)}`);
  console.log(`address is ${JSON.parse(wallet_returned).address}`);
}
async function getCurrentWalletState(payload) {
  const current_wallet = await getState(payload.url, payload.address);
  console.log(current_wallet);
}
const key = {
  version: 4,
  id: "b9807e0d-f300-4da4-9956-f955be3bc87b",
  address: "n1JqnCs7izSsRAuEz1jD8ZV2YP5cW9oCSi6",
  crypto: {
    ciphertext:
      "b316fdee2bac7b033384fa1bb1402fb9280cef004e2341011aa703db057f397b",
    cipherparams: {
      iv: "c8547079bc1c7034122cacbbcd5d8745"
    },
    cipher: "aes-128-ctr",
    kdf: "scrypt",
    kdfparams: {
      dklen: 32,
      salt:
        "453a5f7a87ae059e8b569e9f39bc512fba6c5a6ccdd2bca004d0131289f6e3c7",
      n: 4096,
      r: 8,
      p: 1
    },
    mac: "44420a69de1d2f640e4e2d716b0df250d77f8cdbcb911ca441ad98729224d343",
    machash: "sha3256"
  }
};
async function submitTransaction(type,order_id,price) {
  const key = {
    version: 4,
    id: "b9807e0d-f300-4da4-9956-f955be3bc87b",
    address: "n1JqnCs7izSsRAuEz1jD8ZV2YP5cW9oCSi6",
    crypto: {
      ciphertext:
        "b316fdee2bac7b033384fa1bb1402fb9280cef004e2341011aa703db057f397b",
      cipherparams: {
        iv: "c8547079bc1c7034122cacbbcd5d8745"
      },
      cipher: "aes-128-ctr",
      kdf: "scrypt",
      kdfparams: {
        dklen: 32,
        salt:
          "453a5f7a87ae059e8b569e9f39bc512fba6c5a6ccdd2bca004d0131289f6e3c7",
        n: 4096,
        r: 8,
        p: 1
      },
      mac: "44420a69de1d2f640e4e2d716b0df250d77f8cdbcb911ca441ad98729224d343",
      machash: "sha3256"
    }
  };
  const func = type;
  price = typeof(price)==='number'?price.toString:price
  const args = `[\"${order_id}\"]`
  // JSON.stringify(JSON.stringify(JSON.stringify([{ id: "asidbfhahjfg" }, 10])));
  console.log(args)
  const passphrase = "Aa458545147";
  const url = "https://testnet.nebulas.io";
  const transaction_result = await transaction(
    url,
    key,
    passphrase,
    price,
    func,
    args
  );
}



// submitTransaction('order',11111,'10000');
// submitTransaction('cancel',11111,'11111');
// genarateWallet("Aa458545147");
// getCurrentWalletState({
//     url:'https://testnet.nebulas.io',
//     address:'n1JqnCs7izSsRAuEz1jD8ZV2YP5cW9oCSi6'
// })
