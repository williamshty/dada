import React from "react";
import { connect } from "dva";
import styles from "./WalletGenerationPage.css";
import InputItem from "../../components/Forms/InputItem";
import {
  getRegistrationVerificationCode,
  registerNewUser
} from "../../utils/webServices";
import { routerRedux } from "dva/router";
import Toast from "../../components/Toast/Toast";
import { setTimeout } from "timers";
import { generate } from "../../utils/wallet";
class WalletGenerationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      error_occur: false
    };
  }
  componentWillMount(){
    if(localStorage.getItem('address')){
      this.props.dispatch(routerRedux.push({ pathname: "/display" }));
    }
  }
  componentDidUpdate() {
    if (this.state.error_occur) {
      setTimeout(() => {
        this.setState({ error_occur: false });
      }, 1300);
    }
  }
  submitWalletForm() {
    if (
      this.state.confirmPassword !== this.state.password ||
      this.state.confirmPassword === ""
    ) {
      this.setState({ error_occur: true });
      return;
    } else {
      console.log(this.state.password);
      this.generateWallet(this.state.password)
    }
  }
  generateWallet(payload) {
    const wallet_returned = generate(payload);
    localStorage.setItem('key',JSON.parse(wallet_returned).key)
    localStorage.setItem('address',JSON.parse(wallet_returned).address)
    this.props.dispatch(routerRedux.push({ pathname: "/display" }));
  }
  render() {
    return (
      <div className={styles.base__container}>
        {(() => {
          if (this.state.error_occur) {
            return <Toast text="两次输入密码不一致" />;
          }
        })()}
        <div className={styles.back__button} />
        <div className={styles.wallet__icon} />
        <div className={styles.wallet__text}>生成钱包</div>
        <div className={styles.wallet__hint__text}>
          APP结算功能需要您生成一个独立32位钱包地址
          <br />
          请设置您的密码
        </div>
        <div className={styles.tel__container}>
          <InputItem
            caption="钱包密码"
            placeholder=""
            value={this.state.password}
            onChange={v => {
              this.setState({ password: v });
            }}
            error={this.state.phoneError}
            type="password"
          />
        </div>
        <div className={styles.verification__container}>
          <InputItem
            caption="确认密码"
            placeholder=""
            value={this.state.confirmPassword}
            onChange={v => {
              this.setState({ confirmPassword: v });
            }}
            type="password"
          />
        </div>

        <div
          className={styles.submit__botton}
          onClick={() => this.submitWalletForm()}
        >
          生成
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

WalletGenerationPage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(WalletGenerationPage);
