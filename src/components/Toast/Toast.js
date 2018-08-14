import React from "react";
import { connect } from "dva";
import styles from "./Toast.css";

class Toast extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className={styles.toast__background}>
          <div className={styles.toast__text}>{this.props.text}</div>
        </div>
      </div>
    );
  }
}

Toast.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Toast);
