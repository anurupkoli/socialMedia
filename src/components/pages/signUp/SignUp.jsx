import { React, useState } from "react";
import "./signUp.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignUp() {
  const history = useNavigate();
  const host = "http://localhost:8000";

  const [userCredentials, setuserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
  });

  const [cPassword, setcPassword] = useState({ cpassword: null });

  const handleInputChange = (e) => {
    setuserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleCPasswordChange = (e) => {
    setcPassword({ ...cPassword, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (cPassword.cpassword !== userCredentials.password) {
      alert("Passwords do not match");
    } else {
      const resp = await fetch(`${host}/api/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: userCredentials.name,
          email: userCredentials.email,
          password: userCredentials.password,
          mobileNo: userCredentials.mobileNo,
        }),
      });
      const json = await resp.json();
      if (json.authToken) {
        localStorage.setItem("auth-token", json.authToken);
        history("/");
      } else {
        alert(json.error);
      }
    }
  };
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
            name="name"
            id="name"
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            placeholder="Mobile No"
            name="mobileNo"
            id="mobileNo"
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            minLength={6}
            name="password"
            id="password"
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            minLength={6}
            name="cpassword"
            id="cpassword"
            onChange={handleCPasswordChange}
            required
          />
          <button id="signUpSignUpBtn" type="submit">
            Create a new Account
          </button>
        </form>
        <NavLink id="signUpLoginBtn" to={"/login"}>
          Login
        </NavLink>
      </div>
    </div>
  );
}
