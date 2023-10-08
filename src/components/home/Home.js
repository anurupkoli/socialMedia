import React from "react";
import Topbar from "../topbar/Topbar";
import Leftbar from "../leftbar/Leftbar";
import Feed from "../feed/Feed";
import Rightbar from "../rightbar/Rightbar";
import "./home.css";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="container">
        <div id="leftBar">
          <Leftbar />
        </div>
        <div id="feed">
          <Feed />
        </div>
        <div id="rightBar">
          <Rightbar />
        </div>
      </div>
    </>
  );
}
