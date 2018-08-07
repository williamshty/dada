import axios from 'axios';
// import {base_url} from './keys';
const base_url = 'http://172.20.120.180:3000/api';
var qs = require('qs');
axios.defaults.baseURL= base_url;

export async function registerNewUser(payload) {
    let resp = await axios.post('/user', payload) 
    return resp
}

export async function getRegistrationVerificationCode(phoneNum) {
    let resp = await axios.get('/user/verification/register?phoneNum='+phoneNum)
    return resp
}

export async function getLoginVerificationCode(phoneNum){
    let resp = await axios.get('/user/verification/login?phoneNum='+phoneNum)
    return resp
}

export async function generateOrder(payload){
    let resp = await axios.post('/ride', payload)
    return resp
}

