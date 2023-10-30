import React from "react";
import "./profile.css";
import UserContext from "../../../Contexts/User/UserContext";
import { useContext, useEffect } from "react";
import PF from "../../../EnvironmentVariables";

export default function ProfileComponent() {
  const context = useContext(UserContext);
  let { sUser, userProfilePic, fetchUserBackgroundPic, userBackgroundPic } = context;
  useEffect(() => {
    fetchUserBackgroundPic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="profileCover">
        <div className="profileBackImg">
          <img src={`${PF}/uploadedBackgroundPic/${userBackgroundPic}` || 'images/socialmediabackground.jpg'} alt="" />
        </div>
        <div className="profileFrontImg">
          <img src={`${PF}/uploadedProfilePic/${userProfilePic}`} alt="" />
        </div>
      </div>
      <div className="userDescription">
        <h4>{`${sUser.name}`}</h4>
        <span>{`${sUser.description}`}</span>
      </div>
    </>
  );
}
