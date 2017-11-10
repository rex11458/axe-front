import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import { LocaleProvider } from "antd";
import en_US from "antd/lib/locale-provider/en_US";
import BasicLayout from "./layouts/BasicLayout";
import UserLayout from "./layouts/UserLayout";
import IndexPage from './routes/IndexPage'
class RouterConfig {
  static routeConfig: ({ history }) => JSX.Element = function({
    history
  }): JSX.Element {
    return (
      <LocaleProvider locale={en_US}>
        <Router history={history}>
          <Switch>
            <Route path="/user" component={UserLayout} />
            <Route path="/" component={BasicLayout} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </LocaleProvider>
    );
  };
}

export default RouterConfig;
