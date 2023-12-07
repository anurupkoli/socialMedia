import React from "react";
import "./Messages.css";

export default function Messages(props) {
  const {isUser} = props;
  return (
    <>
      <div className={isUser?"messagesMainContainer user": "messagesMainContainer"}>
        <div className="messagesProfileImg">
          <img src="/images/shivaray2.jpg" alt="" />
        </div>
        <div className="messagesContainer">
          <p className="messageText">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit enim voluptatibus dolore neque at dolor fugit! Possimus blanditiis reiciendis repellendus?
          </p>
          <p className="timeAgo">10hr ago</p>
        </div>
      </div>
    </>
  );
}
