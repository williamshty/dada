import {loadBaiduCoords} from './baiduQuery'
export default async function loadPosition (dispatch) {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      var currentLocation={
        lng:longitude,
        lat: latitude,
      }
      const convertedLocation = await generateBaiduCoords(currentLocation)
      // console.log(convertedLocation)
      currentLocation.lat = convertedLocation.x
      currentLocation.lng = convertedLocation.y
      dispatch({
        type:'mapData/save',
        payload:{
          currentLocation:currentLocation,                                                                                                                   
          startLocation:currentLocation
        }
      })
    } catch (error) {
      console.log(error);
    }
  };
  async function generateBaiduCoords(payload) {
    const returned_coords = await loadBaiduCoords(payload)
    // console.log(returned_coords)
    return returned_coords
  }
  async function getCurrentPosition (options = {}) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
