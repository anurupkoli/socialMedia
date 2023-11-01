import {React, useContext, useEffect} from 'react'
import './feed.css'
import Share from '../share/Share'
import Post from '../posts/Post'
import PostContext from "../../Contexts/Post/PostContext";
import UserContext from "../../Contexts/User/UserContext";

export default function Feed() {
  const context1 = useContext(PostContext);
  const context2 = useContext(UserContext);
  let {fetchPosts, posts} = context1
  let {sUser} = context2
  
  useEffect(() => {
    fetchPosts(sUser._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sUser._id]);

  const sortPostsByCreatedAt = (posts) => {
    return posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
  return (
    <>
      <Share/>
      {posts?(<div>
        {sortPostsByCreatedAt(posts).map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>):'No Posts found'}
    </>
  )
}
