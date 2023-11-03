import React from "react";
import UserContext from "../../../Contexts/User/UserContext";
import { useContext } from "react";

export default function ProfileRightBar() {
  const context = useContext(UserContext)
  let {sUser} = context;
  return (
    <>
      <div className="ProfileRightBar">
        <div className="profileRightBarTop">
          <h3>{`Name: ${sUser.name}`}</h3>
          <h3>{`DOB: ${sUser.DOB===null?'N/A': sUser.DOB}`}</h3>
          <h3>{`Currently Living in: ${sUser.currentlyLiving}`}</h3>
          <h3>{`Relationship Status: ${sUser.relationshipStatus}`}</h3>
        </div>
            <h1>Your Friends</h1>
        <div className="profileRightBarBottom">
            <div className="profileBarFriendsProfile">
                <img src="/images/shivaray2.jpg" alt="" />
                <h4>Naveed</h4>
            </div>
        </div>
      </div>
    </>
  );
}
