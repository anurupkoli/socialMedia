import { useState } from "react";
import MessengerContext from "./MessengerContext";
const {HOST} = require("../../EnvironmentVariables")

const MessengerState = (props) => {
  const host1 = `${HOST}/api/conversations`;
  const host2 = `${HOST}/api/messages`

  const [conversations, setConversations] = useState(null)

  const createConversation = async (friendId) => {
    const resp = await fetch(`${host1}/createConversation`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        friendId: friendId,
      }),
    });

    const json = await resp.json();
    return json;
  };

  const getConversations = async () => {
    const resp = await fetch(`${host1}/getConversations`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await resp.json();
    setConversations(json);
  };

  const sendMessage = async(conversationId, text)=>{
    const resp = await fetch(`${host2}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
            conversationId: conversationId,
            text: text
        })
    })
    const json = await resp.json();
    return json;
  }

  const getMessages = async(conversationId)=>{
    const resp = await fetch(`${host2}/getMessages`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify({
            conversationId: conversationId
        })
    })
    if(!resp.ok){
      console.log(resp)
    }
    const json = await resp.json();
    return json;
  }

  return (
    <MessengerContext.Provider value={{ createConversation, getConversations, conversations,setConversations, sendMessage, getMessages }}>
      {props.children}
    </MessengerContext.Provider>
  );
};

export default MessengerState;
