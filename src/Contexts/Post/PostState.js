import { useState } from "react";
import PostContext from "./PostContext";

const PostState = (props) => {
  const host = "http://localhost:8000";
  const sPost = [];
  const [posts, setPosts] = useState(sPost);
  const [reRenderPosts, setreRenderPosts] = useState(0);

  const fetchPosts = async (userId) => {
    try {
      const response = await fetch(`${host}/api/posts/getPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setPosts(json);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const uploadPost = async (description, file) => {
    try {
      let formData = new FormData();
      formData.append("uploadPost", file?file:null);
      formData.append("description", description);
      const response = await fetch(`${host}/api/posts/uploadPost`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: formData,
      });
      // eslint-disable-next-line
      const json = await response.json();
      setreRenderPosts(reRenderPosts + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLikes = async (postId, didLike, friendEmail) => {
    const response = await fetch(`${host}/api/posts/updateLikes/${postId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        friendEmail: friendEmail,
        didLike: didLike,
      }),
    });
    // eslint-disable-next-line
    const json = await response.json();
  };

  const deletePost = async(postId)=>{
    try {
      const response = await fetch(`${host}/api/posts/deletePost/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
      })
      if(!response.ok){
        console.log(response)
      }
      // eslint-disable-next-line
      let json = await response.json()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <PostContext.Provider
      value={{ fetchPosts, posts, updateLikes, uploadPost, reRenderPosts, deletePost }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
