import React from "react";
import "./Messages.css";
import Message from "./Message";

export default function Messages(props) {
  const {isUser} = props;
  return (
    <>
      <Message isUser={isUser} />
    </>
  );
}
