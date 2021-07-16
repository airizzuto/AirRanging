import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import AircraftEditView from "./components/AircraftEditView/AircraftEditView";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MapView from "./components/MapView/MapView";

const App = (): JSX.Element => {
  return (
    <div className={"App"}>
      <Header />
  
      <Switch>
          <Route exact path="/">
            <MapView/>
          </Route>
          <Route exact path="/aircrafts">
            <AircraftEditView />
          </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
