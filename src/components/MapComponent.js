import React from 'react';
import { connect } from 'dva';
// import { Map } from 'react-amap';
import {mapStyle} from '../utils/mapStyle'
import loadPosition from '../utils/locater'
import {searchLocation} from '../utils/baiduQuery'
import {Map, DrivingRoute,Marker, NavigationControl, InfoWindow, TrafficLayer} from 'react-bmap'
class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation:this.props.mapData.currentLocation,
      mapJSON : mapStyle
    }
  }
  async loadSearchedLocation (param) {
    loadPosition(this.props.dispatch)
    const result = await searchLocation(param)
    console.log(result)
  }

  componentDidMount() {
    // this.loadSearchedLocation.bind(this)('牛市口')
    loadPosition(this.props.dispatch)
    // console.log(this.props.mapData)
    // this.props.mapData.dispatch({type:'navigator/toggleOrderGeneration'})
  }
  componentDidUpdate(){
    // loadPosition(this.props.dispatch)
  }
  render(){
    return (
      <Map 
      style={{height: '100%'}} 
      center={this.props.mapData.currentLocation} 
      zoom="12"
      mapStyle={{styleJson: this.state.mapJSON}}>
      {/* add json format style in above [] */}
       {(()=>{
         if(this.props.mapData.trafficActivated) return(<TrafficLayer/>)    
       })()}
       <Marker position={this.props.mapData.currentLocation}/>
       {/* {(()=>{
        if(this.props.navigator.orderGenerationTriggered && this.props.mapData.startLocation) return(
          <Marker position={this.props.mapData.startLocation}/>
        )
        })()} */}
        {/* {(()=>{
        if(this.props.navigator.orderGenerationTriggered && this.props.mapData.endLocation) return(
          <Marker position={this.props.mapData.endLocation}/>
        )
        })()} */}
        {/* {(()=>{
        if(this.props.navigator.orderGenerationTriggered&&this.props.mapData.endLocation && this.props.mapData.startLocation) return(
          <DrivingRoute 
          start={this.props.mapData.startLocation} 
          end={this.props.mapData.endLocation}/>  
        )
        })()} */}
      </Map>
      );
  }
};

MapComponent.propTypes = {
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(MapComponent);