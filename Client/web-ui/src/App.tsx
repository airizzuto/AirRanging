import React from "react";
import { Route, Switch } from "react-router-dom";
import { useModalClose } from "./hooks/useModalClose";
import { useModalToggle } from "./hooks/useModalToggle";

import MapView from "./components/Pages/MapView/MapView";
import AircraftsView from "./components/Pages/AircraftEditView/AircraftsView";
import UserRegistrationView from "./components/Pages/UserRegistration/UserRegistrationView";

import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";

import "./App.scss";
import NotFound from "./components/Pages/ErrorPages/NotFound";

const App = (): JSX.Element => {
  const [showLogin, setShowLogin] = React.useState(false);
  // TODO: aircrafts state
  // TODO: user state

  // TODO: route matching
  // const match = useRouteMatch("/aircrafts/:id");
  // const aircraftSelected = null; // TODO: service get aircraft by id

  // aircrafts state effect

  return (
    <div className={"App"}>
      <div className="Header">
        <Header loginHandler={() => useModalToggle(setShowLogin, showLogin)} />
      </div>

      <Login showLogin={showLogin} handleClose={() => useModalClose(setShowLogin)} />
  
      <div className="Main">
        <Switch>
            <Route exact path="/">
              <MapView />
            </Route>
            <Route exact path="/aircrafts">
              <AircraftsView />
            </Route>
            <Route exact path="/aircrafts/:id">
              {/* <AircraftDetail aircraft={aircraftSelected}/> */}
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
            <Route path="*">
              <NotFound />
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
