import React from "react";
import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export default function Share() {
  return (
    <>
      <div className="share">
        <div className="shareContainer1">
          <div className="shareTop">
            <div className="shareImg"><img src="/images/shivaray2.jpg" alt="" /></div>
            <input
              type="text"
              className="shareText"
              placeholder="What's on your mind Anurup?"
            />
          </div>
          <hr />
          <div className="shareBottom">
            <div className="shareTypes">
              <PermMediaIcon htmlColor="green" />
              <span>Photo or Video</span>
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
            <button className="shareBtn">Share</button>
          </div>
        </div>
      </div>
    </>
  );
}
