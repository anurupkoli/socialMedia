import React from 'react'
import './Conversation.css'
import ConversationFriends from './ConversationFriends'

export default function Conversation() {
  return (
    <>
      <div className="conversationMainContainer">
        <div className="conversationSearch">
          <input type="text" placeholder='Search for your friends'/>
        </div>
        <div className="conversationFriends">
          <ConversationFriends/>
          <ConversationFriends/>
          <ConversationFriends/>
          <ConversationFriends/>
        </div>
      </div>
    </>
  )
}
