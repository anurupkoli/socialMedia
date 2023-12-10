import React, { useContext, useEffect, useState } from "react";
import "./Messages.css";
import Message from "./Message";
import UserContext from "../../../../Contexts/User/UserContext";
import MessengerContext from "../../../../Contexts/Messenger/MessengerContext";

export default function Messages(props) {
  const { mConversation } = props;

  const context1 = useContext(UserContext);
  const {sUser} = context1;

  const context2 = useContext(MessengerContext);
  const {getMessages, sendMessage} = context2;
  
  let  [messages, setMessages] = useState([])
  let [newMessage, setNewMessage] = useState('')

  const handleMessageChange = (e)=>{
    setNewMessage(e.target.value)
  }

  const handleSendMessageClick = async(e)=>{
    e.preventDefault()
    const resp = await sendMessage(mConversation, newMessage)
    setMessages([...messages, resp])
    setNewMessage('')
  }

  useEffect(() => {
    const fn = async()=>{
      let resp = await getMessages(mConversation);
      setMessages(resp)
    }
    fn()
    // eslint-disable-next-line
  }, [mConversation])
  
  return (
    <>
      <div className="messagesTop">
        {
          messages?messages.map(message=>{
            return <Message key={message._id} isUser={message.sender===sUser._id} message={message} />
          }):"Start Chatting"
        }
      </div>
      <div className="messagesBottom">
        <textarea
          className="messageInputTextArea"
          name="message"
          id="message"
          placeholder="Write something....."
          onChange={handleMessageChange}
          value={newMessage}
        ></textarea>
        <button className="sendMessageBtn" onClick={handleSendMessageClick} >send</button>
      </div>
    </>
  );
}
