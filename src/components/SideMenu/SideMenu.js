import React from "react";
import { connect } from "dva";
import { Drawer } from "antd-mobile";
import styles from "./SideMenu.css";
import loadPosition from "../../utils/locater";
import { routerRedux } from "dva/router";
import {
  getState,
  generate,
  unlockFile,
  sign,
  transaction
} from "../../utils/wallet";
// import SideBar from './Sidebar'

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuOpen: this.props.sideMenuOpen,
      trafficActivated: false
    };
  }
  async getCurrentWalletState(payload) {
    const current_wallet = await getState(payload.url, payload.address);
    console.log(current_wallet);
  }
  componentDidMount() {
    this.getCurrentWalletState({
      url: "https://testnet.nebulas.io",
      address: localStorage.getItem("address")
    });
  }
  render() {
    const sidebar = (
      <div className={styles.sidebar__background}>
        <div className={styles.side__avatar} />
        <div className={styles.phone__number}>
          {(() => {
            if (localStorage.getItem("phoneNum")) {
              return (
                <div>
                  {localStorage
                    .getItem("phoneNum")
                    .toString()
                    .substr(0, 3) +
                    "****" +
                    localStorage
                      .getItem("phoneNum")
                      .toString()
                      .substr(7)}
                </div>
              );
            } else return <div />;
          })()}
        </div>

        <div className={styles.money__text}>剩余星云币</div>
        <div className={styles.money__amount}>4.00 NAS</div>
        <div className={styles.sidebar__menu}>
          <div className={styles.driver__icon} />
          <div
            className={styles.driver__text}
            onClick={e => {
              e.stopPropagation();
              this.props.dispatch(routerRedux.push({ pathname: "/driver" }));
            }}
          >
            成为搭搭车主
          </div>
          <div className={styles.history__icon} />
          <div
            className={styles.history__text}
            onClick={e => {
              e.stopPropagation();
              this.props.dispatch(routerRedux.push({ pathname: "/history" }));
            }}
          >
            查看历史订单
          </div>
          <div className={styles.wallet__icon} />
          <div
            className={styles.wallet__text}
            onClick={e => {
              e.stopPropagation();
              this.props.dispatch(routerRedux.push({ pathname: "/display" }));
            }}
          >
            查看钱包地址
          </div>
          <div className={styles.privacy__icon} />
          <div
            className={styles.privacy__text}
            onClick={e => {
              e.stopPropagation();
              this.props.dispatch(routerRedux.push({ pathname: "/privacy" }));
            }}
          >
            隐私与法律条款
          </div>
          <div className={styles.about__icon} />
          <div
            className={styles.about__text}
            onClick={e => {
              e.stopPropagation();
              this.props.dispatch(routerRedux.push({ pathname: "/about" }));
            }}
          >
            关于搭搭
          </div>
          <div className={styles.exit__icon} />
          <div className={styles.exit__text}
          onClick={e => {
            e.stopPropagation();
            localStorage.clear()
            this.props.dispatch(routerRedux.push({ pathname: "/verification" }));
          }}
          >退出</div>
        </div>
      </div>
    );
    return (
      <div>
        <div
          className={styles.button__menu}
          onClick={() => this.onOpenChange()}
        />

        {(() => {
          if (!this.state.trafficActivated) {
            return (
              <div
                className={styles.button__traffic__deactive}
                onClick={() => this.onToggleTraffic()}
              >
                <div className={styles.button__side__filler} />
              </div>
            );
          } else {
            return (
              <div
                className={styles.button__traffic__active}
                onClick={() => this.onToggleTraffic()}
              >
                <div className={styles.button__side__filler} />
              </div>
            );
          }
        })()}
        <div
          className={styles.button__focus}
          onClick={() => loadPosition(this.props.dispatch)}
        >
          <div className={styles.button__side__filler} />
        </div>
        <Drawer
          className="my-drawer"
          style={{
            minHeight: document.documentElement.clientHeight,
            fontSize: 10
          }}
          contentStyle={{ color: "#A6A6A6", textAlign: "center" }}
          sidebar={sidebar}
          open={this.state.sideMenuOpen}
          onOpenChange={() => this.onOpenChange()}
          children={<div />}
        />
      </div>
    );
  }

  onOpenChange() {
    if (this.state.buttonStyle !== styles.button__animated) {
      this.setState({
        sideMenuOpen: !this.state.sideMenuOpen,
        buttonStyle: styles.button__animated
      });
    } else {
      this.setState({
        sideMenuOpen: !this.state.sideMenuOpen,
        buttonStyle: styles.button__animated_reverse
      });
    }

    // this.moveAlone.play()
  }
  onToggleTraffic() {
    this.setState({ trafficActivated: !this.state.trafficActivated });
    this.props.dispatch({
      type: "mapData/toggleTraffic",
      payload: {
        trafficActivated: !this.state.trafficActivated
      }
    });
  }
}

SideMenu.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(SideMenu);
