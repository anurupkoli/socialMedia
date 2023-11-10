import "./profile.css";
import { React, useContext, useState, useEffect } from "react";
import PF from "../../../EnvironmentVariables";
import UserContext from "../../../Contexts/User/UserContext";
import EditIcon from "@mui/icons-material/Edit";

export default function ProfileComponent(props) {
  let { profileDetails, isUser } = props;
  const context = useContext(UserContext);
  const { sUser, userProfilePic, userBackgroundPic } = context;
  const [profilePicPath, setprofilePicPath] = useState(
    "/images/socialmediaprofile.jpg"
  );
  const [backgroundPicPath, setbackgroundPicPath] = useState(
    "/images/socialmediabackground.jpg"
  );

  useEffect(() => {
    if (profileDetails.profilePic !== null || userProfilePic !== null) {
      if (
        profileDetails.profilePic &&
        typeof profileDetails.profilePic === "string" &&
        profileDetails.profilePic.includes("/uploadedProfilePic/undefined")
      ) {
        setprofilePicPath("/images/socialmediaprofile.jpg");
      } else {
        setprofilePicPath(
          `${PF}${
            profileDetails.profilePic
              ? profileDetails.profilePic
              : userProfilePic
          }`
        );
      }
    }

    if (profileDetails.backgroundPic !== null || userBackgroundPic !== null) {
      if (
        profileDetails.backgroundPic &&
        typeof profileDetails.backgroundPic === "string" &&
        profileDetails.backgroundPic.includes(
          "/uploadedBackgroundPic/undefined"
        )
      ) {
        setbackgroundPicPath("/images/socialmediabackground.jpg");
      } else {
        setbackgroundPicPath(
          `${PF}${
            profileDetails.backgroundPic
              ? profileDetails.backgroundPic
              : userBackgroundPic
          }`
        );
      }
    }
  }, [profileDetails, userProfilePic, userBackgroundPic]);

  return (
    <>
      <div className="profileCover">
        <div className="profileBackImg">
          <img src={backgroundPicPath} alt="" />
        </div>
        <div className="profileFrontImg">
          <img src={profilePicPath} alt="" />
        </div>
      </div>
          <span className="editIconDiv">
              <EditIcon fontSize="1rem" />
          </span>
      <div className="userDescription">
        <h4>{`${profileDetails.name ? profileDetails.name : sUser.name}`}</h4>
        <span>{`${
          profileDetails.description
            ? profileDetails.description
            : sUser.description
        }`}</span>
      </div>
    </>
  );
}
