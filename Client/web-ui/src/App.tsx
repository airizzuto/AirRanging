import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import aircraftService from "./services/aircraftService";
import userService from "./services/userService";
import { isUserAuthenticated } from "./helpers/tokenHelper";

import { UserPublic } from "./types/User/User";
import { AircraftData, AircraftState, NewAircraft } from "./types/Aircraft/Aircraft";

import Home from "./components/Pages/Home/Home";
import Aircrafts from "./components/Pages/Aircrafts/Aircrafts";
import UserRegistrationView from "./components/Pages/UserRegistration/UserRegistration";
import NotFound from "./components/Pages/ErrorPages/NotFound";
import TermsAndConditions from "./components/Pages/TermsAndConditions/TermsAndConditions";
import AircraftCreate from "./components/Pages/AircraftCreate/AircraftCreate";

import Header from "./components/Header/Header";
import Login from "./components/Pages/UserLogin/Login";
import Footer from "./components/Footer/Footer";
// import Map from "./components/Map/Map";

import "./App.scss";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUserData } from "./helpers/userHelper";

const App = (): JSX.Element =>{
  const [initialAircrafts, setInitialAircrafts] = useState<AircraftData[]>([]);
  const [aircrafts, setAircrafts] = useState<AircraftData[]>(initialAircrafts);
  const [selectedAircraft, setSelectedAircraft] = useState<AircraftState | null>(null);
  const [user, setUser] = useState<UserPublic | null>(null);

  useEffect(() => {
    refreshAircrafts();

    if (isUserAuthenticated()) {
      setUser(getUserData());
    }
  }, []);

  const handleAircraftCreate = (newAircraft: NewAircraft) => {
    aircraftService
      .createAircraft(newAircraft)
      .then(response => {
        setInitialAircrafts(initialAircrafts.concat(response));
      });
  };
  
  const handleAircraftSelection = (selected: AircraftData | null) => {
    selected 
    ? setSelectedAircraft({...selected, loadedFuel: selected.fuelCapacity})
    : setSelectedAircraft(null);
  };

  const handleAircraftsFiltering = (filter: string) => {
    aircraftService.searchAircraftByModel(filter)
      .then(aircrafts => setAircrafts(aircrafts));
  };

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };
  
  const refreshAircrafts = () => {
    aircraftService
      .getAllAircrafts()
      .then(aircrafts => setInitialAircrafts(aircrafts));
  };

  return (
    <div className={"App"}>
      <div className="Header">
        <Header 
          handleLogout={handleLogout}
          user={user}
        />
      </div>

      <div className={"Map"}>
        {/* <Map /> */}
      </div>

      <div className="Main">
        <Switch>
            <Route exact path="/">
              <Home 
                aircrafts={aircrafts}
                selectedAircraft={selectedAircraft}
                handleAircraftSelection={handleAircraftSelection}
                handleAircraftsFiltering={handleAircraftsFiltering}
                handleAircraftState={setSelectedAircraft}
              />
            </Route>
            <Route exact path="/aircrafts">
              <Aircrafts
                initialAircrafts={initialAircrafts} 
              />
            </Route>
            <Route exact path="/aircrafts/detail/:id">
              {/* <AircraftDetail aircraft={aircraftSelected}/> */}
            </Route>
            <ProtectedRoute 
              path="/aircrafts/create" 
              authenticationPath="/login"
              isAuthenticated={(async () => await isUserAuthenticated()) && user}
            >
              <AircraftCreate handleCreate={handleAircraftCreate}/>
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
