import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useModalToggle } from "./hooks/useModalToggle";

import aircraftService from "./services/aircraftService";
import userService from "./services/userService";
import { isUserAuthenticated } from "./helpers/tokenHelper";

import { UserPublic } from "./types/User/User";
import { AircraftData } from "./types/Aircraft/Aircraft";

import Home from "./components/Pages/Home";
import AircraftsView from "./components/Pages/Aircrafts";
import UserRegistrationView from "./components/Pages/UserRegistration";
import NotFound from "./components/Pages/ErrorPages/NotFound";
import TermsAndConditions from "./components/Pages/TermsAndConditions";
import AircraftCreate from "./components/Pages/AircraftCreate";

import Header from "./components/Header/Header";
import Login from "./components/UserLogin/Login";
import Footer from "./components/Footer/Footer";

import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute";

const App = (): JSX.Element =>{
  const [showLogin, setShowLogin] = useState(false);
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
          handleLogin={() => useModalToggle(setShowLogin, showLogin)}
          handleLogout={userLogout}
          user={user}
        />
      </div>

      <Login 
        showLogin={showLogin} 
        setShowLogin={setShowLogin}
        setUser={setUser}
      />
  
      <div className="Main">
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/aircrafts">
              <AircraftsView aircrafts={aircrafts}/>
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
