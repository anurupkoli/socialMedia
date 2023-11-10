import UserContext from "./UserContext";
import { useState } from "react";

const UserState = (props) => {
  const host = "http://localhost:8000";
  let user = {};
  const [sUser, setSUser] = useState(user);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [userBackgroundPic, setUserBackgroundPic] = useState(null);
  const [friendDetails, setfriendDetails] = useState([]);
  const [unfollowedFriends, setunfollowedFriends] = useState([]);

  const fetchUser = async () => {
    try {
      const resp = await fetch(`${host}/api/auth/getUser`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await resp.json();
      setSUser(json.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchUserProfilePic = async () => {
    try {
      const resp = await fetch(`${host}/api/auth/getProfilePic`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }

      const profilePic = await resp.text();
      setUserProfilePic(profilePic);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchUserBackgroundPic = async () => {
    try {
      const resp = await fetch(`${host}/api/auth/getBackgroundPic`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
    
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      const backgroundPic = await resp.text();
      setUserBackgroundPic(backgroundPic);

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchFriendDetails = async () => {
    const res = await fetch(`${host}/api/auth/getFriendsDetails`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await res.json();
    setfriendDetails(json.friends);
  };

  const getUnfollowedFriends = async ()=>{
    try {
      const resp = await fetch(`${host}/api/auth/getUnfollwedFriends`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem('auth-token')
        }
      })
  
      const json = await resp.json();
      setunfollowedFriends(json)
    } catch (error) {
      console.log(error)
    }
  }

  const followFriend = async(friendId)=>{
    try {
      const response = await fetch(`${host}/api/auth/followFriend`, {
        method: "POST", 
        headers:{
          "Content-type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify({
          friendId: friendId
        })
      })
      const json = await response.json();
      alert(json)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        fetchUser,
        sUser,
        fetchUserProfilePic,
        userProfilePic,
        fetchUserBackgroundPic,
        userBackgroundPic,
        fetchFriendDetails,
        friendDetails,
        getUnfollowedFriends,
        unfollowedFriends,
        followFriend
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
