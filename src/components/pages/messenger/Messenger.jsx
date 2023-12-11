import React, { useContext, useEffect, useState, useRef } from "react";
import "./Messenger.css";
import Topbar from "../../topbar/Topbar";
import Conversation from "./conversation/Conversation";
import Messages from "./messages/Messages";
import MessageOnlineFriends from "./messageOnlineFriends/MessageOnlineFriends";
import UserContext from "../../../Contexts/User/UserContext";
import {io} from "socket.io-client";

export default function Messanger() {
  const context = useContext(UserContext)
  const {fetchFriendDetails, fetchUser, fetchUserProfilePic, sUser} = context;
  const [mConversation, setMConversation] = useState(null)
  const socket = useRef();

  
  useEffect(() => {
      const fn = async()=>{
        await fetchUser();
        await fetchFriendDetails();
        await fetchUserProfilePic();
      }
      fn()
      // eslint-disable-next-line
  },[])

  useEffect(()=>{
    socket.current = io("ws://localhost:8001")
  },[])

  useEffect(()=>{
    socket.current.emit("setUser", sUser._id)
    socket.current.on("getUsers", users=>{
     console.log(users)
    })
   },[sUser])
  
  return (
    <>
      <div className="messengerTopBar">
        <Topbar />
      </div>
      <div className="messengerMainContainer">
        <div className="messengerContainer">
          <div className="messengerConversation">
            <div className="conversationWrapper">
              <Conversation setMConversation={setMConversation} />
            </div>
          </div>
          <div className="messengerMessages">
            <div className="messagesWrapper">
              <Messages mConversation={mConversation}/>
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
