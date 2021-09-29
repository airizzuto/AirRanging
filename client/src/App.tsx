import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import aircraftService from "./services/aircraftService";
import userService from "./services/userService";
import bookmarkService from "./services/bookmarkService";
import { isUserAuthenticated } from "./helpers/tokenHelper";
import { getUserData } from "./helpers/userHelper";

import { UserPublic } from "./types/User/User";
import { AircraftWithSocials, AircraftState, CloneAircraft, AircraftWithoutIDs } from "./types/Aircraft/Aircraft";

import Home from "./components/Pages/Home/HomePage";
import Aircrafts from "./components/Pages/Aircrafts/AircraftsPage";
import AircraftDetails from "./components/Pages/AircraftDetails/AircraftDetailsPage";
import AircraftCreate from "./components/Pages/AircraftCreate/AircraftCreatePage";
import Login from "./components/Pages/UserLogin/LoginPage";
import UserRegistration from "./components/Pages/UserRegistration/UserRegistrationPage";
import TermsAndConditions from "./components/Pages/TermsAndConditions/TermsAndConditionsPage";
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
  const history = useHistory();

  /* TODO: refactor filter handler
    1. DONE: Fetch data sets

    2. DONE: New currentAircrafts[] state

    3. DONE: Filter by data set
      dataFilters: {showOwned: boolean, showSaved: boolean}
      
    4. TODO: Filter by field
      dataFilterByField: { fieldFilter: AircraftFields, filterInfo: string }
      
      fieldFilter defaults to model

    5. TODO: Filter handler
      filterHandler(filters) => {
        filterSetFunction() => {
          if (filters.showOwned) setCurrentAircrafts(currentAircrafts.concat(owned))
          if (filters.showSaved) setCurrentAircrafts(currentAircrafts.concat(saved))
          else setCurrentAircrafts(initialAircrafts)
        }
        filterPropsFunction() =>{
          if (filters.byField && filters.filterInfo)
            setCurrentAircrafts(currentAircraft.filter(aircraft => aircraft[field] === filter))
        }
      }
  */

  const [user, setUser] = useState<UserPublic | null>(null);
  const [initialAircrafts, setInitialAircrafts] = useState<AircraftWithSocials[]>([]);
  const [aircraftsSaved, setAircraftsSaved] = useState<AircraftWithSocials[]>([]);
  const [aircraftsOwned, setAircraftsOwned] = useState<AircraftWithSocials[]>([]);
  // const [currentAircrafts, setCurrentAircrafts] = useState<AircraftWithSocials[]>([]);
  // const [filter, setFilter] = useState<AircraftsSets>({owned: false, saved: false});
  const [aircraftSelected, setAircraftSelected] = useState<AircraftState | null>(null);

  // Sets initial aircrafts
  useEffect(() => {
    refreshAircrafts();
  }, []);

  // Sets user if a valid token is found in localStorage
  useEffect(() => {
    isUserAuthenticated()
      .then((isAuthenticated) =>
        isAuthenticated
        ? setUser(getUserData()) 
        : setUser(null));
  }, []);

  // Sets user saved aircrafts
  useEffect(() => {
    if (user) {
      refreshSavedAircrafts();
      refreshOwnedAircrafts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, initialAircrafts]);

  
  /* Aircrafts state handlers */

  const refreshAircrafts = async () => {
    await aircraftService.getAllAircrafts()
      .then((response) => setInitialAircrafts([...response.data]))
      .catch(error => {
        setInitialAircrafts([]);
        console.error("ERROR: Retrieving all aircrafts - ", error);
      });
  };

  const refreshSavedAircrafts = async () => {
    user
    ? await aircraftService.getAircraftsSavedByUser()
        .then((response) => setAircraftsSaved([...response.data]))
        .catch(error => {
          setAircraftsSaved([]);
          console.error("ERROR: retrieving saved aicrafts - ", error);
        })
    : setAircraftsSaved([]);
  };

  const refreshOwnedAircrafts = async () => {
    user
    ? await aircraftService.getAircraftsOwnedByUser()
        .then((response) => setAircraftsOwned([...response.data]))
        .catch(error => {
          setAircraftsOwned([]);
          console.error("ERROR: retrieving owned aicrafts - ", error);
        })
    : setAircraftsOwned([]);
  };

  // TODO: refactor to use currentAircrafts
  const handleAircraftsFilter = async (filter: string) => {
    filter
      ? await aircraftService.searchAircraftByModel(filter) // TODO: Take from initialAircrafts
          .then((response) => setInitialAircrafts([...response.data])) // TODO: Set in currentAircrafts
          .catch(error => console.error("ERROR: filtering aicrafts - ", error))
      : refreshAircrafts(); // TODO: Set initialAircrafts in currentAircrafts
  };

  const handleAircraftCreate = async (newAircraft: AircraftWithoutIDs) => {
    await aircraftService.createAircraft(newAircraft)
      .then((response) => setInitialAircrafts(initialAircrafts.concat(response)))
      .catch(error => console.error("ERROR: creating aircraft - ", error));
  };

  const handleAircraftEdit = async (aircraftId: string, editedAircraft: AircraftWithSocials) => {
    await aircraftService.editAircraft(aircraftId, editedAircraft)
      .then(_ => setInitialAircrafts(initialAircrafts.map(aircraft => 
        aircraft.id !== aircraftId ? aircraft : editedAircraft
      ))).catch(error => console.error("ERROR: editing aircraft - ", error));
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
      }).catch(error => console.error("ERROR: retrieving aircraft - ", error));
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
          )).catch(error => console.error(`Fetching aircraft ${aircraftId}: `, error));
      }).catch(error => console.error("ERROR: retrieving aircraft - ", error));
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
        console.error(`ERROR: deleting aircraft ${aircraftId}: `, error)
      );
  };

  const handleAircraftCloning = async (aircraft: CloneAircraft) => {
    await aircraftService.cloneAircraft(aircraft)
      .then(async (response) => {
        await refreshAircrafts()
          .then(_ => history.push(`/aircrafts/details/${response.data.id}`));
      }).catch(error => console.error("ERROR: cloning aircraft: ", error));
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
                aircrafts={initialAircrafts}
                selectedAircraft={aircraftSelected}
                handleAircraftSelection={handleAircraftSelection}
                handleAircraftsFiltering={handleAircraftsFilter}
                handleAircraftState={setAircraftSelected}
              />
            </Route>

            <Route exact path="/aircrafts">
              <Aircrafts
                user={user}
                aircrafts={initialAircrafts}
                aircraftsSaved={aircraftsSaved}
                aircraftsOwned={aircraftsOwned}
                handleAircraftsFilter={handleAircraftsFilter} 
                handleAircraftSelection={handleAircraftSelection}
                handleAircraftSave={handleAircraftSave}
                handleAircraftUnsave={handleAircraftUnsave}
                handleAircraftDelete={handleAircraftDelete}
              />
            </Route>

            <Route
              exact path="/aircrafts/details/:aircraftId"
            >
              <AircraftDetails
                aircrafts={initialAircrafts}
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
