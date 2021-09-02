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
import TermsAndConditions from "./components/Pages/TermsAndConditions/TermsAndConditionsPage";
import AircraftCreate from "./components/Pages/AircraftCreate/AircraftCreatePage";
import AircraftEdit from "./components/Pages/AircraftEdit/AircraftEditPage";
import SuccessfulRegistration from "./components/Pages/EmailConfirmation/SuccessfulRegistrationPage";
import EmailConfirmation from "./components/Pages/EmailConfirmation/EmailConfirmationPage";
import EmailConfirmationFail from "./components/Pages/ErrorPages/EmailConfirmationFail";
import ForgotPassword from "./components/Pages/ForgotPassword/ForgotPasswordPage";
import PasswordResetSent from "./components/Pages/ForgotPassword/PasswordResetSent";
import PasswordResetPage from "./components/Pages/ForgotPassword/PasswordResetPage";
import PasswordResetSuccess from "./components/Pages/ForgotPassword/PasswordResetSuccess";
import NotFound from "./components/Pages/ErrorPages/NotFoundPage";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import Map from "./components/Map/Map";

import "./App.scss";

const App = (): JSX.Element =>{

  const [user, setUser] = useState<UserPublic | null>(null);
  const [aircrafts, setAircrafts] = useState<AircraftData[]>([]);
  const [aircraftsSaved, setAircraftsSaved] = useState<AircraftData[]>([]);
  const [aircraftSelected, setAircraftSelected] = useState<AircraftState | null>(null);

  // Sets initial aircrafts
  useEffect(() => {
    refreshAircrafts();
  }, []);

  // Sets user saved aircrafts
  useEffect(() => {
    isUserAuthenticated()
      .then(response => {

        if (response) {
          aircraftService.getAircraftsSavedByUser()
            .then(response => setAircraftsSaved(response));
        }
    
        console.log(aircraftsSaved);
    });
  }, [user]);

  // Sets user if a valid token is found in localStorage
  useEffect(() => {
    isUserAuthenticated()
      .then(_ => setUser(getUserData()));
  }, []);


  /* Aircrafts state handlers */
  const refreshAircrafts = () => {
    aircraftService
      .getAllAircrafts()
      .then(response => setAircrafts(response));
  };

  const handleAircraftsFilter = async (filter: string) => {
    filter
      ? await aircraftService
          .searchAircraftByModel(filter)
          .then(response => setAircrafts(response))
      : refreshAircrafts();
  };

  const handleAircraftCreate = async (newAircraft: NewAircraft) => {
    await aircraftService
      .createAircraft(newAircraft)
      .then(response => setAircrafts(aircrafts.concat(response)));
  };

  const handleAircraftEdit = async (aircraftId: string, editedAircraft: AircraftData) => {
    await aircraftService
      .editAircraft(aircraftId, editedAircraft)
      .then(() => setAircrafts(
        aircrafts.map(aircraft => aircraft.id !== aircraftId ? aircraft : editedAircraft)
      ));
  };

  const handleAircraftSelection = (selected: AircraftData | null) => {
    selected
    ? setAircraftSelected({
      ...selected,
      loadedFuel: selected.fuelCapacity,
      currentMaxRange: selected.maxRange
    })
    : setAircraftSelected(null);
  };

  /* User state handlers */
  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  return (
    <div className="App">
      <div className="Header">
        <Header 
          handleLogout={handleLogout}
          user={user}
        />
      </div>

      <div className="Map">
        {/* <Map selectedAircraft={aircraftSelected}/> */}
      </div>

      <div className="Main">
        <Switch>
            <Route exact path="/">
              <Home 
                aircrafts={aircrafts}
                selectedAircraft={aircraftSelected}
                handleAircraftSelection={handleAircraftSelection}
                handleAircraftsFiltering={handleAircraftsFilter}
                handleAircraftState={setAircraftSelected}
              />
            </Route>

            <Route exact path="/aircrafts">
              <Aircrafts
                aircrafts={aircrafts}
                handleAircraftsFilter={handleAircraftsFilter} 
                handleAircraftSelection={handleAircraftSelection}
              />
            </Route>

            <ProtectedRoute
              exact path="/aircrafts/details/:id"
              authenticationPath="/login"
              isAuthenticated={(async () => await isUserAuthenticated()) && user}
            >
              <AircraftEdit
                handleAircraftEdit={handleAircraftEdit}
                handleAircraftSelect={handleAircraftSelection}
              />
            </ProtectedRoute>

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

            <Route exact path="/successful">
              <SuccessfulRegistration />
            </Route>

            {/* TODO: Email confirmation refactor */}

            <Route exact path="/confirmed">
              <EmailConfirmation />
            </Route>

            <Route exact path="/confirmationfailed">
              <EmailConfirmationFail />
            </Route>
  
            <Route exact path="/forgotpass">
              <ForgotPassword />
            </Route>

            <Route exact path="/resetsent">
              <PasswordResetSent />
            </Route>

            <Route path="/reset">
              <PasswordResetPage />
            </Route>

            <Route exact path="/resetsuccess">
              <PasswordResetSuccess />
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
