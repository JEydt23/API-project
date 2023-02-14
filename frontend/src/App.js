// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SpotDetail from "./components/SpotDetail";
import CreateSpot from "./components/CreateSpot/CreateSpot";
import EditSpot from "./components/EditSpotForm";
import UserBookings from "./components/UserBookings";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/' exact>
            <AllSpots />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetail />
          </Route>
          <Route exact path='/spots'>
            <CreateSpot />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <EditSpot />
          </Route>
          <Route exact path='/bookings/current'>
            <UserBookings />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
