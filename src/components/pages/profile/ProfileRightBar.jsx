import React, { useContext, useEffect } from "react";
import PF from "../../../EnvironmentVariables";
import UserContext from "../../../Contexts/User/UserContext";

export default function ProfileRightBar(props) {
  let profileDetails = props.profileDetails;
  let friendDetails = props.friendDetails;
  const context = useContext(UserContext)
  const {sUser} = context
  return (
    <div className="ProfileRightBar">
      <div className="profileRightBarTop">
        <h3>{`Name: ${profileDetails.name?profileDetails.name:sUser.name }`}</h3>
        <h3>{`DOB: ${profileDetails.DOB === null ? 'N/A' : profileDetails.DOB || sUser.DOB?sUser.DOB: 'N/A'}`}</h3>
        <h3>{`Currently Living in: ${profileDetails.currentlyLiving? profileDetails.currentlyLiving: sUser.currentlyLiving}`}</h3>
        <h3>{`Relationship Status: ${profileDetails.relationshipStatus?profileDetails.relationshipStatus: sUser.relationshipStatus}`}</h3>
        <button>Update Details</button>
      </div>
      <h1>Your Friends</h1>
      <div className="profileRightBarBottom">
        {friendDetails ? (
          <div className="profileBarFriendsProfile">
            {friendDetails.map((friend) => (
              <div key={friend.id} className="profileBarFriendsProfileDiv">
                <img src={`${PF}${friend.profilePicPath}`} alt="" />
                <h5>{friend.name}</h5>
              </div>
            ))}
          </div>
        ) : (
          "No Friends Yet"
        )}
      </div>
    </div>
  );
}
