import React, { useContext, useEffect } from "react";
import "./Messenger.css";
import Topbar from "../../topbar/Topbar";
import Conversation from "./conversation/Conversation";
import Messages from "./messages/Messages";
import MessageOnlineFriends from "./messageOnlineFriends/MessageOnlineFriends";
import UserContext from "../../../Contexts/User/UserContext";

export default function Messanger() {
  const context = useContext(UserContext)
  const {fetchFriendDetails, fetchUser, fetchUserProfilePic} = context;
  useEffect(() => {
      const fn = async()=>{
        await fetchUser();
        await fetchFriendDetails();
        await fetchUserProfilePic();
      }
      fn()
      // eslint-disable-next-line
  },[])
  
  return (
    <>
      <div className="messengerTopBar">
        <Topbar />
      </div>
      <div className="messengerMainContainer">
        <div className="messengerContainer">
          <div className="messengerConversation">
            <div className="conversationWrapper">
              <Conversation />
            </div>
          </div>
          <div className="messengerMessages">
            <div className="messagesWrapper">
              <Messages/>
            </div>
          </div>
          <div className="messengerOnlineFriends">
            <div className="messengerOnlineFriendsWrapper">
              <MessageOnlineFriends />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
