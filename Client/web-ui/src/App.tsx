import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import AircraftEditView from "./components/AircraftEditView";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MapView from "./components/MapView";

const App = (): JSX.Element => {
  return (
    <div className={"App"}>
      <Header />
  
      <Switch>
          <Route path="/" component={MapView} />
          <Route path="aircrafts" component={AircraftEditView} />
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
