import { React, useEffect, useContext, useState, useRef } from "react";
import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import UserContext from "../../Contexts/User/UserContext";
import PostContext from "../../Contexts/Post/PostContext";
const {PF} = require('../../EnvironmentVariables')

export default function Share(props) {
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

  const sharePost = async(e) => {
    e.preventDefault();
    const resp = await uploadPost(description, file);
    setfile(null);
    setdescription("");
    alert(resp)
  };

  const [profileImgPath, setprofileImgPath] = useState(
    "/images/socialmediaprofile.jpg"
  );

  useEffect(() => {
    fetchUser();
    fetchUserProfilePic();
    if (userProfilePic !== null) {
      setprofileImgPath(`${PF}${userProfilePic}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfilePic]);
  return (
    <>
      <div className="share">
        <div className="shareContainer1">
          <div className="shareTop">
            <div className="shareImg">
              <img src={profileImgPath} alt="" />
            </div>
            <input
              type="text"
              className="shareText"
              placeholder={`What's on your mind ${sUser.name}?`}
              onChange={setDescription}
            />
          </div>
          <hr />
          <div className="shareBottom">
            <div className="shareTypes" onClick={fireImageInputRef}>
              <PermMediaIcon htmlColor="green" />
              <span style={{ marginLeft: "5px" }}>Photo or Video</span>
              <input
                type="file"
                accept="image/*"
                name="uploadPost"
                multiple={false}
                ref={uploadImageRef}
                onChange={setImage}
                style={{ display: "none" }}
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
          <div id="postImg">
            {file?file.type.startsWith("image/") ? (
              <img src={URL.createObjectURL(file)} alt="Selected" />
            ) : (
              <h3>Select Image file</h3>
            ):null}
          </div>
        </div>
      </div>
    </>
  );
}
