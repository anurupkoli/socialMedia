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
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZmIxZjNiNGYxMjE5NTMyNTcxYmNlIn0sImlhdCI6MTY5ODgyMzUxMH0.jt1tX8Tt2RqCwkJWS7MsJaZKonl_X4aLx23TlapCqbM",
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
      formData.append("uploadPost", file);
      formData.append("description", description);
      const response = await fetch(`${host}/api/posts/uploadPost`, {
        method: "POST",
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZmIxZjNiNGYxMjE5NTMyNTcxYmNlIn0sImlhdCI6MTY5ODgyMzUxMH0.jt1tX8Tt2RqCwkJWS7MsJaZKonl_X4aLx23TlapCqbM",
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

  return (
    <PostContext.Provider
      value={{ fetchPosts, posts, updateLikes, uploadPost, reRenderPosts }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
