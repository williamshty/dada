import React from 'react';
import { connect } from 'dva';
import styles from './DriverPage.css';
import { routerRedux } from "dva/router";
class DriverPage extends React.Component {
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

DriverPage.propTypes = {
};
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(DriverPage);
