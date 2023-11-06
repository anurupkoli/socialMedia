import React from "react";
import Topbar from "../../topbar/Topbar";
import Leftbar from "../../leftbar/Leftbar";
import Feed from "../../feed/Feed";
import Rightbar from "../../rightbar/Rightbar";
import "./home.css";

export default function Home() {
  return (
    <>
      <div className="mainContainer">
        <Topbar />
        <div className="container">
          <div className="leftBar">
            <Leftbar />
          </div>
          <div className="feed">
            <Feed isUser = {true} />
          </div>
          <div className="rightBar">
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
}
