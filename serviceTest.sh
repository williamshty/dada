babel src/test/webServicesTest.js --out-file src/test/webServicesTestCompiled.js
babel src/utils/webServices.js --out-file src/services/webServices.js
node src/test/webServicesTestCompiled.js