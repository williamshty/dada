import React from "react";
import { connect } from "dva";
import styles from "./RootRegistrationPage.css";
import InputItem from "../../components/Forms/InputItem";
import {
  getRegistrationVerificationCode,
  registerNewUser
} from "../../utils/webServices";
import { routerRedux } from "dva/router";
import Toast from "../../components/Toast/Toast";
class RootRegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: "",
      enteredVerification: "",
      receivedVerification: "",
      phoneError: "",
      verificationSent: false,
      verificationError: false,
      countDownTime: 60
    };
  }
  componentDidUpdate() {
    if (this.state.phoneError) {
      setTimeout(() => {
        this.setState({ phoneError: false });
      }, 2000);
    }
    if (this.state.verificationError) {
      setTimeout(() => {
        this.setState({ verificationError: false });
      }, 2000);
    }
    if (this.state.countDownTime <= 0) {
      this.triggerClearInterval();
      this.setState({
        verificationSent: false,
        countDownTime: 60
      });
    }
  }
  async getRegistrationVerificationCode() {
    localStorage.setItem("phoneNum", this.state.tel)
    if (this.state.tel.toString().length !== 11) {
      this.setState({ phoneError: true });
      return;
    }
    const verification_code = await getRegistrationVerificationCode(
      this.state.tel
    );
    if (verification_code.data.code !== 1001) {
      this.setState({ phoneError: true });
      return;
    } else {
      this.setState({
        verificationSent: true,
        receivedVerification: verification_code.data.data.code
      });
      this.triggerCountDownTimer();
    }
  }
  countDown() {
    this.setState({ countDownTime: this.state.countDownTime - 1 });
  }
  triggerCountDownTimer() {
    this.interval = setInterval(() => {
      this.countDown();
    }, 1000);
  }
  triggerClearInterval() {
    clearInterval(this.interval);
  }
  submitRegistrationForm() {
    if (this.state.enteredVerification !== this.state.receivedVerification) {
      this.setState({ verificationError: true });
      return;
    } else {
      this.registerUserByPhoneNum.bind(this)();
    }
  }
  async registerUserByPhoneNum() {
    console.log(parseInt(this.state.tel));
    const payload = {
      user: {
        phoneNum: parseInt(this.state.tel)
      }
    };
    const registrationStatus = await registerNewUser(payload);
    console.log(registrationStatus);
    this.props.dispatch({
      type: "navigator/save",
      payload: {
        isLoggedIn: true
      }
    });
    localStorage.setItem("isLoggedIn", true);
    // localStorage.setItem("passengerID", )
    localStorage.setItem('passengerID',registrationStatus.data.data._id)
    this.props.dispatch(routerRedux.push({ pathname: "/" }));
  }
  componentDidMount() {
    // console.log(this.props)
  }
  render() {
    return (
      <div className={styles.base__container}>
        {(() => {
          if (this.state.phoneError) {
            return <Toast text="手机号码格式错误" />;
          }
        })()}
        {(() => {
          if (this.state.verificationError) {
            return <Toast text="验证码错误" />;
          }
        })()}
        <div
          className={styles.back__button}
          onClick={()=>{
            this.props.dispatch(
              routerRedux.push({ pathname: "/verification" })
            )
          }}
        />
        <div className={styles.registration__icon} />
        <div className={styles.registration__text}>注册</div>
        <div className={styles.registration__hint__text}>
          手机号将作为您的登录账号
        </div>
        <div className={styles.tel__container}>
          <InputItem
            caption="手机号"
            placeholder=""
            value={this.state.tel}
            onChange={v => {
              this.setState({ tel: v });
            }}
          />
        </div>
        <div className={styles.verification__container}>
          <InputItem
            caption="验证码"
            placeholder=""
            value={this.state.enteredVerification}
            onChange={v => {
              this.setState({ enteredVerification: v });
            }}
          />
        </div>
        {(() => {
          if (!this.state.verificationSent) {
            return (
              <div
                className={styles.verification__button}
                onClick={this.getRegistrationVerificationCode.bind(this)}
              >
                发送验证码
              </div>
            );
          } else
            return (
              <div className={styles.verification__sent}>
                {this.state.countDownTime}s
              </div>
            );
        })()}

        <div
          className={styles.submit__botton}
          onClick={() => this.submitRegistrationForm()}
        >
          注册
        </div>
        {/* <div className={styles.login__text} onClick={()=>{
              this.props.dispatch(routerRedux.push({pathname:'/login'}))
              }}>
            返回登录
            </div> */}
        <div className={styles.logo__container} />
      </div>
    );
  }
}

RootRegistrationPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RootRegistrationPage);
