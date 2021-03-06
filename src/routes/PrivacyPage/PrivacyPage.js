import React from 'react';
import { connect } from 'dva';
import styles from './PrivacyPage.css';
import { routerRedux } from "dva/router";
class PrivacyPage extends React.Component {
  render(){
    return (
      <div className={styles.normal}>
        <div
            className={styles.back__button}
            onClick={()=>{
              this.props.dispatch(
                routerRedux.push({ pathname: "/" })
              )
            }}
          />
      </div>
    );
  }
}

PrivacyPage.propTypes = {
};
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(PrivacyPage);
