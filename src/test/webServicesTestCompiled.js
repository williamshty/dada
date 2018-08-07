'use strict';

var _webServices = require('../services/webServices');

async function generateOrderFunction(payload) {
    var orderGenerated = await (0, _webServices.generateOrder)(payload);
    console.log(orderGenerated);
}
async function getLoginVerificationCodeFunction(payload) {
    var verification_code = await (0, _webServices.getLoginVerificationCode)(payload);
    console.log(verification_code);
}

//passed
// getLoginVerificationCodeFunction('13840243280')

generateOrderFunction({
    ride: {
        passenger: '5b52dd00b8703c0f37bb118f',
        location: {
            from: {
                title: 'ABC',
                info: 'abc',
                lng: 112.34,
                lat: 114.98
            },
            to: {
                title: 'tap4fun',
                info: 'abc',
                lng: 34.87,
                lat: 35.98
            }
        },
        time: {
            order: Date.now()
        }
    }
});
