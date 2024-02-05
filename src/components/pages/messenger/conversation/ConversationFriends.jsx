import React, { useContext } from 'react'
import './Conversation.css'
import MessengerContext from '../../../../Contexts/Messenger/MessengerContext';
const {PF} = require('../../../../EnvironmentVariables')

export default function ConversationFriends(props) {
  const {conversations, friend, setMConversation} = props;
  
  const context = useContext(MessengerContext);
  const {createConversation, setConversations}= context;

  const conversation = conversations && conversations.find(conversation => conversation.users?.includes(friend.id))
  let profilePicPath = ''
  let friendName = ''

  if(friend){
     profilePicPath = friend.profilePicPath === '/uploadedProfilePic/undefined'?'images/socialmediaprofile.jpg':PF+friend.profilePicPath
     friendName = friend.name
  }else{
    return;
  }

  const handleConversationClick = async()=>{
    if(!conversation){
      const resp = await createConversation(friend.id)
      console.log(resp)
      setConversations((prev)=>[...prev, resp])

      setMConversation(resp._id)
    }
    else{
      setMConversation(conversation._id)
    }
  }
  
  return (
    <>
        <div className="conversationFriendsMainContainer" onClick={handleConversationClick} >
            <div className="conversationOnlineFriendImage">
                <img src={profilePicPath} alt="" />
                <div className="isOnlineIcon"></div>
            </div>
            <span><b>{friendName}</b></span>
        </div>
    </>
  )
}
