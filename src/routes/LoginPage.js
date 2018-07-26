import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.css';
import InputItem from '../components/Forms/InputItem'
import {routerRedux} from 'dva/router';
import {getLoginVerificationCode} from '../utils/webServices'
class LoginPage extends React.Component {
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
  async loadLoginVerificationCode(){
      if(this.state.tel.toString().length!==11) {
          this.setState({phoneError:'true'})
          return
        }
    const verification_code = await getLoginVerificationCode(this.state.tel)
    console.log(verification_code)
    if(verification_code.data.code!==1001&&verification_code.data.code!==1002){
      this.setState({phoneError:'true'})
          return
    } else if(verification_code.data.code===1002){
      this.setState({
        phoneError:'true',
        phoneNotRegistered:true
      })
          return
    }
    else{
      this.setState({
        verificationSent:true,
        phoneNotRegistered:false,
        receivedVerification:verification_code.data.data.code
      })
      this.triggerCountDownTimer()
    }
  }
  countDown(){
    this.setState({countDownTime:this.state.countDownTime-1})
  }
  triggerCountDownTimer(){
    this.interval = setInterval(()=>{this.countDown()},1000)
  }
  triggerClearInterval(){
    clearInterval(this.interval)
  }
  submitLoginForm(){
    
    if(this.state.enteredVerification!==this.state.receivedVerification||this.state.enteredVerification===''){
      this.setState({verificationError:'true'})
      return
    } else{
      this.props.dispatch({
        type:'navigator/save',
        payload:{
          isLoggedIn:true
        }
      })
      localStorage.setItem('isLoggedIn',true)
      this.props.dispatch(routerRedux.push({pathname:'/'}))
    }
  }
  componentDidMount(){
    // console.log(this.props)
  }
    render(){
      return (
        <div className={styles.base__container}>
            <div className={styles.login__icon}></div>
            <div className={styles.login__text}>
                <span className={styles.login__character}>登录</span>
                &nbsp;&nbsp; 
                <span className={styles.login__letter}>LOGIN</span>
            </div>
            <div className={styles.tel__container}>
                <InputItem
                error={this.state.phoneError}
                caption='手机号'
                placeholder=''
                value={this.state.tel}
                onChange={(v)=>{this.setState({tel:v})}}/>
            </div>
            <div className={styles.verification__container}>
                <InputItem
                error={this.state.verificationError}
                caption='验证码'
                placeholder=''
                value={this.state.verificationEntered}
                onChange={(v)=>{this.setState({enteredVerification:v})}}/>
            </div>

            {(()=>{
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
            })()}
            {(()=>{
              if(this.state.phoneError==='true'&&!this.state.phoneNotRegistered) {
                return (
                <div className={styles.error__text}>
                手机号格式错误
                </div>
              )}else if(this.state.phoneNotRegistered){
                return (
                <div className={styles.error__text}>
                手机号尚未注册
                </div>
                )
              }
              else if(this.state.verificationError==='true'){return (
                <div className={styles.error__text}>
                  验证码输入错误
                </div>
              )}
            })()}

            <div className={styles.submit__botton} onClick={()=>this.submitLoginForm()}>
            提交
            </div>
            <div className={styles.registration__text} onClick={()=>{
              this.props.dispatch(routerRedux.push({pathname:'/register'}))
              }}>
            注册账号
            </div>
            <div className={styles.logo__container}>
            </div>
       </div>
        
      )
    }
}

LoginPage.propTypes = {
};


function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(LoginPage);