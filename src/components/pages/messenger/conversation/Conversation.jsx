import React, { useContext, useEffect } from 'react'
import './Conversation.css'
import ConversationFriends from './ConversationFriends'
import MessengerContext from '../../../../Contexts/Messenger/MessengerContext'
// import UserContext from '../../../../Contexts/User/UserContext';


export default function Conversation() {
  const context = useContext(MessengerContext);
  // const context2 = useContext(UserContext)
  
  const {getConversations, conversations} = context;

  useEffect(() => {
    const fn = async()=>{
      await getConversations();
    }
    fn();
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      <div className="conversationMainContainer">
        <div className="conversationSearch">
          <input type="text" placeholder='Search for your friends'/>
        </div>
        <div className="conversationFriends">
          {conversations?.map(conversation => {
            return <ConversationFriends key={conversation._id}  conversation={conversation}/>
          })}
        </div>
      </div>
    </>
  )
}
