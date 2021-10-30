import React, { useState } from "react";
import { ACTIONS } from "../App";

function RegisterPage({ dispatch }) {
  const [userSignUpData, setUserSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [userLogInData, setUserLogInData] = useState({
    email: "",
    password: "",
  });

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
      .then((response) => response.json())
      .then((data) => console.log(data));
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
        console.log(response.status);

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
    <div>
      {/* <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form> */}

      <form onSubmit={handleLogIn}>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default RegisterPage;
