import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./theme/vars.less";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Header from "./components/Header";
import Profile from "./components/profile/Profile";
import Meet from "./components/meet/Meet";
import RecordsMain from "./components/records/RecordsMain";
import Appointments from "./components/appointments/Appointments";

export default function App() {
  return (
    <Router>
      <div id="root">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/meet">
            <Meet />
          </Route>
          <Route exact path="/records">
            <RecordsMain />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/appointments">
            <Appointments />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
