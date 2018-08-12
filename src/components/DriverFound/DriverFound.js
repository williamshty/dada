import React from 'react';
import { connect } from 'dva';
import styles from './DriverFound.css';
import CustomModal from '../Modals/CustomModal'
class DriverFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelConfirmationActivated:false,
      cancelConfirmed:false
    }
  }
  // componentDidMount(){
  //   setTimeout(()=>{this.props.dispatch({
  //     type:'navigator/save',
  //     payload:{
  //         driverFoundTriggered:false,
  //         inTripTriggered:true
  //     }
  //   })}, 4000)
  // }
  
  render(){
    return (
      <div>
        {/* modal to ask whether must cancel */}
        {(() => {
        if(this.state.cancelConfirmationActivated){
          return(
            <CustomModal
            title='提示'
            info={'已有司机接单，取消订单将扣除20%费用<br/>是否确认取消'}
            leftText='返回'
            rightColor='#ff5151'
            rightText='取消行程'
            onLeftClick={()=>{this.setState({cancelConfirmationActivated:false})}}
            onRightClick={()=>{this.setState({cancelConfirmationActivated:false,cancelConfirmed:true})}}
            />
          )
        }
        })()}
        {/* confirmed cancel */}
        {(() => {
        if(this.state.cancelConfirmed){
          return(
            <div className={styles.cancel__mask}>
              <div className={styles.cancel__confirmed__info}></div>
            </div>
          )
        }
        })()}
              <div className={styles.bottom__container}>
                <div className={styles.bottom__car__card}>
                  <div className={styles.cancel__button} onClick={()=>{
                    this.setState({cancelConfirmationActivated:true})
                  }}/>
                  <div className={styles.bottom__card__title}>
                  司机已接单
                  </div>
                  <div className={styles.bottom__card__info}>
                  司机正前往您的位置，请稍候
                  </div>
                  <img className={styles.divider__title} src={require('../../assets/矩形 609.png')}/>
                  <div className={styles.bottom__card__corner__icon}>
                  </div>
                  <div className={styles.bottom__brand__title}>
                  车辆品牌
                  </div>
                  <div className={styles.bottom__brand}>
                  {this.props.trip.driverInfo.model}
                  </div>
                  <div className={styles.bottom__color__title}>
                  车辆颜色
                  </div>
                  <div className={styles.bottom__color}>
                  {this.props.trip.driverInfo.color}
                  </div>
                  <div className={styles.bottom__license__title}>
                  车牌号
                  </div>
                  <div className={styles.bottom__license}>
                  {this.props.trip.driverInfo.plateNum}
                  </div>
                </div>
              </div>
      </div>
    );
  }

};

DriverFound.propTypes = {
  
};

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(DriverFound);
