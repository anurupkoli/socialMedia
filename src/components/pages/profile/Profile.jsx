import { React, useContext, useState, useEffect } from "react";
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

  const user = {
    id: sUser._id,
    name: sUser.name,
    description: sUser.description,
    backgroundPic:userBackgroundPic,
    profilePic: userProfilePic,
    DOB: sUser.DOB,
    currentlyLiving: sUser.currentlyLiving,
    relationshipStatus: sUser.relationshipStatus,
  };

  const [profileDetails, setProfileDetails] = useState(user);

  useEffect(() => {
    fetchUserBackgroundPic();
    fetchUserProfilePic();
    fetchFriendDetails();
    // eslint-disable-next-line
  }, [profileDetails]);

  const setFriendProfileDetails = (friend) => {
    setProfileDetails({
      id: friend.id,
      name: friend.name,
      description: friend.description,
      backgroundPic: friend.backgroundImgPath,
      profilePic: friend.profilePicPath,
      DOB: friend.DOB,
      currentlyLiving: friend.currentlyLiving,
      relationshipStatus: friend.relationshipStatus,
    });
  };

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
              <ProfileComponent profileDetails={profileDetails} />
            </div>
            <div className="profileRightBottom">
              <div className="feed">
                <Feed />
              </div>
              <div className="rightBar">
                <ProfileRightBar
                  profileDetails={profileDetails}
                  friendDetails={friendDetails}
                  setFriendProfileDetails = {setFriendProfileDetails}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
