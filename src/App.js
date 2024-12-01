import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./components/layout/Main";
import Home from "./pages/Home";
import PersonCars from "./pages/PersonCars";
import Trafic from "./pages/Trafic";
import Groups from "./pages/Groups";
import Olgo from "./pages/Olgo";
import NotFound from "./pages/NotFound";

import './App.css'
import "antd/dist/reset.css";


const App = () => {
  return (
    <div>
      <Switch>
        <Main>
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/persons-cars" component={PersonCars} />
            <Route exact path="/pattern" component={Olgo} />
            <Route exact path="/groups" component={Groups} />
            <Route exact path="/trafic" component={Trafic} />

            <Route path="*" component={Home} />
          </Switch>
        </Main>
      </Switch>
    </div>
  );
};

export default App;
