import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import RegisterPage from "./Register/RegisterPage";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ACTIONS = {
  LOG_IN: "log-in",
  LOG_OUT: "log-out",
  LOADING: "loading",
};

export { ACTIONS };

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOG_IN:
      return { isLoggedIn: true };
    case ACTIONS.LOG_OUT:
      return { isLoggedIn: false };
    case ACTIONS.LOADING:
      return { isLoggedIn: null };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { isLoggedIn: null });

  useEffect(() => {
    fetch("/api/authenticate")
      .then((response) => response.json())
      .then((data) => {
        if (data.session_validation) {
          dispatch({ type: ACTIONS.LOG_IN });
        } else {
          dispatch({ type: ACTIONS.LOG_OUT });
        }
      });
  }, []);

  // const checkIsLoggedIn = (isLoggedIn) => {
  //   if (isLoggedIn === null) {
  //     return <h1>LOADING</h1>;
  //   } else if (isLoggedIn) {
  //     return <HomePage />;
  //   } else {
  //     return <RegisterPage dispatch={dispatch} />;
  //   }
  // };

  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            {/* {checkIsLoggedIn(state.isLoggedIn)} */}
            <HomePage />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
