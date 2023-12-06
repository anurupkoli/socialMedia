import "./profile.css";
import { React, useContext, useState, useEffect, useRef } from "react";
import PF from "../../../EnvironmentVariables";
import UserContext from "../../../Contexts/User/UserContext";
import EditIcon from "@mui/icons-material/Edit";

export default function ProfileComponent(props) {
  let { profileDetails, isUser, setRender } = props;
  const context = useContext(UserContext);
  const {
    sUser,
    userProfilePic,
    userBackgroundPic,
    uploadProfilePic,
    fetchUserProfilePic,
    fetchUserBackgroundPic,
    reRenderPage,
    uploadBackgroundPic,
    unfollowFriend,
  } = context;
  const [profilePicPath, setprofilePicPath] = useState(
    "/images/socialmediaprofile.jpg"
  );
  const [backgroundPicPath, setbackgroundPicPath] = useState(
    "/images/socialmediabackground.jpg"
  );

  const [profileImg, setProfileImg] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(null);

  const uploadProfileImgRef = useRef(null);
  const uploadBackgroundInputImgRef = useRef(null);

  const fireProfileInputRef = () => {
    uploadProfileImgRef.current.click();
  };

  const fireBackgroundInputRef = () => {
    uploadBackgroundInputImgRef.current.click();
  };

  const handleProfileUpload = async() => {
    await uploadProfilePic(profileImg);
    setProfileImg(null);
    setRender((render)=>render+1)
  };

  const handleBackgroundUpload = async() => {
    await uploadBackgroundPic(backgroundImg);
    setBackgroundImg(null);
  };

  const setFile = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const setBackgroundFile = (e) => {
    setBackgroundImg(e.target.files[0]);
  };

  const handleUnfollowBtn = async() => {
      await unfollowFriend(profileDetails.id);
      setRender((render)=>render+1)
  };

  useEffect(() => {
    const fetch = async()=>{
      await fetchUserProfilePic();
      await fetchUserBackgroundPic()
    }
    fetch()

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
    
    // eslint-disable-next-line
  }, [profileDetails, userProfilePic, userBackgroundPic, reRenderPage]);

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

      <div className="userDescription">
        <h4>{`${profileDetails.name ? profileDetails.name : sUser.name}`}</h4>
        <span>{`${
          profileDetails.description
            ? profileDetails.description
            : sUser.description
            ? sUser.description
            : "No description"
        }`}</span>
      </div>
      {!isUser ? (
        <div className="unfollowBtnDiv">
          <button
            id="unfollowBtn"
            onClick={() => {
              handleUnfollowBtn();
            }}
          >
            Unfollow
          </button>
        </div>
      ) : null}

      {isUser ? (
        <span>
          <span
            className="editIconDiv2"
            onClick={() => {
              fireBackgroundInputRef();
            }}
          >
            <EditIcon fontSize="1rem" />
            <input
              type="file"
              accept="image/*"
              name="uploadBackgroundPic"
              multiple={false}
              ref={uploadBackgroundInputImgRef}
              onChange={setBackgroundFile}
              style={{ display: "none" }}
            />
          </span>
          {backgroundImg ? (
            <button
              className="editIconButton2"
              onClick={() => {
                handleBackgroundUpload();
              }}
            >
              Upload
            </button>
          ) : null}
        </span>
      ) : null}

      {isUser ? (
        <span
          className="editIconDiv"
          onClick={() => {
            fireProfileInputRef();
          }}
        >
          <EditIcon fontSize="1rem" />
          <input
            type="file"
            accept="image/*"
            name="uploadImg"
            multiple={false}
            ref={uploadProfileImgRef}
            onChange={setFile}
            style={{ display: "none" }}
          />
        </span>
      ) : (
        ""
      )}
      {profileImg ? (
        <button
          className="editIconButton"
          onClick={() => {
            handleProfileUpload();
          }}
        >
          Upload
        </button>
      ) : (
        ""
      )}
    </>
  );
}
