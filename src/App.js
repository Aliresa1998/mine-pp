import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Main from "./components/layout/Main";
import Home from "./pages/Home";
import PersonCars from "./pages/PersonCars";
import Trafic from "./pages/Trafic";
import Groups from "./pages/Groups";
import Olgo from "./pages/Olgo";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn"; // Assuming you have a SignIn component

import "./App.css";
import "antd/dist/reset.css";

// Private Route Component
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("user") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

const App = () => {
  useEffect(() => {
    if (
      !window.location.href.includes("sign-in") &&
      !localStorage.getItem("user")
    ) {
      window.location.href = "/sign-in";
    }
  }, []);

  return (
    <div>
      <Switch>
        <Main>
          <Switch>
            <Route exact path="/sign-in" component={SignIn} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/dashboard" component={Home} />
            <PrivateRoute exact path="/persons-cars" component={PersonCars} />
            <PrivateRoute exact path="/pattern" component={Olgo} />
            <PrivateRoute exact path="/groups" component={Groups} />
            <PrivateRoute exact path="/trafic" component={Trafic} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Main>
      </Switch>
    </div>
  );
};

export default App;
