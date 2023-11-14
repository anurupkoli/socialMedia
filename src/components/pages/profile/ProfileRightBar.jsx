import React, { useContext, useState } from "react";
import PF from "../../../EnvironmentVariables";
import UserContext from "../../../Contexts/User/UserContext";

export default function ProfileRightBar(props) {
  let { profileDetails, friendDetails, setFriendProfileDetails, isUser } =
    props;
  const context = useContext(UserContext);
  const { sUser, updateUserDetails } = context;

  const [updateModalDis, setupdateModalDis] = useState("none");
  const [updateDetailsButton, setupdateDetailsButton] = useState('Update Details');

  let [eUserDetails, seteUserDetails] = useState({
    eDescription: "",
    eName: "",
    eDOB: "",
    eLiving: "",
    eRelStatus: "",
  });

  const onEInpChange = (e) => {
    seteUserDetails({...eUserDetails, [e.target.name]: e.target.value });
  };

  const handleInputSubmitClick = (e) => {
    e.preventDefault();
    updateUserDetails(
      eUserDetails.eDescription,
      eUserDetails.eName,
      eUserDetails.eDOB,
      eUserDetails.eLiving,
      eUserDetails.eRelStatus
    );
    setupdateModalDis('none')
    setupdateDetailsButton('Update Details')
  };

  const handleUpdateBtnClick = () => {
    setupdateModalDis(updateModalDis === "none" ? "block" : "none");
    setupdateDetailsButton(updateDetailsButton==='Update Details'?"Cancle": "Update Details")

    seteUserDetails({
      eDescription: sUser.description ? sUser.description : "",
      eName: sUser.name ? sUser.name : "",
      eDOB: sUser.DOB ? new Date(sUser.DOB).toISOString().split('T')[0]: "",
      eLiving: sUser.currentlyLiving ? sUser.currentlyLiving : "",
      eRelStatus: sUser.relationshipStatus ? sUser.relationshipStatus : "",
    });
  };
  return (
    <div className="ProfileRightBar">
      <div className="profileRightBarTop">
        <h3>{`Name: ${
          profileDetails.name ? profileDetails.name : sUser.name
        }`}</h3>
        <h3>{`DOB: ${
          isUser ? (sUser.DOB ? sUser.DOB.split('T')[0] : 'N/A') : (profileDetails.DOB ? profileDetails.DOB.split('T')[0] : 'N/A')
        }`}</h3>
        <h3>{`Currently Living in: ${
          profileDetails.currentlyLiving
            ? profileDetails.currentlyLiving
            : sUser.currentlyLiving
        }`}</h3>
        <h3>{`Relationship Status: ${
          profileDetails.relationshipStatus
            ? profileDetails.relationshipStatus
            : sUser.relationshipStatus
        }`}</h3>
        {isUser ? (
          <button
            className="updateDetailsBtn"
            onClick={() => {
              handleUpdateBtnClick();
            }}
          >
            {updateDetailsButton}
          </button>
        ) : null}
        {isUser ? (
          <div
            className="updateProfileDiv"
            style={{ display: `${updateModalDis}` }}
          >
            <form>
              <div className="updateInputs">
                <label htmlFor="eDescription">Description: </label>
                <input
                  type="text"
                  name="eDescription"
                  id="eDescription"
                  value={eUserDetails.eDescription}
                  onChange={onEInpChange}
                />
              </div>
              <div className="updateInputs">
                <label htmlFor="eName">Name: </label>
                <input
                  type="text"
                  name="eName"
                  id="eName"
                  value={eUserDetails.eName}
                  onChange={onEInpChange}
                />
              </div>
              <div className="updateInputs">
                <label htmlFor="eDOB">DOB: </label>
                <input
                  type="date"
                  name="eDOB"
                  id="eDOB"
                  value={eUserDetails.eDOB}
                  onChange={onEInpChange}
                />
              </div>
              <div className="updateInputs">
                <label htmlFor="eLiving">Currently Living in: </label>
                <input
                  type="text"
                  name="eLiving"
                  id="eLiving"
                  value={eUserDetails.eLiving}
                  onChange={onEInpChange}
                />
              </div>
              <div className="updateInputs">
                <label htmlFor="eRelStatus">Relationship Status: </label>
                <input
                  type="text"
                  name="eRelStatus"
                  id="eRelStatus"
                  value={eUserDetails.eRelStatus}
                  onChange={onEInpChange}
                />
              </div>
              <button className="updateDetailsBtn" style={{"marginTop": "20px"}} type="submit" onClick={handleInputSubmitClick}>
                Submit
              </button>
            </form>
          </div>
        ) : null}
      </div>
      <h1>Your Friends</h1>
      <div className="profileRightBarBottom">
        {friendDetails ? (
          <div className="profileBarfriendCard">
            {friendDetails.map((friend) => (
              <div
                className="profileBarFriendsProfile"
                key={friend.id}
                onClick={() => setFriendProfileDetails(friend)}
              >
                <img
                  src={
                    friend.profilePicPath === "/uploadedProfilePic/undefined"
                      ? "images/socialmediaprofile.jpg"
                      : `${PF}${friend.profilePicPath}`
                  }
                  alt=""
                />
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
