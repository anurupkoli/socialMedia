import React from "react";
import "./profile.css";

export default function ProfileComponent() {
  return (
    <>
      <div className="profileCover">
        <div className="profileBackImg"></div>
        <div className="profileFrontImg"></div>
      </div>
        <div className="userDescription">
          <h4>Anurup Koli</h4>
          <span>Hello Friends</span>
        </div>
    </>
  );
}
