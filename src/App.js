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
  }

  logout() {
    console.log("Logout Success");
    this.setState({ user: {} });
  }

  render() {
    const value = {
      user: this.state.user,
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
