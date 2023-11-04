import { React, useContext, useState, useRef, useEffect } from "react";
import Topbar from "../../topbar/Topbar";
import Leftbar from "../../leftbar/Leftbar";
import Feed from "../../feed/Feed";
import "./profile.css";
import "../home/home.css";
import "../../topbar/topbar.css";
import ProfileComponent from "./ProfileComponent";
import ProfileRightBar from "./ProfileRightBar";
import UserContext from "../../../Contexts/User/UserContext";

export default function Profile() {
  const context = useContext(UserContext);
  const {
    sUser,
    userProfilePic,
    userBackgroundPic,
    friendDetails,
    fetchFriendDetails,
    fetchUserBackgroundPic,
    fetchUserProfilePic,
  } = context;

  const [isUser, setisUser] = useState(true);
  const user = {
    id: sUser._id,
    name: sUser.name,
    description: sUser.description,
    backgroundPic: userBackgroundPic,
    profilePic: userProfilePic,
    DOB: sUser.DOB,
    currentlyLiving: sUser.currentlyLiving,
    relationshipStatus: sUser.relationshipStatus
  }
  const [profileDetails, setProfileDetails] = useState(user);

  const setFriend = useRef(null);
  useEffect(() => {
    fetchUserBackgroundPic();
    fetchUserProfilePic();
    fetchFriendDetails();
    // eslint-disable-next-line
  }, [profileDetails]);

  return (
    <>
      <div className="mainContainer">
        <Topbar />
        <div className="profileContainer">
          <div className="leftBar">
            <Leftbar />
          </div>
          <div className="profileRightBar">
            <div className="profileRightTop">
              <ProfileComponent profileDetails={profileDetails} sUser={sUser}/>
            </div>
            <div className="profileRightBottom">
              <div className="feed">
                <Feed />
              </div>
              <div className="rightBar">
                <ProfileRightBar  profileDetails={profileDetails} friendDetails={friendDetails}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
