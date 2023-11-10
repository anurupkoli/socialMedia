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
    backgroundPic: userBackgroundPic,
    profilePic: userProfilePic,
    DOB: sUser.DOB,
    currentlyLiving: sUser.currentlyLiving,
    relationshipStatus: sUser.relationshipStatus,
  };
  const [profileDetails, setProfileDetails] = useState(user);
  const [isUser, setisUser] = useState(true);

  useEffect(() => {
    fetchUserBackgroundPic();
    fetchUserProfilePic();
    fetchFriendDetails();
    setProfileDetails({
      id: sUser._id,
      name: sUser.name,
      description: sUser.description,
      backgroundPic: userBackgroundPic,
      profilePic: userProfilePic,
      DOB: sUser.DOB,
      currentlyLiving: sUser.currentlyLiving,
      relationshipStatus: sUser.relationshipStatus,
    });
    // eslint-disable-next-line
  }, [sUser]);

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
    setisUser(false)
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
              <ProfileComponent profileDetails={profileDetails} isUser={isUser} />
            </div>
            <div className="profileRightBottom">
              <div className="feed">
                <Feed isUser={isUser} />
              </div>
              <div className="rightBar">
                <ProfileRightBar
                  profileDetails={profileDetails}
                  friendDetails={friendDetails}
                  setFriendProfileDetails={setFriendProfileDetails}
                  isUser={isUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
