import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import aircraftService from "./services/aircraftService";
import userService from "./services/userService";
import { isUserAuthenticated } from "./helpers/tokenHelper";
import { getUserData } from "./helpers/userHelper";

import { UserPublic } from "./types/User/User";
import { AircraftData, AircraftState, NewAircraft } from "./types/Aircraft/Aircraft";

import Home from "./components/Pages/Home/HomePage";
import Aircrafts from "./components/Pages/Aircrafts/AircraftsPage";
import Login from "./components/Pages/UserLogin/LoginPage";
import UserRegistration from "./components/Pages/UserRegistration/UserRegistrationPage";
import NotFound from "./components/Pages/ErrorPages/NotFoundPage";
import TermsAndConditions from "./components/Pages/TermsAndConditions/TermsAndConditionsPage";
import AircraftCreate from "./components/Pages/AircraftCreate/AircraftCreatePage";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import Map from "./components/Map/Map";

import "./App.scss";

const App = (): JSX.Element =>{
  /* Aircrafts data */
  const [initialAircrafts, setInitialAircrafts] = useState<AircraftData[]>([]);
  const [aircrafts, setAircrafts] = useState<AircraftData[]>([]);
  useEffect(() => {
    refreshAircrafts();
    return () => {
      setAircrafts(initialAircrafts);
    };
  }, []);

  const refreshAircrafts = () => {
    aircraftService
      .getAllAircrafts()
      .then(response => setInitialAircrafts(response));
  };

  const handleAircraftsFilter = async (filter: string) => {
    if (filter) {
      await aircraftService
      .searchAircraftByModel(filter)
      .then(response => setAircrafts(response));
    }
  };

  const handleAircraftCreate = async (newAircraft: NewAircraft) => {
    await aircraftService
      .createAircraft(newAircraft)
      .then(response => setInitialAircrafts(response));
  };

  /* Aircraft selected state */
  const [selectedAircraft, setSelectedAircraft] = useState<AircraftState | null>(null);
  
  const handleAircraftSelection = (selected: AircraftData | null) => {
    selected 
    ? setSelectedAircraft({...selected, loadedFuel: selected.fuelCapacity})
    : setSelectedAircraft(null);
  };

  /* User */
  const [user, setUser] = useState<UserPublic | null>(null);
  useEffect(() => {
    if (isUserAuthenticated()) {
      setUser(getUserData());
    }
  }, []);

  const handleLogout = () => {
    userService.logout();
    setUser(null);
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
                handleAircraftsFiltering={handleAircraftsFilter}
                handleAircraftState={setSelectedAircraft}
              />
            </Route>
            <Route exact path="/aircrafts">
              <Aircrafts
                aircrafts={aircrafts}
                handleAircraftsFilter={handleAircraftsFilter} 
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
              <UserRegistration />
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
