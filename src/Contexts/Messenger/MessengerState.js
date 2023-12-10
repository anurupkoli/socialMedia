import { useState } from "react";
import MessengerContext from "./MessengerContext";
const MessengerState = (props) => {
  const host = "http://localhost:8000/api/conversations";
  const [conversations, setConversations] = useState(null)

  const createConversation = async (friendId) => {
    const resp = await fetch(`${host}/createConversation`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        friendId: friendId,
      }),
    });

    const json = await resp.json();
    console.log(json);
  };

  const getConversations = async () => {
    const resp = await fetch(`${host}/getConversations`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await resp.json();
    setConversations(json);
  };

  const sendMessage = async(conversationId, text)=>{
    const resp = await fetch(`${host}/sendMessage`, {
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
    console.log(json)
  }

  const getMessages = async(conversationId)=>{
    const resp = await fetch(`${host}/getMessages`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify({
            conversationId: conversationId
        })
    })
    const json = await resp.json();
    console.log(json)
  }

  return (
    <MessengerContext.Provider value={{ createConversation, getConversations, conversations, sendMessage, getMessages }}>
      {props.children}
    </MessengerContext.Provider>
  );
};

export default MessengerState;
