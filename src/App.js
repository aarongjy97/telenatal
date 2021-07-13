import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./theme/vars.less";
import Header from "./components/Header";
import Overview from "./components/overview/Overview";
import Teleconference from "./components/teleconference/Teleconference";

export default function App() {
  // document.body.classList.add('telenatal');
  return (
    <Router>
      <div id="root">
        <Header />
        <Switch>
          <Route exact path="/">
            <Overview />
          </Route>
          <Route exact path="/meet">
            <Teleconference />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
