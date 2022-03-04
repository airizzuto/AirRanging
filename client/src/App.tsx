import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import aircraftService from "./services/aircraftService";
import userService from "./services/userService";
import bookmarkService from "./services/bookmarkService";
import { isUserAuthenticated } from "./helpers/tokenHelper";
import { getUserData } from "./helpers/userHelper";

import { UserPublic } from "./types/User/User";
import { AircraftWithSocials, AircraftSelected, CloneAircraft, AircraftWithoutIDs } from "./types/Aircraft/Aircraft";
import { Coordinates } from "./types/Map/MapTypes";

import Home from "./components/Pages/Home/HomePage";
import Aircrafts from "./components/Pages/Aircrafts/AircraftsPage";
import AircraftDetails from "./components/Pages/Aircrafts/AircraftDetails/AircraftDetailsPage";
import AircraftCreate from "./components/Pages/Aircrafts/AircraftCreate/AircraftCreatePage";
import Login from "./components/Pages/UserLogin/LoginPage";
import UserRegistration from "./components/Pages/UserRegistration/UserRegistrationPage";
import TermsAndConditions from "./components/Pages/Legals/TermsAndConditionsPage";
import PrivacyPolicy from "./components/Pages/Legals/PrivacyPolicyPage";
import About from "./components/Pages/About/About";
import Contact from "./components/Pages/Contact/Contact";
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
import Map from "./components/Map/Map";

import "./App.scss";
import { LandmarkWithSocials } from "./types/Landmark/Landmark";
import landmarkService from "./services/landmarkService";

const App = (): JSX.Element =>{
  const history = useHistory();

  const [user, setUser] = useState<UserPublic | null>(null);
  const [initialAircrafts, setInitialAircrafts] = useState<AircraftWithSocials[]>([]);
  const [aircraftsSaved, setAircraftsSaved] = useState<AircraftWithSocials[]>([]);
  const [aircraftSelected, setAircraftSelected] = useState<AircraftSelected | null>(null);
  const [mapPoints, setMapPoints] = useState<Coordinates[]>([]);
  const [landmarks, setLandmarks] = useState<LandmarkWithSocials[]>([]);

  // Sets user if a valid token is found in localStorage
  useEffect(() => {
    console.debug("EFFECT - user check");

    loadLandmarks();

    isUserAuthenticated()
      .then((isAuthenticated) =>
        isAuthenticated
        ? setUser(getUserData()) 
        : setUser(null));
  }, []);

  // Sets user saved aircrafts
  useEffect(() => {
    console.debug("EFFECT - user aircrafts refresh");

    if (user) {
      refreshSavedAircrafts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, initialAircrafts]);

  /* Aircrafts state handlers */
  const refreshAircrafts = async () => {
    await aircraftService.getAllAircrafts()
      .then((response) => setInitialAircrafts(response.data))
      .catch(error => {
        setInitialAircrafts([]);
        console.error("Retrieving all aircrafts - ", error);
      });
  };

  const refreshSavedAircrafts = async () => {
    user
    ? await aircraftService.getAircraftsSavedByUser()
        .then((response) => setAircraftsSaved(response.data))
        .catch(error => {
          setAircraftsSaved([]);
          console.error("Retrieving saved aicrafts - ", error);
        })
    : setAircraftsSaved([]);
  };

  const handleAircraftCreate = async (newAircraft: AircraftWithoutIDs) => {
    await aircraftService.createAircraft(newAircraft)
      .then((response) => setInitialAircrafts(initialAircrafts.concat(response)))
      .catch(error => console.error("Creating aircraft - ", error));
  };

  const handleAircraftEdit = async (aircraftId: string, editedAircraft: AircraftWithSocials) => {
    await aircraftService.editAircraft(aircraftId, editedAircraft)
      .then(_ => setInitialAircrafts(initialAircrafts.map(aircraft => 
        aircraft.id !== aircraftId ? aircraft : editedAircraft
      ))).catch(error => console.error("Editing aircraft - ", error));
  };

  const handleAircraftSave = async (aircraftId: string) => {
    await aircraftService.saveAircraft(aircraftId)
      // TODO: abstract
      .then(async () => {
        // Updates saved aircrafts list
        await refreshSavedAircrafts();
        // Refreshes saved aircraft in aircrafts list
        await aircraftService.getAircraftById(aircraftId)
          .then(response => setInitialAircrafts(
              initialAircrafts.map(aircraft => aircraft.id !== aircraftId ? aircraft : response.data)
          )).catch(error => console.error(`Fetching aircraft ${aircraftId}: `, error));
      }).catch(error => console.error("Retrieving aircraft - ", error));
  };

  const handleAircraftUnsave = async (aircraftId: string) => {
    await bookmarkService.unsaveAircraft(aircraftId)
      // TODO: abstract
      .then(async () => {
        // Updates saved aircrafts list
        await refreshSavedAircrafts();
        // Refreshes saved aircraft in aircrafts list
        await aircraftService.getAircraftById(aircraftId)
          .then(response => setInitialAircrafts(
              initialAircrafts.map(aircraft => aircraft.id !== aircraftId ? aircraft : response.data)
          )).catch(error => console.error(`Fetching aircraft ${aircraftId} - `, error));
      }).catch(error => console.error("Retrieving aircraft - ", error));
  };

  const handleAircraftSelection = (selected: AircraftWithSocials | null) => {
    selected
    ? setAircraftSelected({
      ...selected,
      loadedFuel: selected.fuelCapacity,
      currentMaxRange: selected.maxRange
    })
    : setAircraftSelected(null);
  };

  const handleAircraftDelete = async (aircraftId: string) => {
    // Deselects aircraft to be deleted if its the same as the one currently selected
    if (aircraftSelected?.id === aircraftId) {
      setAircraftSelected(null);
    }

    await aircraftService.deleteAircraft(aircraftId)
      .then(async () => await refreshAircrafts())
      .catch(error =>
        console.error(`Deleting aircraft ${aircraftId}: `, error)
      );
  };

  const handleAircraftCloning = async (aircraft: CloneAircraft) => {
    await aircraftService.cloneAircraft(aircraft)
      .then(async (response) => {
        await refreshAircrafts()
          .then(_ => history.push(`/aircrafts/details/${response.data.id}`));
      }).catch(error => console.error("Cloning aircraft: ", error));
  };

  /* Map state handlers */
  const handleSelectMapPoint = (point: Coordinates | LandmarkWithSocials) => {
    if (mapPoints.includes(point)) {
      return handleDeselectMapPoint(point);
    }

    setMapPoints(mapPoints.concat(point));
  };

  const handleDeselectMapPoint = (point: Coordinates | LandmarkWithSocials) => {
    setMapPoints(mapPoints.filter(p => p !== point));
  };

  const loadLandmarks = async () => {
    await landmarkService.getAllLandmarks()
      .then(result => {
        result.length ? setLandmarks(result) : setLandmarks([]);
      }).catch(error => {
        console.error("loadLandmarks error:", error);
        setLandmarks([]);
      });
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
        <Map 
          selectedAircraft={aircraftSelected}
          mapPoints={mapPoints}
          landmarks={landmarks}
          selectMapPoint={handleSelectMapPoint}
          deselectMapPoint={handleDeselectMapPoint}
        />
      </div>

      <div className="Main">
        <Switch>
            <Route exact path="/">
              <Home
                aircraftsSaved={aircraftsSaved}
                selectedAircraft={aircraftSelected}
                mapPoints={mapPoints}
                handleAircraftSelection={handleAircraftSelection}
                handleAircraftState={setAircraftSelected} handleAircraftSave={handleAircraftSave} handleAircraftUnsave={handleAircraftUnsave}
              />
            </Route>

            <Route exact path="/aircrafts">
              <Aircrafts
                user={user}
                aircraftsSaved={aircraftsSaved}
                handleAircraftSelection={handleAircraftSelection}
                handleAircraftSave={handleAircraftSave}
                handleAircraftUnsave={handleAircraftUnsave}
              />
            </Route>

            <Route
              exact path="/aircrafts/details/:aircraftId"
            >
              <AircraftDetails
                aircraftsSaved={aircraftsSaved}
                handleAircraftEdit={handleAircraftEdit}
                handleAircraftSelect={handleAircraftSelection}
                handleAircraftSave={handleAircraftSave}
                handleAircraftUnsave={handleAircraftUnsave}
                handleAircraftDelete={handleAircraftDelete}
                handleAircraftCloning={handleAircraftCloning}
              />
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

            <Route exact path="/privacy">
              <PrivacyPolicy />
            </Route>

            <Route exact path="/about">
              <About />
            </Route>

            <Route exact path="/contact">
              <Contact />
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
