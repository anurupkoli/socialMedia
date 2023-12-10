import React from 'react'
import './Messages.css'

export default function Message(props) {
    const {isUser, message} = props;

    const timeAgo = (time)=>{
      const currentTime = new Date();
      const postTime = new Date(time);
      const timeDifference = currentTime - postTime;
      const minutesAgo = Math.floor(timeDifference / 60000); // 1 minute = 60000 milliseconds
  
      if (minutesAgo < 1) {
        return "Just now";
      } else if (minutesAgo < 60) {
        return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
      } else {
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) {
          return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
        } else {
          const daysAgo = Math.floor(hoursAgo / 24);
          return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
        }
      }
    }
  return (
    <>
        <div className={isUser?"messagesMainContainer user": "messagesMainContainer"}>
        <div className="messagesProfileImg">
          <img src="/images/shivaray2.jpg" alt="" />
        </div>
        <div className="messagesContainer">
          <p className="messageText">
              {message.text}
          </p>
          <p className="timeAgo">{timeAgo(message.createdAt)}</p>
        </div>
      </div>
    </>
  )
}
