'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerNewUser = registerNewUser;
exports.verifyPhoneNum = verifyPhoneNum;
exports.getRegistrationVerificationCode = getRegistrationVerificationCode;
exports.getLoginVerificationCode = getLoginVerificationCode;
exports.generateOrder = generateOrder;
exports.cancelOrderBeforeTaken = cancelOrderBeforeTaken;
exports.cancelOrderAfterTaken = cancelOrderAfterTaken;
exports.confirmTripEnd = confirmTripEnd;
exports.rateTrip = rateTrip;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {base_url} from './keys';
var base_url = 'http://172.20.120.180:3000/api';
var qs = require('qs');
_axios2.default.defaults.baseURL = base_url;

async function registerNewUser(payload) {
    var resp = await _axios2.default.post('/user', payload);
    return resp;
}

async function verifyPhoneNum(phoneNum) {
    var resp = await _axios2.default.get('/user/phone/verify?phoneNum=' + phoneNum);
    return resp;
}

async function getRegistrationVerificationCode(phoneNum) {
    var resp = await _axios2.default.get('/user/verification/register?phoneNum=' + phoneNum);
    return resp;
}

async function getLoginVerificationCode(phoneNum) {
    var resp = await _axios2.default.get('/user/verification/login?phoneNum=' + phoneNum);
    return resp;
}

async function generateOrder(payload) {
    var resp = await _axios2.default.post('/ride', payload);
    return resp;
}

async function cancelOrderBeforeTaken(payload) {
    var resp = await _axios2.default.put('/ride/cancel/6', payload);
    return resp;
}
async function cancelOrderAfterTaken(payload) {
    var resp = await _axios2.default.put('/ride/cancel/7', payload);
    return resp;
}
async function confirmTripEnd(payload) {
    var resp = await _axios2.default.put('/ride/confirm', payload);
    return resp;
}
async function rateTrip(payload) {
    var resp = await _axios2.default.put('/ride/review', payload);
    return resp;
}
