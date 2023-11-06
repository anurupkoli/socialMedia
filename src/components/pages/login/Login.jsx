import React from "react";
import "./login.css";
import { NavLink } from "react-router-dom";

export default function Login() {
  const handleLoginSubmit = async () => {};
  return (
    <div className="mainLoginContainer">
      <div className="leftLoginPage">
        <h1>SocialMedia</h1>
        <h3>Connect with everybody around the world with SocialMedia.</h3>
      </div>
      <div className="rightLoginPage">
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            minLength={6}
            name="password"
            id="password"
            required
          />
          <button id="loginBtn" type="submit">
            Login
          </button>
        </form>
        <p id="resetPassword">Forgot Password?</p>
        <NavLink id="signUpBtn" to={"/signUp"}>
          Create a New Account?
        </NavLink>
      </div>
    </div>
  );
}
