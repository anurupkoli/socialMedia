import { useState } from "react";
import PostContext from "./PostContext";

const PostState = (props) => {
  const host = "http://localhost:8000";
  const sPost = []
  const [posts, setPosts] = useState(sPost);

  const fetchPosts = async (userId) => {
    try {
      const response = await fetch(`${host}/api/posts/getPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZmIxZjNiNGYxMjE5NTMyNTcxYmNlIn0sImlhdCI6MTY5ODgyMzUxMH0.jt1tX8Tt2RqCwkJWS7MsJaZKonl_X4aLx23TlapCqbM"
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setPosts(json)
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <PostContext.Provider value={{ fetchPosts, posts }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
