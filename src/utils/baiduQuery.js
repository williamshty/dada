import axios from 'axios'
import {ak, amap_key} from './keys'
import fetchJSONP from 'fetch-jsonp'
export async function searchLocation(param){
    let resp = await fetchJSONP(`https://api.map.baidu.com/place/v2/search?query=${param}&region=成都&output=json&ak=${ak}`);
    // return resp.data.results
    return resp.json()
}

export async function searchLocationByCoordinate(location){
    let resp = await fetchJSONP(`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${location.lat},${location.lng}&output=json&pois=0&ak=YC8DWemOR8iZ12lUX7b63XAGWbNSgqmI`);
    // return JSON.parse(resp.data.slice(29,resp.data.length-1)).result.formatted_address
    return resp.json()
}

export async function getEstimatedRoute(start,end){
    let resp = await fetchJSONP(`https://restapi.amap.com/v3/direction/driving?origin=${start.lng},${start.lat}&destination=${end.lng},${end.lat}&output=json&key=${amap_key}`);
    // return resp.data.route
    return resp.json()
}
export async function loadBaiduCoords(param){
    let resp  = await fetchJSONP(`https://api.map.baidu.com/geoconv/v1/?coords=${param.lat},${param.lng}&from=1&to=5&ak=${ak}`)
    return resp.json()

}