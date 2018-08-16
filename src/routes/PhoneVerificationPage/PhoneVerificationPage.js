import React from 'react';
import { connect } from 'dva';
import styles from './PhoneVerificationPage.css';
import InputItem from '../../components/Forms/InputItem'
import {routerRedux} from 'dva/router';
import {getLoginVerificationCode,verifyPhoneNum} from '../../utils/webServices'
class PhoneVerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        tel:'',
        enteredVerification:'',
        receivedVerification:'',
        phoneError:'',
        verificationSent:false,
        verificationError:'',
        countDownTime:60,
        phoneNotRegistered:false
    }
  }
  componentDidUpdate(){
    if(this.state.verificationSent&&this.state.phoneError==='true'){
      this.setState({phoneError:''})
    }
    if(this.state.countDownTime<=0){
      this.triggerClearInterval()
      this.setState({
        verificationSent:false,
        countDownTime:60
      })
    }
  }
  async verifyPhoneNumFunction(phoneNum) {
    console.log(phoneNum)
    const verify_result = await verifyPhoneNum(phoneNum)
    console.log(verify_result)
    if(verify_result.data.data){
      localStorage.setItem('phoneNum',phoneNum)
      this.props.dispatch(routerRedux.push({pathname:'/login'}))
    } else{
      localStorage.setItem('phoneNum',phoneNum)
      this.props.dispatch(routerRedux.push({pathname:'/register'}))
    }
  }
  submitLoginForm(){
    this.verifyPhoneNumFunction(this.state.tel)
  }
  componentDidMount(){
    // console.log(this.props)
  }
    render(){
      return (
        <div className={styles.base__container}>
            {/* <div className={styles.back__button}></div> */}
            <div className={styles.login__icon}></div>
            <div className={styles.login__text}>
              登录
            </div>
            <div className={styles.login__hint__text}>
            搭搭拼车需要登录后才能为您服务
            </div>
            {/* <div className={styles.tel__container}>
                <InputItem
                error={this.state.phoneError}
                caption='手机号'
                placeholder=''
                value={this.state.tel}
                onChange={(v)=>{this.setState({tel:v})}}/>
            </div> */}
            <div className={styles.verification__container}>
                <InputItem
                caption='手机号'
                placeholder=''
                value={this.state.tel}
                onChange={(v)=>{this.setState({tel:v})}}/>
            </div>

            {/* {(()=>{
              if(!this.state.verificationSent){return(
                <div className={styles.verification__button} 
                onClick={this.loadLoginVerificationCode.bind(this)}>
                  发送验证码
                </div>
              )}
              else return(
                <div className={styles.verification__sent}>
                  {this.state.countDownTime}s
                </div>
              )
            })()} */}
            <div className={styles.registration__text} onClick={()=>{
              this.props.dispatch(routerRedux.push({pathname:'/registration'}))
              }}>
            注册账号
            </div>
            <div className={styles.submit__botton} onClick={()=>this.submitLoginForm()}>
           登录
            </div>
            <div className={styles.logo__container}>
            </div>
       </div>
        
      )
    }
}

PhoneVerificationPage.propTypes = {
};


function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(PhoneVerificationPage);