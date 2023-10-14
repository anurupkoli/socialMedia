import React from "react";
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export default function Post() {
  return (
    <>
      <div className="posts">
        <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <div className="postUserImg"></div>
            <span className="postUserName">Anurup Koli</span>
            <span className="postTime">20 min ago</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
            <div className="postMessage">
                Hello! this is my first Post
            </div>
            <div className="postedImg"></div>
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <FavoriteIcon className="postBottomLeftIcons" htmlColor="red"/>         
                <ThumbUpAltIcon className="postBottomLeftIcons" htmlColor="blue"/>
                <span className="postLikeCount" >200k people like it</span>
            </div>
            <div className="postBottomRight">
                <span>50k comments</span>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}
