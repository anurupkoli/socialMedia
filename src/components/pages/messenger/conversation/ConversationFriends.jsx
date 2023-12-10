import React, { useContext } from 'react'
import './Conversation.css'
import UserContext from '../../../../Contexts/User/UserContext'
import PF from '../../../../EnvironmentVariables';

export default function ConversationFriends(props) {
  const {conversation} = props;
  const context = useContext(UserContext)
  const {friendDetails, sUser} = context;
  const friendId = conversation.users && conversation.users.find(id => id!==sUser._id)
  
  const friendDetail = friendId && friendDetails.find(friend => friend.id === friendId)
  let profilePicPath = ''
  let friendName = ''

  if(friendDetail){
     profilePicPath = friendDetail.profilePicPath === '/uploadedProfilePic/undefined'?'images/socialmediaprofile.jpg':PF+friendDetail.profilePicPath
     friendName = friendDetail.name
  }else{
    return;
  }
  
  return (
    <>
        <div className="conversationFriendsMainContainer">
            <div className="conversationOnlineFriendImage">
                <img src={profilePicPath} alt="" />
                <div className="isOnlineIcon"></div>
            </div>
            <span><b>{friendName}</b></span>
        </div>
    </>
  )
}
