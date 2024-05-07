import React, { useState, useContext, useEffect } from "react";
import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/User/UserContext";
const {PF} = require("../../EnvironmentVariables")

export default function Topbar() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  let { userProfilePic } = context;
  const [route, setRoute] = useState("/profile");
  const toggleRoute = () => {
    if (route === "/profile") {
      setRoute("/");
      return;
    }
    if (route === "/") {
      setRoute("/profile");
      return;
    }
  };

  const [profilePicPath, setprofilePicPath] = useState(
    "/images/socialmediaprofile.jpg"
  );

  useEffect(() => {
    if (userProfilePic !== null) {
      setprofilePicPath(`${PF}${userProfilePic}`);
    }
  }, [userProfilePic]);

  const handleLogoutClick = () => {
    const confirm = window.confirm("Do you really want to Logout?");
    if (confirm) {
      localStorage.removeItem("auth-token");
      navigate("/login");
      return;
    } else {
      return;
    }
  };

  return (
    <div className="navBar">
      <div className="navbarWrapper">
      <div className="leftNavbar">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span>SocialMedia</span>
        </NavLink>
      </div>
      <div className="navBarLinks">
        <span className="navBarLink">TimeLine</span>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span className="navBarLink"onClick={()=>navigate('/')} >Home</span>
        </NavLink>
      </div>
      <div className="middleNavbar">
        <input placeholder="Search for Friend, Blog, Post, Video" type="text" />
        <SearchIcon style={{ cursor: "pointer" }} />
      </div>
      <div className="rightNavbar">
        <div className="rightNavbarItem" onClick={()=>navigate('/messenger')} >
          <MessageIcon />
          <span>1</span>
        </div>
        <div className="rightNavbarItem">
          <PersonIcon />
          <span>3</span>
        </div>
        <div className="rightNavbarItem" onClick={()=>navigate('/notification')} >
          <NotificationsIcon />
          <span>2</span>
        </div>
        <button onClick={handleLogoutClick} className="logoutBtn">
          LogOut
        </button>
      </div>
      <NavLink to={`${route}`} onClick={toggleRoute}>
        <div className="userProfile">
          <div className="userProfileWrapper">
            <img src={profilePicPath} alt="" />
          </div>
        </div>
      </NavLink>
      </div>
    </div>
  );
}
