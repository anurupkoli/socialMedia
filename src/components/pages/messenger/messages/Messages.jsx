import React, { useContext, useEffect, useState, useRef } from "react";
import "./Messages.css";
import Message from "./Message";
import UserContext from "../../../../Contexts/User/UserContext";
import MessengerContext from "../../../../Contexts/Messenger/MessengerContext";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";

export default function Messages(props) {
  const { mConversation, messageBottomDisplay, setOnlineUsers } = props;

  const context1 = useContext(UserContext);
  const { sUser } = context1;

  const context2 = useContext(MessengerContext);
  const { getMessages, sendMessage, conversations } = context2;

  let [messages, setMessages] = useState([]);
  let [newMessage, setNewMessage] = useState("");
  let [recievedMessage, setRecievedMessage] = useState(null);
  const socket = useRef();

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessageClick = async (e) => {
    e.preventDefault();
    const conversationMembers = conversations.find(
      (conversation) => conversation._id === mConversation
    );
    const friendId = conversationMembers.users?.find(
      (user) => user !== sUser._id
    );
    const message = {
      userId: sUser._id,
      friendId,
      text: newMessage,
    };
    socket.current.emit("sendMessage", message);

    try {
      const resp = await sendMessage(mConversation, newMessage);
      setMessages([...messages, resp]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8001");
    socket.current?.on("getMessage", (message) => {
      setRecievedMessage({
        _id: Date.now(),
        sender: message.userId,
        text: message.text,
        createdAt: new Date(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("setUser", sUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    // eslint-disable-next-line
  }, [sUser]);

  useEffect(() => {
    const fn = async () => {
      let resp = await getMessages(mConversation);
      setMessages(resp);
    };
    fn();
    // eslint-disable-next-line
  }, [mConversation]);

  useEffect(() => {
    const conversationMembers = conversations?.find(
      (conversation) => conversation._id === mConversation
    );
    recievedMessage &&
      conversationMembers.users.includes(recievedMessage.sender) &&
      setMessages((prev) => [...prev, recievedMessage]);
  }, [recievedMessage, conversations, mConversation]);

  const messageContainerRef = useRef(null);
  useEffect(() => {
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <div className="messagesTop" ref={messageContainerRef}>
        <div className="messageTopBar">
          <VideoChatIcon id="videoCall" htmlColor="purple" fontSize="large" />
        </div>
        {messages.length ? (
          messages.map((message) => {
            return (
              <>
                <Message
                  key={message._id}
                  isUser={message.sender === sUser._id}
                  message={message}
                />
              </>
            );
          })
        ) : (
          <div className="startChatting">Start Chatting</div>
        )}
      </div>
      {mConversation ? (
        <div
          className="messagesBottom"
          style={{ display: `${messageBottomDisplay}` }}
        >
          <textarea
            className="messageInputTextArea"
            name="message"
            id="message"
            placeholder="Write something....."
            onChange={handleMessageChange}
            value={newMessage}
          ></textarea>
          <SendIcon
            id="sendMessageBtn"
            htmlColor="purple"
            fontSize="large"
            onClick={handleSendMessageClick}
          />
        </div>
      ) : null}
    </>
  );
}
