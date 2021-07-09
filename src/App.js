import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import Overview from "./components/overview/Overview";

export default function App() {
  return (
    <Router>
      <div id="root">
        <Header/>
        <Switch>
          <Route exact path="/">
            <Overview/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
