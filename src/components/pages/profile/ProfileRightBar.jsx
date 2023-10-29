import React from "react";

export default function ProfileRightBar() {
  return (
    <>
      <div className="ProfileRightBar">
        <div className="profileRightBarTop">
          <h3>Name: Anurup Koli</h3>
          <h3>DOB: 3/12/2002</h3>
          <h3>Currently Living in: Bangalore </h3>
          <h3>Relationship Status: Single</h3>
        </div>
            <h1>Your Friends</h1>
        <div className="profileRightBarBottom">
            <div className="profileBarFriendsProfile">
                <img src="/images/shivaray2.jpg" alt="" />
                <h4>Naveed</h4>
            </div>
            <div className="profileBarFriendsProfile">
                <img src="/images/shivaray2.jpg" alt="" />
                <h4>Naveed</h4>
            </div>
            <div className="profileBarFriendsProfile">
                <img src="/images/shivaray2.jpg" alt="" />
                <h4>Naveed</h4>
            </div>
            <div className="profileBarFriendsProfile">
                <img src="/images/shivaray2.jpg" alt="" />
                <h4>Naveed</h4>
            </div>
            <div className="profileBarFriendsProfile">
                <img src="/images/shivaray2.jpg" alt="" />
                <h4>Naveed</h4>
            </div>
        </div>
      </div>
    </>
  );
}
