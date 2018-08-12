import React from "react";
import { connect } from "dva";
import styles from "./ConfirmTripEnd.css";
import {confirmTripEnd} from '../../utils/webServices'
class ConfirmTripEnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate() {
    if (this.state.activatedStars > 0 && !this.state.starViewed) {
      setTimeout(() => this.setState({ starViewed: true }), 10);
    }
    if (this.state.starViewed && !this.state.starRated) {
      setTimeout(() => this.setState({ starRated: true }), 1000);
    }
  }
  componentWillUnmount() {}

  async confirmTripEndFunction(){
    const trip_end = await confirmTripEnd({
      _id:this.props.trip.currentTripID,
      time:Date.now()
    })
    console.log(trip_end)
  }

  render() {
    return (
      <div>
        <div className={styles.bottom__background__mask} />
        <div className={styles.bottom__container}>
          <div className={styles.bottom__confirm__card}>
            <div className={styles.bottom__card__title}>行程结束</div>
            <div className={styles.bottom__card__info}>请确认行程是否完成</div>
            <img
              className={styles.divider__title}
              src={require("../../assets/矩形 609.png")}
            />
            <div className={styles.bottom__distance__title}>路程</div>
            <div className={styles.bottom__distance}>
              {this.props.trip.finishedTrip.distance} Km
            </div>
            <div className={styles.bottom__pax__title}>拼车人数</div>
            <div className={styles.bottom__pax}>
              {this.props.trip.finishedTrip.pax} 人
            </div>
            <div className={styles.bottom__time__title}>时间</div>
            <div className={styles.bottom__time}>
              {this.props.trip.finishedTrip.duration} Min
            </div>
            <div className={styles.end__icon} />
          </div>
        </div>
        {/* <div className={styles.bottom__submit__button} onClick={()=>{
              this.props.dispatch({
                type:'navigator/save',
                payload:{
                    confirmTripEndTriggered:false,
                    tripFinishedTriggered:true
                }
              })
            }}>
            确认行程完成
            </div> */}
        <div className={styles.button__contact}>未完成，联系客服</div>
        <div
          className={styles.button__confirm}
          onClick={() => {
            this.confirmTripEndFunction()
            this.props.dispatch({
              type: "navigator/save",
              payload: {
                confirmTripEndTriggered: false,
                tripFinishedTriggered: true
              }
            });
          }}
        >
          确认行程完成
        </div>
      </div>
    );
  }
}

ConfirmTripEnd.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ConfirmTripEnd);
