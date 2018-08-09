import {generateOrder,getLoginVerificationCode} from '../services/webServices'
import {loadBaiduCoords} from '../services/baiduQuery'
async function generateOrderFunction(payload) {
    const orderGenerated = await generateOrder(payload)
    console.log(orderGenerated)
}
async function getLoginVerificationCodeFunction(payload) {
    const verification_code = await getLoginVerificationCode(payload)
    console.log(verification_code)
}
async function generateBaiduCoords(payload) {
    const returned_coords = await loadBaiduCoords(payload)
    console.log(returned_coords)
}

// passed
// generateBaiduCoords({
//     lat:30.551020799999996,
//     lng:104.06756279999999
// })


// passed
getLoginVerificationCodeFunction('13840243280')
// passed
// generateOrderFunction({
//     ride:{
//         passenger: '5b52dd00b8703c0f37bb118f',
//         location:{
//             from:{
//                 title:'ABC',
//                 info:'abc',
//                 lng: 112.34,
//                 lat: 114.98
//             },
//             to:{
//                 title:'tap4fun',
//                 info:'abc',
//                 lng: 34.87,
//                 lat: 35.98
//             }
//         },
//         time:{
//             order:Date.now()
//         }
//     }
// })