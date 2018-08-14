import React from 'react';
import { connect } from 'dva';
import styles from './HistoryPage.css';
import HistoryCard from '../../components/HistoryCard/HistoryCard';
import { routerRedux } from 'dva/router';
class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
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
        历史订单
        </div>
      </div>
      <div className={styles.history__scroller}>
        <div className={styles.history__card__container}>
        <HistoryCard
        startTitle='天府软件园A区'
        startInfo='四川省成都市武侯区天府三街'
        endTitle='锦江瑞康医院'
        endInfo='成都市成华区牛市口'
        timeStamp='2018.7.23 22:16'
        price='36.67'
        />
        </div>
        <div className={styles.history__card__container}>
        <HistoryCard
        startTitle='天府软件园A区'
        startInfo='四川省成都市武侯区天府三街'
        endTitle='锦江瑞康医院'
        endInfo='成都市成华区牛市口'
        timeStamp='2018.7.23 22:16'
        price='36.67'
        />
        </div>
        <div className={styles.history__card__container}>
        <HistoryCard
        startTitle='天府软件园A区'
        startInfo='四川省成都市武侯区天府三街'
        endTitle='锦江瑞康医院'
        endInfo='成都市成华区牛市口'
        timeStamp='2018.7.23 22:16'
        price='36.67'
        />
        </div>
        <div className={styles.history__card__container}>
        <HistoryCard
        startTitle='天府软件园A区'
        startInfo='四川省成都市武侯区天府三街'
        endTitle='锦江瑞康医院'
        endInfo='成都市成华区牛市口'
        timeStamp='2018.7.23 22:16'
        price='36.67'
        />
        </div>
      </div>
    </div>
  )
}
}

HistoryPage.propTypes = {
};
function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(HistoryPage);
