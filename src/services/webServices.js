'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerNewUser = registerNewUser;
exports.getRegistrationVerificationCode = getRegistrationVerificationCode;
exports.getLoginVerificationCode = getLoginVerificationCode;
exports.generateOrder = generateOrder;

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
