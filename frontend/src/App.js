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
          <Route path='/spots/:spotId'>
            <SpotDetail />
          </Route>
          <Route path='/spots'>
            <CreateSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
