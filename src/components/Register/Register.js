import React, { useEffect, useState } from "react";
import { ACTIONS } from "../App";

function Register({ dispatch, isSignUp }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const [userSignUpData, setUserSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [userLogInData, setUserLogInData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setShowSignUp(isSignUp);
  }, []);

  ////////////////////// SIGN UP //////////////////////
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(userSignUpData);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userSignUpData),
    };

    fetch("/api/create-user", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          dispatch({ type: ACTIONS.LOG_IN });
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const handleUserSignUpData = (e) => {
    const { name, value } = e.target;

    setUserSignUpData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  ////////////////////// LOG IN //////////////////////
  const handleLogIn = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userLogInData),
    };

    fetch("/api/log-in", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: ACTIONS.LOG_IN });
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const handleUserLogInData = (e) => {
    const { name, value } = e.target;

    setUserLogInData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <div className="register">
      {showSignUp ? (
        <form className="register__form" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleUserSignUpData}
            value={userSignUpData.username}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleUserSignUpData}
            value={userSignUpData.email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleUserSignUpData}
            value={userSignUpData.password}
            required
          />
          <button type="submit" className="btn btn--primary">
            Sign Up
          </button>
          <button
            type="button"
            className="btn btn--outline-primary"
            onClick={() => {
              setShowSignUp(false);
            }}
          >
            Already Have an Account
          </button>
        </form>
      ) : (
        <form className="register__form" onSubmit={handleLogIn}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleUserLogInData}
            value={userLogInData.email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleUserLogInData}
            value={userLogInData.password}
            required
          />
          <button type="submit" className="btn btn--primary">
            Log In
          </button>
          <button
            type="button"
            className="btn btn--outline-primary"
            onClick={() => {
              setShowSignUp(true);
            }}
          >
            Create Account
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;
