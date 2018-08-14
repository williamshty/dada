import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import { routerRedux } from "dva/router";
import MapComponent from "../../components/MapComponent";
import SideMenu from "../../components/SideMenu/SideMenu";
import OrderGeneration from "../../components/OrderGeneration/OrderGeneration";
import FindingDriver from "../../components/FindingDriver/FindingDriver";
import DriverFound from "../../components/DriverFound/DriverFound";
import InTrip from "../../components/InTrip/InTrip";
import TripFinished from "../../components/TripFinished/TripFinished";
import ConfirmTripEnd from "../../components/ConfirmTripEnd/ConfirmTripEnd";
import {
  fetchDriverLocation,
  connectSocket,
  orderAccepted,
  fetchDriverInfo,
  clientCollected,
  arriveDestination
} from "../../utils/socket";
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // localStorage.setItem("passengerID", "5b6d9d5af971e43547fe1a38");
    localStorage.setItem("walletID", "n1JqnCs7izSsRAuEz1jD8ZV2YP5cW9oCSi6");
    connectSocket();
    orderAccepted((err, orderAccepted) => {
      this.props.dispatch({
        type: "navigator/save",
        payload: {
          findingDriverTriggered: false,
          driverFoundTriggered: true
        }
      });
    });
    fetchDriverInfo((err, driverInfo) => {
      this.props.dispatch({
        type: "trip/save",
        payload: {
          driverInfo: driverInfo
        }
      });
    });
    fetchDriverLocation((err, currentDriverLocation) => {
      this.props.dispatch({
        type: "mapData/save",
        payload: {
          currentDriverLocation: currentDriverLocation
        }
      });
    });
    clientCollected((err, clientCollected) => {
      console.log(clientCollected)
      this.props.dispatch({
        type: "navigator/save",
        payload: {
          inTripTriggered: true,
          driverFoundTriggered: false
        }
      });
    })
    arriveDestination((err, arriveDestination) => {
      console.log(arriveDestination)
      this.props.dispatch({
        type:'trip/save',
        payload:{
          finishedTrip:arriveDestination
        }
      })
      this.props.dispatch({
        type: "navigator/save",
        payload: {
          inTripTriggered: false,
          confirmTripEndTriggered:true
        }
      });
    })
  }
  render() {
    return (
      <div className={styles.normal}>
      <div className={styles.top__mask} />
        <div className={styles.bottom__mask} />
        {(() => {
          if (this.props.navigator.returnInitialStateTriggered) {
            return (
              <div>
                <div
                  className={styles.button__bottom}
                  onClick={() =>
                    this.props.dispatch({
                      type: "navigator/save",
                      payload: {
                        returnInitialStateTriggered: false,
                        orderGenerationTriggered: true
                      }
                    })
                  }
                />
                <SideMenu />
              </div>
            );
          } else if (this.props.navigator.orderGenerationTriggered) {
            return <OrderGeneration />;
          } else if (this.props.navigator.findingDriverTriggered) {
            return (
              <div>
                <SideMenu />
                <FindingDriver />
              </div>
            );
          } else if (this.props.navigator.driverFoundTriggered) {
            return (
              <div>
                <SideMenu />
                <DriverFound />
              </div>
            );
          } else if (this.props.navigator.inTripTriggered) {
            return (
              <div>
                <SideMenu />
                <InTrip />
              </div>
            );
          } else if (this.props.navigator.confirmTripEndTriggered) {
            return (
              <div>
                <SideMenu />
                <ConfirmTripEnd />
              </div>
            );
          } else if (this.props.navigator.tripFinishedTriggered) {
            return (
              <div>
                <SideMenu />
                <TripFinished />
              </div>
            );
          }
        })()}
        {/* <SideMenu/> */}
        {/* <FindingDriver/> */}
        {/* <DriverFound/> */}
        {/* <InTrip/> */}
        {/* <TripFinished/> */}
        {/* <ConfirmTripEnd/> */}
        <div className={styles.map__container}>
          <MapComponent />
        </div>
      </div>
    );
  }
}

IndexPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(IndexPage);
