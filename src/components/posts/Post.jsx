import React, { useState, useContext, useEffect } from "react";
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import PF from "../../EnvironmentVariables";
import PostContext from "../../Contexts/Post/PostContext";
import UserContext from "../../Contexts/User/UserContext";
import Comments from "../comments/Comments";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function Post(props) {
  let { post, deleteAPost } = props;

  const context1 = useContext(PostContext);
  const context2 = useContext(UserContext);
  let { updateLikes, getCommentsOnPost, uploadCommentOnPost } = context1;
  let { sUser, userProfilePic } = context2;

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
  const [userComment, setuserComment] = useState("");
  const [renderPage, setrenderPage] = useState(0);

  const [postComments, setPostComments] = useState([]);
  const [fireCommentSec, setfireCommentSec] = useState("none");

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

  const sortCommentsByCreatedAt = (comments) => {
    return comments.slice().sort((a, b) => {
      const timestampA = new Date(a.timeStamp).getTime();
      const timestampB = new Date(b.timeStamp).getTime();
      return timestampB - timestampA; // Sort in descending order (latest first)
    });
  };
  

  const handleCommentChange = (e) => {
    setuserComment(e.target.value);
  };

  const handleSendCommentClick = async(e) => {
    e.preventDefault();
    await uploadCommentOnPost(userComment, post.id)
    setrenderPage((renderPage)=>renderPage + 1);
  };

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
      setPostComments(resp);
    };
    fetchPostFun();
    // eslint-disable-next-line
  }, [post, renderPage]);

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
              <div id="postOptionsDiv">
                <button
                  className="deleteBtn"
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
            <div
              className="postBottomRight"
              onClick={() => {
                setfireCommentSec(fireCommentSec === "none" ? "block" : "none");
              }}
            >
              <span>{post.comments.length} comments</span>
            </div>
          </div>
          <div className="commentSec" style={{ display: `${fireCommentSec}` }}>
            <div className="commentContainer">
              <div className="commentSecProfDetails">
                <div className="commentSecProfilePic">
                  <img
                    src={
                      userProfilePic
                        ? PF + userProfilePic
                        : "./images/socialmediaprofile.jpg"
                    }
                    alt=""
                  />
                </div>
                <h4>{sUser.name}</h4>
              </div>
              <div className="commentDiv">
                <form>
                  <textarea
                    name="userComment"
                    id="userComment"
                    onChange={handleCommentChange}
                    placeholder="Write your comment here"
                  ></textarea>
                  <button
                    type="submit"
                    onClick={handleSendCommentClick}
                    id="sendRoundedBtnIcon"
                  >
                    <SendRoundedIcon htmlColor="purple" />
                  </button>
                </form>
              </div>
            </div>
            {postComments ? (
              <div>
                {sortCommentsByCreatedAt(postComments).map((postComment) => {
                  return (
                    <Comments key={postComment._id} postComment={postComment} postId={post.id} setrenderPage={setrenderPage} />
                  );
                })}
              </div>
            ) : (
              "No comments yet"
            )}
          </div>
        </div>
      </div>
    </>
  );
}
