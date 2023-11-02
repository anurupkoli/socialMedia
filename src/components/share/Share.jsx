import { React, useEffect, useContext, useState, useRef } from "react";
import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import UserContext from "../../Contexts/User/UserContext";
import PostContext from "../../Contexts/Post/PostContext";
import PF from "../../EnvironmentVariables";

export default function Share() {
  const context1 = useContext(UserContext);
  const context2 = useContext(PostContext);
  let { fetchUser, sUser, fetchUserProfilePic, userProfilePic } = context1;
  let { uploadPost } = context2;

  let [description, setdescription] = useState("");
  let [file, setfile] = useState(null);

  const uploadImageRef = useRef();
  const fireImageInputRef = () => {
    uploadImageRef.current.click();
  };

  const setDescription = (e) => {
    setdescription(e.target.value);
  };

  const setImage = (e) => {
    setfile(e.target.files[0]);
  };

  const sharePost = (e) => {
    e.preventDefault();
    uploadPost(description, file);
  };

  useEffect(() => {
    fetchUser();
    fetchUserProfilePic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="share">
        <div className="shareContainer1">
          <div className="shareTop">
            <div className="shareImg">
              <img src={`${PF}/uploadedProfilePic/${userProfilePic}`} alt="" />
            </div>
            <input
              type="text"
              className="shareText"
              placeholder={`What's on your mind ${sUser.name}?`}
              onChange={setDescription}
            />
          </div>
          <hr />
          <div className="shareBottom" >
            <div className="shareTypes" onClick={fireImageInputRef}>
              <PermMediaIcon htmlColor="green" />
              <span>Photo or Video</span>
              <input
                type="file"
                accept="image/*"
                name="uploadPost"
                multiple={false}
                ref={uploadImageRef}
                onChange={setImage}
                style={{display: "none"}}
              />
            </div>
            <div className="shareTypes">
              <LabelIcon htmlColor="blue" />
              <span>Tag</span>
            </div>
            <div className="shareTypes">
              <LocationOnIcon htmlColor="tomato" />
              <span>Location</span>
            </div>
            <div className="shareTypes">
              <EmojiEmotionsIcon htmlColor="goldenrod" />
              <span>Feelings</span>
            </div>
            <button className="shareBtn" onClick={sharePost}>
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
