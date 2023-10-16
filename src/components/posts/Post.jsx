import React, { useState } from "react";
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export default function Post() {

  const [likes, setLikes] = useState(32)
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
            <div className="postBottomLeft" onClick={updateLike} >
                <FavoriteIcon className="postBottomLeftIcons" htmlColor={favoriteIconColor}/>         
                <ThumbUpAltIcon className="postBottomLeftIcons" htmlColor={thumbsUpIconColor}/>
                <span className="postLikeCount" >{likes} people like it</span>
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
