'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchLocation = searchLocation;
exports.searchLocationByCoordinate = searchLocationByCoordinate;
exports.getEstimatedRoute = getEstimatedRoute;
exports.loadBaiduCoords = loadBaiduCoords;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _keys = require('./keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function searchLocation(param) {
    var resp = await _axios2.default.get('https://api.map.baidu.com/place/v2/search?query=' + param + '&region=\u6210\u90FD&output=json&ak=' + _keys.ak);
    return resp.data.results;
}

async function searchLocationByCoordinate(location) {
    var resp = await _axios2.default.get('http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + location.lat + ',' + location.lng + '&output=json&pois=0&ak=YC8DWemOR8iZ12lUX7b63XAGWbNSgqmI');
    return JSON.parse(resp.data.slice(29, resp.data.length - 1)).result.formatted_address;
}

async function getEstimatedRoute(start, end) {
    var resp = await _axios2.default.get('https://restapi.amap.com/v3/direction/driving?origin=' + start.lng + ',' + start.lat + '&destination=' + end.lng + ',' + end.lat + '&output=json&key=' + _keys.amap_key);
    return resp.data.route;
}
async function loadBaiduCoords(param) {
    console.log('https://api.map.baidu.com/geoconv/v1/?coords=' + param.lat + ',' + param.lng + '&from=1&to=5&ak=' + _keys.ak);
    var resp = await _axios2.default.get('https://api.map.baidu.com/geoconv/v1/?coords=' + param.lat + ',' + param.lng + '&from=1&to=5&ak=' + _keys.ak);
    return resp.data.result[0];
}
