import React from 'react';
import { connect } from 'dva';
import styles from './WalletDisplayPage.css';
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import { routerRedux } from 'dva/router';
class WalletDisplayPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
      if(!localStorage.getItem('address')){
        this.props.dispatch(routerRedux.push({ pathname: "/generate " }));
      }
  }
  render() {
    return (
    <div className={styles.base__container}>
      <div className={styles.top__container}>
        <div className={styles.back__arrow} 
        onClick={()=>{
          this.props.dispatch(routerRedux.push({pathname:'/'}))
        }}
        >
        <img width={8} src={require('../../assets/backArrow.png')}></img>
        </div>
        <div className={styles.top__title}>
        查看钱包地址
        </div>
      </div>
      <div className={styles.wallet__icon}></div>
      <div className={styles.wallet__title}>32位电子钱包地址</div>
      <div className={styles.wallet__address}>{localStorage.getItem('address')}</div>
      <div className={styles.copy__button}>复制到剪贴板</div>
      
        
      
    </div>
  )
}
}

WalletDisplayPage.propTypes = {
};
function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(WalletDisplayPage);
