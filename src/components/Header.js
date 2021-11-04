import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Register from "./Register/Register";

function Header({ state, dispatch }) {
  const history = useHistory("");

  const [showRegister, setShowRegister] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
        </div>

        <div
          className="header__profile-avatar-container"
          onMouseEnter={() => {
            setShowDropdown(true);
          }}
          onMouseLeave={() => {
            setShowDropdown(false);
          }}
        >
          <img
            src="https://yt3.ggpht.com/ytc/AKedOLSydG7HMhw3XvSQgOHZsd7wlbi5Z6LQWudhrA3L=s88-c-k-c0x00ffffff-no-rj"
            alt="Profile avatar"
            className="header__profile-avatar"
          />

          {showDropdown && (
            <div className="header__dropdown ">
              {history.location.pathname !== "/profile" && (
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <div className="header__dropdown-item">
                    <p>Profile</p>
                  </div>
                </Link>
              )}

              <hr />

              <div className="header__dropdown-item">
                <p>Log Out</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showRegister && !state.isLoggedIn && (
        <Register dispatch={dispatch} isSignUp={isSignUp} />
      )}
    </div>
  );
}

export default Header;
