import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useModalClose } from "./hooks/useModalClose";
import { useModalToggle } from "./hooks/useModalToggle";

import aircraftService from "./services/aircraftService";

import MapView from "./components/Pages/MapView/MapView";
import AircraftsView from "./components/Pages/AircraftEditView/AircraftsView";
import UserRegistrationView from "./components/Pages/UserRegistration/UserRegistrationView";
import NotFound from "./components/Pages/ErrorPages/NotFound";

import Header from "./components/Header/Header";
import Login from "./components/UserLogin/Login";
import Footer from "./components/Footer/Footer";

import "./App.scss";
import userService from "./services/userService";

const App = (): JSX.Element => {
  // TODO: refactor to global states to useContext
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // TODO: aircraftSelected state

  // TODO: route matching
  // const matchAircraftRoute = useRouteMatch("/aircrafts/:id");
  // const matchUserRoute = useRouteMatch("/users/:id");
  // const aircraftSelected = null; // TODO: service get aircraft by id

  // aircrafts state effect

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("userToken");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      /* Send user token to services needing authentication for requests */
      aircraftService.setToken(user.token);
    }
  }, []);

  const userLogout = () => {
    userService.logout();
    setUser(null);
  };

  return (
    <div className={"App"}>
      <div className="Header">
        <Header 
          handleLogin={() => useModalToggle(setShowLogin, showLogin)}
          handleLogout={userLogout}
          user={user}
        />
      </div>

      <Login 
        showLogin={showLogin} 
        handleClose={() => useModalClose(setShowLogin)}
        setUser={setUser}
      />
  
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
