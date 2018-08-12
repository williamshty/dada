import openSocket from 'socket.io-client';
import {socket_url} from './keys';
const  socket = openSocket(socket_url);

function fetchDriverLocation(cb){
  socket.on('location', resp=>cb(null, resp));
}
function connectSocket(){
    socket.emit('update', localStorage.getItem('passengerID'))
}
function orderAccepted(cb){
    socket.on('take', resp=>cb(null, resp))
}
function fetchDriverInfo(cb){
    socket.on('info', resp=>cb(null, resp))
}
function clientCollected(cb){
    socket.on('collect', resp=>cb(null, resp))
}
function arriveDestination(cb){
    socket.on('arrive', resp=>cb(null, resp))
}
export {fetchDriverLocation, connectSocket, orderAccepted, fetchDriverInfo,clientCollected,arriveDestination };
