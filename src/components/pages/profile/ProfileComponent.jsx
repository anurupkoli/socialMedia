import React from "react";
import "./profile.css";
import { useState,  useEffect, useContext } from "react";
import PF from "../../../EnvironmentVariables";
import UserContext from "../../../Contexts/User/UserContext";

export default function ProfileComponent(props) {
  const context = useContext(UserContext)
  const {sUser, userProfilePic, userBackgroundPic} = context
  return (
    <>
      <div className="profileCover">
        <div className="profileBackImg">
          <img src={`${PF}/uploadedBackgroundPic/${props.profileDetails.backgroundPic?props.profileDetails.backgroundPic:userBackgroundPic}` || 'images/socialmediabackground.jpg'} alt="" />
        </div>
        <div className="profileFrontImg">
          <img src={`${PF}/uploadedProfilePic/${props.profileDetails.profilePic?props.profileDetails.profilePic:userProfilePic}`} alt="" />
        </div>
      </div>
      <div className="userDescription">
        <h4>{`${props.profileDetails.name? props.profileDetails.name: sUser.name}`}</h4>
        <span>{`${props.profileDetails.description? props.profileDetails.description: sUser.description}`}</span>
      </div>
    </>
  );
}
