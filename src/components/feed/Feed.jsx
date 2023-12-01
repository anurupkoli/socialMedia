import {React, useContext, useEffect, useState} from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../posts/Post'
import PostContext from "../../Contexts/Post/PostContext";
import UserContext from "../../Contexts/User/UserContext";

export default function Feed(props) {
  const context1 = useContext(PostContext);
  const context2 = useContext(UserContext);
  const {fetchPosts, posts,reRenderPosts, deletePost} = context1
  const {sUser} = context2
  const {isUser, render} = props;

  const [updatePage, setupdatePage] = useState(0);

  const deleteAPost = async (postId)=>{
    await deletePost(postId);
    setupdatePage((updatePage)=>updatePage+1);
  }
  
  useEffect(() => {
    const fetch = async()=>{
      await fetchPosts(sUser._id);
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ reRenderPosts,updatePage, render]);

  const sortPostsByCreatedAt = (posts) => {
    return posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
  return (
    <>
      {isUser?<Share/>:null}
      {posts?(<div>
        {sortPostsByCreatedAt(posts).map((post) => {
          return <Post key={post.id} post={post} deleteAPost={deleteAPost}/>;
        })}
      </div>):'No Posts found'}
    </>
  )
}
