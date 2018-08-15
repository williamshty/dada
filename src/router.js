import React from "react";
import {
  Transition,
  CSSTransition,
  TransitionGroup
} from "react-transition-group";
import { Router, Route, Switch } from "dva/router";
import IndexPage from "./routes/IndexPage/IndexPage";
import LoginPage from "./routes/LoginPage/LoginPage";
import RegistrationPage from "./routes/RegistrationPage/RegistrationPage";
import PhoneVerificationPage from "./routes/PhoneVerificationPage/PhoneVerificationPage";
import HistoryPage from "./routes/HistoryPage/HistoryPage";
import RootRegistrationPage from "./routes/RootRegistrationPage/RootRegistrationPage";
import WalletGenerationPage from "./routes/WalletGenerationPage/WalletGenerationPage";
import WalletDisplayPage from "./routes/WalletDisplayPage/WalletDisplayPage";
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
var TweenOneGroup = TweenOne.TweenOneGroup;
function RouterConfig({ history }) {
  return (
    // <Router history={history}>
    //       <Switch >
    //         <Route path="/" exact component={IndexPage} />
    //         <Route path="/login" component={LoginPage} />
    //         <Route path="/register" component={RegistrationPage} />
    //         <Route path="/verification" component={PhoneVerificationPage} />
    //         <Route path="/history" component={HistoryPage} />
    //         <Route path="/registration" component={RootRegistrationPage} />
    //         <Route path="/generate" component={WalletGenerationPage} />
    //         <Route path="/display" component={WalletDisplayPage} />
    //       </Switch>
    // </Router>
    <Router history={history}>
      <Route
        render={({ location }) => {
          const to = "/list";
          const key = location.pathname === "/" ? to : location.pathname;
          return (
            <TweenOneGroup
              appear={false}
              leave={{ x: -375, opacity: 1 }}
              yoyo={true}
              duration={1000}
            >
              <div key={key} id={key}>
                <Switch location={location}>
                  <Route path="/" exact component={IndexPage} />
                  <Route path="/login" component={LoginPage} />
                  <Route path="/register" component={RegistrationPage} />
                  <Route
                    path="/verification"
                    component={PhoneVerificationPage}
                  />
                  <Route path="/history" component={HistoryPage} />
                  <Route
                    path="/registration"
                    component={RootRegistrationPage}
                  />
                  <Route path="/generate" component={WalletGenerationPage} />
                  <Route path="/display" component={WalletDisplayPage} />
                </Switch>
              </div>
            </TweenOneGroup>
          );
        }}
      />
    </Router>
  );
}

export default RouterConfig;
