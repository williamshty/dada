import React from "react";
import { connect } from "dva";
import styles from "./FindingDriver.css";
import ReactSVG from "react-svg";
import CustomModal from "../../components/Modals/CustomModal";
import {cancelOrderBeforeTaken} from '../../utils/webServices'
class FindingDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitingTime: 0,
      cancelConfirmed: false,
      cancelConfirmationActivated: false
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.countTime();
    }, 1000);
  }
  componentDidUpdate() {
    if (this.state.cancelConfirmed) {
      this.setState({ cancelConfirmed: false });
      setTimeout(() => {
        this.cancelOrderBeforeTakenFunction()
        this.props.dispatch({
          type: "navigator/save",
          payload: {
            findingDriverTriggered: false,
            orderGenerationTriggered: true
          }
        });
      }, 1600);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  async cancelOrderBeforeTakenFunction(){
    console.log('cancel order ajax triggered')
    const cancel_order = await cancelOrderBeforeTaken({
        passenger: localStorage.getItem("passengerID"),
        _id: this.props.trip.currentTripID,
        time: Date.now()
    })
    console.log(cancel_order)
  }
  countTime() {
    this.setState({ waitingTime: this.state.waitingTime + 1 });
    console.log("logged");
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.state.cancelConfirmationActivated) {
            return (
              <CustomModal
                title="提示"
                info={`尚未有司机接单\n\r是否确认取消订单`}
                leftText="返回"
                rightColor="#ffa833"
                rightText="取消行程"
                onLeftClick={() => {
                  this.setState({ cancelConfirmationActivated: false });
                }}
                onRightClick={() => {
                  this.setState({
                    cancelConfirmationActivated: false,
                    cancelConfirmed: true
                  });
                }}
              />
            );
          }
        })()}
        {(() => {
          if (this.state.cancelConfirmed) {
            return (
              <div className={styles.cancel__mask}>
                <div className={styles.cancel__confirmed__info} />
              </div>
            );
          }
        })()}
        <div className={styles.bottom__container}>
          <div className={styles.bottom__waiting__card}>
            <div
              className={styles.cancel__button}
              onClick={() => {
                this.setState({ cancelConfirmationActivated: true });
              }}
            />
            <div className={styles.bottom__waiting__tittle}>等待司机接单</div>
            {/* <img className={styles.divider__title} src={require('../../assets/矩形 609.png')}/> */}
            <div className={styles.bottom__waiting__time}>
              已等待 &nbsp;{this.state.waitingTime}&nbsp; 秒
            </div>
            <div className={styles.waiting__icon} />
          </div>

          {/* <div className={styles.bottom__submit__button}>
            确认行程完成</div> */}
        </div>
      </div>
    );
  }
}

FindingDriver.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(FindingDriver);
