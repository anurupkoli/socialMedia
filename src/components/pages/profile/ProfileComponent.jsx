import React from "react";
import "./profile.css";

export default function ProfileComponent() {
  return (
    <>
      <div className="profileCover">
        <div className="profileBackImg"><img src="/images/shivaray2.jpg" alt="" /></div>
        <div className="profileFrontImg"><img src="/images/shivaray2.jpg" alt="" /></div>
      </div>
        <div className="userDescription">
          <h4>Anurup Koli</h4>
          <span>Hello Friends</span>
        </div>
    </>
  );
}
