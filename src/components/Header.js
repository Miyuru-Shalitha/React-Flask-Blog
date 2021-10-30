import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="header__text-container">
        <h1 className="heading-primary">React-Flask Blog</h1>
      </div>

      <div className="header__right">
        <div className="header__buttons-container">
          <button className="btn btn--white">Log In</button>
          <button className="btn btn--outline">Sign Up</button>
        </div>

        <div className="header__profile-avatar-container">
          <img
            src="https://yt3.ggpht.com/ytc/AKedOLSydG7HMhw3XvSQgOHZsd7wlbi5Z6LQWudhrA3L=s88-c-k-c0x00ffffff-no-rj"
            alt="Profile avatar"
            className="header__profile-avatar"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
