import React from "react";
import "./Messages.css";
import Message from "./Message";

export default function Messages(props) {
  const { isUser } = props;
  return (
    <>
      <div className="messagesTop">
        <Message isUser={isUser} />
      </div>
      <div className="messagesBottom">
        <textarea
          className="messageInputTextArea"
          name="message"
          id="message"
          placeholder="Write something....."
        ></textarea>
        <button className="sendMessageBtn">send</button>
      </div>
    </>
  );
}
