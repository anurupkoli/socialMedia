import React from "react";
import "./Messenger.css";
import Topbar from "../../topbar/Topbar";
import Conversation from "./conversation/Conversation";
import Messages from "./messages/Messages";
import MessageOnlineFriends from "./messageOnlineFriends/MessageOnlineFriends";

export default function Messanger() {
  return (
    <>
      <div className="messengerMainContainer">
        <Topbar />
        <div className="messengerContainer">
          <div className="messengerConversation">
            <div className="conversationWrapper">
              <Conversation />
            </div>
          </div>
          <div className="messengerMessages">
            <div className="messagesWrapper">
              <Messages />
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
