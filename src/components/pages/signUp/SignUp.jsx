import React from "react";
import "./signUp.css";
import { NavLink } from "react-router-dom";

export default function SignUp() {
  const handleSignUpSubmit = async () => {};
  return (
    <div className="mainSignUpContainer">
      <div className="leftSignUpPage">
        <h1>SocialMedia</h1>
        <h3>Connect with everybody around the world with SocialMedia.</h3>
      </div>
      <div className="rightSignUpPage">
        <form onSubmit={handleSignUpSubmit}>
          <input
            type="text"
            placeholder="UserName"
            required
            name="name"
            id="name"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            minLength={6}
            name="password"
            id="password"
            required
          />
          <button id="signUpSignUpBtn" type="submit">
            Create a new Account
          </button>
        </form>
        <NavLink id="signUpLoginBtn" to={"/signUp"}>
          Login
        </NavLink>
      </div>
    </div>
  );
}
