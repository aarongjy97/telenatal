import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./theme/vars.less";
import Header from "./components/Header";
import Overview from "./components/overview/Overview";
import Profile from "./components/profile/Profile";
import RecordsMain from "./components/records/RecordsMain";

export default function App() {
  return (
    <Router>
      <div id="root">
        <Header />
        <Switch>
          <Route exact path="/">
            <Overview />
          </Route>
          <Route exact path="/records">
            <RecordsMain />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
