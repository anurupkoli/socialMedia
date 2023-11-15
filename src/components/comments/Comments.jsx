import { React, useState, useEffect } from "react";
import "./comments.css";
import PF from "../../EnvironmentVariables";

export default function Comments(props) {
  let { postComment } = props;
  const [profilePic, setprofilePic] = useState("");

  const formatTimeAgo = (timeStamp) => {
    const currentTime = new Date();
    const postTime = new Date(timeStamp);
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
  };

  useEffect(() => {
    if (postComment.profilePic === "uploadedProfilePic/undefined") {
      setprofilePic("./images/socialmediaprofile.jpg");
    } else {
      setprofilePic(PF + "/" + postComment.profilePic);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="commentContainer">
      <div className="commentSecProfDetails">
        <div className="commentSecProfilePic">
          <img src={`${profilePic}`} alt="" />
        </div>
        <h4>{postComment.name}</h4>
        <span>says</span>
        <span id="commentTimeStamp">{formatTimeAgo(postComment.timeStamp)}</span>
      </div>
      <div className="commentDiv">{postComment.comment}</div>
    </div>
  );
}
