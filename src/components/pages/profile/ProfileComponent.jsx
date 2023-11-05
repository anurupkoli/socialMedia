import React, { useEffect } from "react";
import "./profile.css";
import {  useContext } from "react";
import PF from "../../../EnvironmentVariables";
import UserContext from "../../../Contexts/User/UserContext";

export default function  ProfileComponent(props) {
  let {profileDetails} = props
  const context = useContext(UserContext)
  const {sUser, userProfilePic, userBackgroundPic, friendDetails, fetchFriendDetails} = context
  console.log(profileDetails)
  return (
    <>
      <div className="profileCover">
        <div className="profileBackImg">
          <img src={`${PF}${profileDetails.backgroundPic?profileDetails.backgroundPic:'/uploadedBackgroundPic/'+userBackgroundPic}` || '/images/socialmediabackground.jpg'  } alt="" />
        </div>
        <div className="profileFrontImg">
          <img src={`${PF}${profileDetails.profilePic?profileDetails.profilePic:'/uploadedProfilePic/'+userProfilePic}` } alt="" />
        </div>
      </div>
      <div className="userDescription">
        <h4>{`${profileDetails.name? profileDetails.name: sUser.name}`}</h4>
        <span>{`${profileDetails.description? profileDetails.description: sUser.description}`}</span>
      </div>
    </>
  );
}
