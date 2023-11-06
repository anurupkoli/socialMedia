import { React, useState } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const history = useNavigate();
  const host = "http://localhost:8000";
  const [userCredentials, setuserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setuserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: userCredentials.email,
        password: userCredentials.password,
      }),
    });
    const json = await resp.json();
    if (json.authToken) {
      localStorage.setItem("auth-token", json.authToken);
      history("/");
    } else {
      alert(json.error);
    }
  };
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
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            minLength={6}
            name="password"
            id="password"
            required
            onChange={handleInputChange}
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
