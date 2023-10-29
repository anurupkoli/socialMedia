import React from "react";
import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="navBar">
      <div className="leftNavbar">
        <NavLink to="/" style={{'textDecoration': 'none'}} >
          <span>SocialMedia</span>
        </NavLink>
      </div>
      <div className="navBarLinks">
        <span className="navBarLink">TimeLine</span>
        <NavLink to="/" style={{'textDecoration': 'none'}}  >
          <span className="navBarLink" >Home</span>
        </NavLink>
      </div>
      <div className="middleNavbar">
        <input placeholder="Search for Friend, Blog, Post, Video" type="text" />
        <SearchIcon style={{'cursor': 'pointer'}} />
      </div>
      <div className="rightNavbar">
        <div className="rightNavbarItem">
          <MessageIcon />
          <span>1</span>
        </div>
        <div className="rightNavbarItem">
          <PersonIcon />
          <span>3</span>
        </div>
        <div className="rightNavbarItem">
          <NotificationsIcon />
          <span>2</span>
        </div>
      </div>
      <NavLink to="/profile">
        <div className="userProfile">
          <img src="/images/shivaray2.jpg" alt="profile" />
        </div>
      </NavLink>
    </div>
  );
}
