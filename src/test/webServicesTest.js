import {
  generateOrder,
  getLoginVerificationCode,
  registerNewUser
} from "../services/webServices";
import { loadBaiduCoords } from "../services/baiduQuery";
async function generateOrderFunction(payload) {
  const orderGenerated = await generateOrder(payload);
  console.log(orderGenerated);
}
async function getLoginVerificationCodeFunction(payload) {
  const verification_code = await getLoginVerificationCode(payload);
  console.log(verification_code);
}
async function generateBaiduCoords(payload) {
  const returned_coords = await loadBaiduCoords(payload);
  console.log(returned_coords);
}
async function registerUserByPhoneNum(payload) {
  const registrationStatus = await registerNewUser(payload);
  console.log(registrationStatus);
}

registerUserByPhoneNum({
  user: {
    phoneNum: 13840243280
  }
});

// passed
// generateBaiduCoords({
//     lat:30.551020799999996,
//     lng:104.06756279999999
// })

// passed
// getLoginVerificationCodeFunction('13840243280')
// passed
generateOrderFunction({
  ride: {
    passenger: "5b6d9d5af971e43547fe1a38",
    location: {
      from: {
        title: "ABC",
        info: "abc",
        lng: 112.34,
        lat: 30.8
      },
      to: {
        title: "tap4fun",
        info: "abc",
        lng: 104.25,
        lat: 30.12
      }
    },
    time: {
      order: Date.now()
    },
    pax: 2,
    distance: 3.4,
    price: 2.08,
    duration:'34 Min'
  }
});
