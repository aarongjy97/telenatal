import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./theme/vars.less";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Header from "./components/Header";
import Meet from "./components/meet/Meet";
import RecordsMain from "./components/records/RecordsMain";
import Appointments from "./components/appointments/Appointments";
import { userContext } from "./userContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user) {
    console.log("Login Success");
    this.setState({ user: user });
    localStorage.setItem("user", JSON.stringify(user));
  }

  logout() {
    console.log("Logout Success");
    this.setState({ user: {} });
    localStorage.removeItem("user");
  }

  render() {
    const user =
      localStorage.getItem("user") != null
        ? JSON.parse(localStorage.getItem("user"))
        : this.state.user;
    const value = {
      user: user,
      loginUser: this.login,
      logoutUser: this.logout,
    };

    return (
      <userContext.Provider value={value}>
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
              <Route exact path="/appointments">
                <Appointments />
              </Route>
            </Switch>
          </div>
        </Router>
      </userContext.Provider>
    );
  }
}

export default App;
