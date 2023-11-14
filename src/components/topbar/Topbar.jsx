import React, { useState, useContext, useEffect } from "react";
import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import UserContext from "../../Contexts/User/UserContext";
import PF from "../../EnvironmentVariables";

export default function Topbar() {
  const context = useContext(UserContext)
  let {userProfilePic} = context;
  const [route, setRoute] = useState('/profile');
  const toggleRoute = ()=>{
    if(route === '/profile'){
      setRoute('/')
      return;
    }
    if(route==='/'){
      setRoute('/profile')
      return;
    }
  }
  const [profilePicPath, setprofilePicPath] = useState("/images/socialmediaprofile.jpg");

  useEffect(() => {
    if(userProfilePic !== null){
      setprofilePicPath(`${PF}${userProfilePic}`)
    }
  }, [userProfilePic]);

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
      <NavLink to={`${route}`} onClick={toggleRoute}>
        <div className="userProfile">
          <img src={profilePicPath} alt="" />
        </div>
      </NavLink>
    </div>
  );
}
