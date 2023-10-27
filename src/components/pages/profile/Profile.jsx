import React from "react";
import Topbar from "../../topbar/Topbar";
import Leftbar from "../../leftbar/Leftbar";
import Feed from "../../feed/Feed";
import Rightbar from "../../rightbar/Rightbar";
import "./profile.css";
import "../home/home.css";
import "../../topbar/topbar.css";
import ProfileComponent from "./ProfileComponent";
export default function Profile() {
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
              <ProfileComponent />
            </div>
            <div className="profileRightBottom">
              <div className="feed">
                <Feed />
              </div>
              <div className="rightBar">
                <Rightbar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
