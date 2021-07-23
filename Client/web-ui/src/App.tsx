import React from "react";
import { Route, Switch } from "react-router-dom";
import { useModalClose } from "./hooks/useModalClose";
import { useModalToggle } from "./hooks/useModalToggle";

import MapView from "./components/MapView/MapView";
import AircraftEditView from "./components/AircraftEditView/AircraftEditView";
import UserRegistrationView from "./components/UserRegistration/UserRegistrationView";

import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";

import "./App.scss";

const App = (): JSX.Element => {
  const [showLogin, setShowLogin] = React.useState(false);
  
  return (
    <div className={"App"}>
      <div className="Header">
        <Header loginHandler={() => useModalToggle(setShowLogin, showLogin)} />
      </div>

      <Login showLogin={showLogin} handleClose={() => useModalClose(setShowLogin)} />
  
      <div className="Main">

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
              <UserRegistrationView />
            </Route>
            <Route exact path="/forgotpass">
              {/* <ForgotPassword /> */}
            </Route>
        </Switch>
      </div>
      

      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
