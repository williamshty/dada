export default {

    namespace: 'mapData',
  
    state: {
        currentLocation:'here',
        trafficActivated: false,
        startLocation:'',
        endLocation:'',
        startLocationDescription:'',
        endLocationDescription:'',
        startLocationInfo:'',
        endLocationInfo:''
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
      *fetchCurrentLocation({ payload }, { call, put }) {  // eslint-disable-line
        yield put({ 
          type: 'updateCurrentLocation',
          payload 
        });
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
      // toggleSideMenu(state){
      //     return{sideMenuOpen:!state.sideMenuOpen};
      // }
      updateCurrentLocation(state, action){
          return { ...state, ...action.payload };
      },
      toggleTraffic(state, action){
        return { ...state, ...action.payload };
      }
    },
  
  };
  