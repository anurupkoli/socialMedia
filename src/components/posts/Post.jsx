import React, { useState, useContext, useEffect } from "react";
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import PF from "../../EnvironmentVariables";
import PostContext from "../../Contexts/Post/PostContext";
import UserContext from "../../Contexts/User/UserContext";
import Comments from "../comments/Comments";

export default function Post(props) {
  let { post, deleteAPost } = props;

  const context1 = useContext(PostContext);
  const context2 = useContext(UserContext);
  let { updateLikes, getCommentsOnPost } = context1;
  let { sUser } = context2;

  let initialLikeState = post.likes.emails.includes(sUser.email);
  const [isLiked, setIsLiked] = useState(initialLikeState);
  const [likes, setLikes] = useState(post.likes.count);
  const [favoriteIconColor, setFavoriteIconColor] = useState(
    initialLikeState ? "red" : "black"
  );
  const [thumbsUpIconColor, setThumbsUpIconColor] = useState(
    initialLikeState ? "blue" : "black"
  );
  const [profilePicPath, setprofilePicPath] = useState(
    "images/socialmediaprofile.jpg"
  );

  const [postComments, setPostComments] = useState([]);
  const [fireCommentSec, setfireCommentSec] = useState('none');

  useEffect(() => {
    if (post.profilePicPath !== null) {
      if (
        post.profilePicPath &&
        typeof post.profilePicPath === "string" &&
        post.profilePicPath.includes("/uploadedProfilePic/undefined")
      ) {
        setprofilePicPath("/images/socialmediaprofile.jpg");
      } else {
        setprofilePicPath(`${PF}${post.profilePicPath}`);
      }
    }

    const fetchPostFun = async () => {
      const resp = await getCommentsOnPost(post.id);
      setPostComments(resp)
    };
    fetchPostFun()
    // eslint-disable-next-line
  }, [post]);

  const updateLike = () => {
    if (isLiked === false) {
      setLikes(likes + 1);
      updateLikes(post.id, true, sUser.email);
      setIsLiked(true);
      setFavoriteIconColor("red");
      setThumbsUpIconColor("blue");
    } else {
      setLikes(likes - 1);
      updateLikes(post.id, false, sUser.email);
      setIsLiked(false);
      setFavoriteIconColor("black");
      setThumbsUpIconColor("black");
    }
  };

  const formatTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
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
  return (
    <>
      <div className="posts">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <div className="postUserImg">
                <img src={profilePicPath} alt="" />
              </div>
              <span className="postUserName">{post.name}</span>
              <span className="postTime">{formatTimeAgo(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVertIcon />
              <div id="deletePostIcon">
                <button
                  onClick={() => {
                    deleteAPost(post.id);
                  }}
                >
                  Delete Post?
                </button>
              </div>
            </div>
          </div>
          <div className="postCenter">
            <div className="postMessage">{post.description}</div>
            <div className="postedImg">
              <img src={`${PF}${post.imagePath}`} alt="" />
            </div>
          </div>
          <div className="postBottom">
            <div className="postBottomLeft" onClick={updateLike}>
              <FavoriteIcon
                className="postBottomLeftIcons"
                htmlColor={favoriteIconColor}
              />
              <ThumbUpAltIcon
                className="postBottomLeftIcons"
                htmlColor={thumbsUpIconColor}
              />
              <span className="postLikeCount">{likes} people like it</span>
            </div>
            <div className="postBottomRight" onClick={()=>{setfireCommentSec(fireCommentSec==='none'?'block':'none')}}>
              <span>{post.comments.length} comments</span>
            </div>
          </div>
          <div className="commentSec" style={{"display": `${fireCommentSec}`}}>
            <Comments/>
          </div>
        </div>
      </div>
    </>
  );
}
