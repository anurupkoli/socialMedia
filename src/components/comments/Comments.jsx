import {React, useState, useEffect} from 'react'
import './comments.css'
import PF from '../../EnvironmentVariables';

export default function Comments(props) {
  let {postComment} = props
  const [profilePic, setprofilePic] = useState('');
  useEffect(() => {
    if(postComment.profilePic === 'uploadedProfilePic/undefined'){
      setprofilePic('./images/socialmediaprofile.jpg')
    }
    else{
      setprofilePic(PF+'/'+postComment.profilePic)
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='commentContainer'>
      <div className="commentSecProfDetails">
        <div className="commentSecProfilePic">
          <img src={`${profilePic}`} alt="" />
        </div>
        <h4>{postComment.name}</h4>
        <p>says</p>
      </div>
      <div className="commentDiv">
        {postComment.comment}
      </div>
    </div>
  )
}
