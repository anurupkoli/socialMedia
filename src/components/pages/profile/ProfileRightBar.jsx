import React, { useContext, useEffect } from "react";
import UserContext from "../../../Contexts/User/UserContext";
import PF from "../../../EnvironmentVariables";

export default function ProfileRightBar() {
  const context = useContext(UserContext);
  const { fetchFriendDetails, friendDetails, sUser } = context;

  useEffect(() => {
    fetchFriendDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="ProfileRightBar">
      <div className="profileRightBarTop">
        <h3>{`Name: ${sUser.name}`}</h3>
        <h3>{`DOB: ${sUser.DOB === null ? 'N/A' : sUser.DOB}`}</h3>
        <h3>{`Currently Living in: ${sUser.currentlyLiving}`}</h3>
        <h3>{`Relationship Status: ${sUser.relationshipStatus}`}</h3>
        <button>Update Details</button>
      </div>
      <h1>Your Friends</h1>
      <div className="profileRightBarBottom">
        {friendDetails ? (
          <div className="profileBarFriendsProfile">
            {friendDetails.map((friend) => (
              <div key={friend.id}>
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
