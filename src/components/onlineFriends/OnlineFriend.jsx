import React from 'react'
import './onlineFriend.css'
const {PF} = require("../../EnvironmentVariables")

export default function OnlineFriend(props) {
  const {friend} = props

  let profilePicPath = ''
  let friendName = ''

  if(friend){
     profilePicPath = friend.profilePicPath === '/uploadedProfilePic/undefined'?'images/socialmediaprofile.jpg':PF+friend.profilePicPath
     friendName = friend.name
  }else{
    return;
  }
  return (
    <>
    {
      friend &&
      <div className="onlineFriendContainer">
            <div className="onlineFriendImg">
                <img src={profilePicPath} alt="" />
                <div className="isOnlineIcon"></div>
            </div>
            <span><b>{friendName}</b></span>
        </div>
        }
    </>
  )
}
