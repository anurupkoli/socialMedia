import { useState } from "react";
import PostContext from "./PostContext";

const {HOST} = require("../../EnvironmentVariables")

const PostState = (props) => {
  const sPost = [];
  const [posts, setPosts] = useState(sPost);
  const [reRenderPosts, setreRenderPosts] = useState(0);

  const fetchPosts = async (userId) => {
    try {
      const response = await fetch(`${HOST}/api/posts/getPosts`, {
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
      formData.append("uploadPost", file ? file : null);
      formData.append("description", description);
      const response = await fetch(`${HOST}/api/posts/uploadPost`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: formData,
      });
      // eslint-disable-next-line
      const json = await response.json();
      setreRenderPosts((reRenderPosts)=>reRenderPosts+1);
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const updateLikes = async (postId, didLike, friendEmail) => {
    try {
      const response = await fetch(`${HOST}/api/posts/updateLikes/${postId}`, {
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
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${HOST}/api/posts/deletePost/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (!response.ok) {
        console.log(response);
      }
      // eslint-disable-next-line
      let json = await response.json();
      alert(json);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadCommentOnPost = async (comment, postId)=>{
    try {
      const resp = await fetch(`${HOST}/api/posts/commentOnPost/${postId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify({
          "comment": comment
        })
      })
      const json = await resp.json();
      alert(json)
    } catch (error) {
      console.log(error)
    }
  }

  const getCommentsOnPost = async (postId) => {
    try {
      const resp = await fetch(
        `${HOST}/api/posts/getCommentsOnPost/${postId}`,
        {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      const json = await resp.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCommentOnPost = async(postId, commentId)=>{
    try {
      const resp = await fetch(`${HOST}/api/posts/deleteCommentOnPost/${postId}/${commentId}`, {
        method: "DELETE", 
        headers: {
          "auth-token": localStorage.getItem('auth-token')
        }
      });
      const json = await resp.json();
      return json;
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <PostContext.Provider
      value={{
        fetchPosts,
        posts,
        updateLikes,
        uploadPost,
        deletePost,
        getCommentsOnPost,
        uploadCommentOnPost,
        reRenderPosts,
        deleteCommentOnPost
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
