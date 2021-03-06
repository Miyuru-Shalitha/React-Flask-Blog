import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreatePostPage from "./CreatePost/CreatePostPage";
import PostPage from "./Post/PostPage";
import ProfilePage from "./Profile/ProfilePage";

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
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("/api/authenticate")
      .then((response) => response.json())
      .then((data) => {
        if (data.session_validation) {
          dispatch({ type: ACTIONS.LOG_IN });
          setCurrentUser(data.current_user);
        } else {
          dispatch({ type: ACTIONS.LOG_OUT });
          setCurrentUser(null);
        }
      });
  }, [state.isLoggedIn]);

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
      <Router>
        <Header state={state} dispatch={dispatch} />
        <Switch>
          <Route exact path="/">
            {/* {checkIsLoggedIn(state.isLoggedIn)} */}
            <HomePage state={state} />
          </Route>

          <Route path="/create-post" component={CreatePostPage} />

          <Route path="/edit-post/:postId" component={CreatePostPage} />

          <Route path="/post/:postId">
            <PostPage currentUser={currentUser} />
          </Route>

          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
