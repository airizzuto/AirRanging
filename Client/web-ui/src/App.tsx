import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import aircraftService from "./services/aircraftService";
import userService from "./services/userService";
import { isUserAuthenticated } from "./helpers/tokenHelper";

import { UserPublic } from "./types/User/User";
import { AircraftData } from "./types/Aircraft/Aircraft";

import Home from "./components/Pages/Home";
import Aircrafts from "./components/Pages/Aircrafts";
import UserRegistrationView from "./components/Pages/UserRegistration";
import NotFound from "./components/Pages/ErrorPages/NotFound";
import TermsAndConditions from "./components/Pages/TermsAndConditions";
import AircraftCreate from "./components/Pages/AircraftCreate";

import Header from "./components/Header/Header";
import Login from "./components/Pages/UserLogin/Login";
import Footer from "./components/Footer/Footer";

import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute";

const App = (): JSX.Element =>{
  const [user, setUser] = useState<UserPublic | null>(null);
  const [aircrafts, setAircrafts] = useState<AircraftData[]>([]);

  useEffect(() => {
    refreshAircrafts();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON && isUserAuthenticated()) {
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
  
  const refreshAircrafts = async () => {
    const aircrafts = await aircraftService.getAllAircrafts();
    setAircrafts(aircrafts);
  };

  // TODO: route matching
  // const matchAircraftRoute = useRouteMatch("/aircrafts/:id");
  // const matchUserRoute = useRouteMatch("/users/:id");

  return (
    <div className={"App"}>
      <div className="Header">
        <Header 
          handleLogout={userLogout}
          user={user}
        />
      </div>
  
      <div className="Main">
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/aircrafts">
              <Aircrafts
                aircrafts={aircrafts} 
              />
            </Route>
            <Route exact path="/aircrafts/detail/:id">
              {/* <AircraftDetail aircraft={aircraftSelected}/> */}
            </Route>
            <ProtectedRoute exact path="/aircrafts/create" authenticationPath="/login">
              <AircraftCreate />
            </ProtectedRoute>
            <Route exact path="/airports">
              {/* <AirportsEditView /> */}
            </Route>
            <Route exact path="/login">
              <Login setUser={setUser}/>
            </Route>
            <Route exact path="/registration">
              <UserRegistrationView />
            </Route>
            <Route exact path="/forgotpass">
              {/* <ForgotPassword /> */}
            </Route>
            <Route exact path="/terms">
              <TermsAndConditions />
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
