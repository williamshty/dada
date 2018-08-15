import React from "react";
import { connect } from "dva";
import styles from "./RegistrationPage.css";
import InputItem from "../../components/Forms/InputItem";
import {
  getRegistrationVerificationCode,
  registerNewUser
} from "../../utils/webServices";
import { routerRedux } from "dva/router";
import Toast from "../../components/Toast/Toast";
class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: "",
      enteredVerification: "",
      receivedVerification: "",
      phoneError: "",
      verificationSent: false,
      verificationError: "",
      countDownTime: 60
    };
  }
  componentDidUpdate() {
    if (this.state.error_occur) {
      setTimeout(() => {
        this.setState({ error_occur: false });
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
    const verification_code = await getRegistrationVerificationCode(
      localStorage.getItem("phoneNum")
    );
    if (verification_code.data.code !== 1001) {
      this.setState({ phoneError: "true" });
      return;
    } else {
      this.setState({
        verificationSent: true,
        receivedVerification: verification_code.data.data.code
      });
      localStorage.setItem('passengerID',verification_code.data.data.user._id)
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
      this.setState({ error_occur: true });
      return;
    } else {
      this.registerUserByPhoneNum.bind(this)();
    }
  }
  async registerUserByPhoneNum() {
    console.log(parseInt(localStorage.getItem("phoneNum")));
    const payload = {
      user: {
        phoneNum: parseInt(localStorage.getItem("phoneNum"))
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
    this.props.dispatch(routerRedux.push({ pathname: "/" }));
  }
  componentDidMount() {
    // console.log(this.props)
  }
  render() {
    return (
      <div className={styles.base__container}>
        {(() => {
          if (this.state.error_occur) {
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
          检测到您的手机号没有注册，请填写验证码以注册
        </div>
        {/* <div className={styles.tel__container}>
                <InputItem
                caption='手机号'
                placeholder=''
                value={this.state.tel}
                onChange={(v)=>{this.setState({tel:v})}}
                error={this.state.phoneError}
                />
            </div> */}
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

RegistrationPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RegistrationPage);
