"use strict";

var _webServices = require("../services/webServices");

var _baiduQuery = require("../services/baiduQuery");

async function generateOrderFunction(payload) {
  var orderGenerated = await (0, _webServices.generateOrder)(payload);
  console.log(orderGenerated);
}
async function getLoginVerificationCodeFunction(payload) {
  var verification_code = await (0, _webServices.getLoginVerificationCode)(payload);
  console.log(verification_code);
}
async function generateBaiduCoords(payload) {
  var returned_coords = await (0, _baiduQuery.loadBaiduCoords)(payload);
  console.log(returned_coords);
}
async function registerUserByPhoneNum(payload) {
  var registrationStatus = await (0, _webServices.registerNewUser)(payload);
  console.log(registrationStatus);
}
async function verifyPhoneNumFunction(phoneNum) {
  var verify_result = await (0, _webServices.verifyPhoneNum)(phoneNum);
  console.log(verify_result);
}

// verifyPhoneNumFunction('13840243281')
// registerUserByPhoneNum({
//   user: {
//     phoneNum: 13840243280
//   }
// });

// passed
// generateBaiduCoords({
//     lat:30.551020799999996,
//     lng:104.06756279999999
// })

// passed
getLoginVerificationCodeFunction('13840243280');
// passed
// generateOrderFunction({
//   ride: {
//     passenger: "5b6d9d5af971e43547fe1a38",
//     location: {
//       from: {
//         title: "ABC",
//         info: "abc",
//         lng: 112.34,
//         lat: 30.8
//       },
//       to: {
//         title: "tap4fun",
//         info: "abc",
//         lng: 104.25,
//         lat: 30.12
//       }
//     },
//     time: {
//       order: Date.now()
//     },
//     pax: 2,
//     distance: 3.4,
//     price: 2.08,
//     duration:'34 Min'
//   }
// });
