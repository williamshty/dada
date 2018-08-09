babel src/test/webServicesTest.js --out-file src/test/webServicesTestCompiled.js
babel src/utils/webServices.js --out-file src/services/webServices.js
babel src/utils/baiduQuery.js --out-file src/services/baiduQuery.js
node src/test/webServicesTestCompiled.js