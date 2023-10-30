import React from "react";
import "./profile.css";
import UserContext from "../../../Contexts/User/UserContext";
import { useContext } from "react";
import PF from "../../../EnvironmentVariables";

export default function ProfileComponent() {
  const context = useContext(UserContext)
  let {sUser, userProfilePic} = context;
  return (
    <>
      <div className="profileCover">
        <div className="profileBackImg"><img src="/images/socialmediabackground.jpg" alt="" /></div>
        <div className="profileFrontImg"><img src={`${PF}/uploadedProfilePic/${userProfilePic}`} alt="" /></div>
      </div>
        <div className="userDescription">
          <h4>{`${sUser.name}`}</h4>
          <span>{`${sUser.description}`}</span>
        </div>
    </>
  );
}
