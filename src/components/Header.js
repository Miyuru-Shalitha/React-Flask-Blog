import React, { useState, useEffect } from "react";
import Register from "./Register/Register";

function Header({ state, dispatch }) {
  const [showRegister, setShowRegister] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="header">
      <div className="header__text-container">
        <h1 className="heading-primary u-clr-white">React-Flask Blog</h1>
      </div>

      <div className="header__right">
        <div className="header__buttons-container">
          {!showRegister && !state.isLoggedIn && (
            <>
              <button
                className="btn btn--white"
                onClick={() => {
                  setShowRegister(true);
                  setIsSignUp(false);
                }}
              >
                Log In
              </button>
              <button
                className="btn btn--outline-white"
                onClick={() => {
                  setShowRegister(true);
                  setIsSignUp(true);
                }}
              >
                Sign Up
              </button>
            </>
          )}

          <button className="btn btn--white">+ Create new post</button>
        </div>

        <div className="header__profile-avatar-container">
          <img
            src="https://yt3.ggpht.com/ytc/AKedOLSydG7HMhw3XvSQgOHZsd7wlbi5Z6LQWudhrA3L=s88-c-k-c0x00ffffff-no-rj"
            alt="Profile avatar"
            className="header__profile-avatar"
          />
        </div>
      </div>

      {showRegister && !state.isLoggedIn && (
        <Register dispatch={dispatch} isSignUp={isSignUp} />
      )}
    </div>
  );
}

export default Header;
