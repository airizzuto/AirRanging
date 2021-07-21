import React from "react";
import { Route, Switch } from "react-router-dom";
import { useModalClose } from "./hooks/useModalClose";

import "./App.scss";
import AircraftEditView from "./components/AircraftEditView/AircraftEditView";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import MapView from "./components/MapView/MapView";
import Footer from "./components/Footer/Footer";
import { useModalToggle } from "./hooks/useModalToggle";

const App = (): JSX.Element => {
  const [showLogin, setShowLogin] = React.useState(false);
  
  return (
    <div className={"App"}>
      <Header loginHandler={() => useModalToggle(setShowLogin, showLogin)} />
      <Login showLogin={showLogin} handleClose={() => useModalClose(setShowLogin)} />

      <Switch>
          <Route exact path="/">
            <MapView/>
          </Route>
          <Route exact path="/aircrafts">
            <AircraftEditView />
          </Route>
          <Route exact path="/airports">
            {/* <AirportsEditView /> */}
          </Route>
          <Route exact path="/registration">
            {/* <UserSignup /> */}
          </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
