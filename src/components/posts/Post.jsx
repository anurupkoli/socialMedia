import React, { useState} from "react";
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import PF from "../../EnvironmentVariables";

export default function Post(props) {
  let post = props.post
  
  const [likes, setLikes] = useState(post.likes.count)
  const [isLiked, setIsLiked] = useState(false)
  const [favoriteIconColor, setFavoriteIconColor] = useState('black')
  const [thumbsUpIconColor, setThumbsUpIconColor] = useState('black')
  const updateLike = ()=>{
    if(isLiked === false){
      setLikes(likes+1)
      setIsLiked(true)
      setFavoriteIconColor('red')
      setThumbsUpIconColor('blue')
    }
    else{
      setLikes(likes-1)
      setIsLiked(false)
      setFavoriteIconColor('black')
      setThumbsUpIconColor('black')
    }
  }

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
            <div className="postUserImg"><img src={`${PF}${post.profilePicPath}`} alt="" /></div>
            <span className="postUserName">{post.name}</span>
            <span className="postTime">{formatTimeAgo(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
            <div className="postMessage">
                {post.description}
            </div>
            <div className="postedImg"><img src={`${PF}${post.imagePath}`} alt="" /></div>
        </div>
        <div className="postBottom">
            <div className="postBottomLeft" onClick={updateLike} >
                <FavoriteIcon className="postBottomLeftIcons" htmlColor={favoriteIconColor}/>         
                <ThumbUpAltIcon className="postBottomLeftIcons" htmlColor={thumbsUpIconColor}/>
                <span className="postLikeCount" >{likes} people like it</span>
            </div>
            <div className="postBottomRight">
                <span>{post.comments.length} comments</span>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}
