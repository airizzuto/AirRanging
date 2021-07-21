import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import AircraftEditView from "./components/AircraftEditView/AircraftEditView";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import MapView from "./components/MapView/MapView";
import Footer from "./components/Footer/Footer";

const App = (): JSX.Element => {
  const [showLogin, setShowLogin] = React.useState(false);
  
  const handleModalDisplay = (
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
    display: boolean
  ) => {
    setDisplayModal(display ? false : true);
  };

  const handleModalClose = (
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setShowModal(false);
  };

  return (
    <div className={"App"}>
      <Header loginHandler={() => handleModalDisplay(setShowLogin, showLogin)} />

      <Login showLogin={showLogin} handleClose={() => handleModalClose(setShowLogin)} />

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
