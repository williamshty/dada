babel src/test/walletTest.js --out-file src/test/walletTestCompiled.js
babel src/utils/wallet.js --out-file src/services/wallet.js
# babel src/utils/baiduQuery.js --out-file src/services/baiduQuery.js
node src/test/walletTestCompiled.js