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
  let [reRenderPage, setreRenderPage] = useState(1);

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

  const updateUserDetails = async (
    description,
    name,
    dob,
    currLiv,
    relaStat
  ) => {
    try {
    let object = {
      description: description,
      name: name,
      DOB: dob,
      currentlyLiving: currLiv,
      relationshipStatus: relaStat,
    };

      const res = await fetch(`${host}/api/auth/updateUser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify(object),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await res.json();
      alert('Details updated')
      setSUser(json)
    } catch (error) {
      console.log(error);
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

  const getUnfollowedFriends = async () => {
    try {
      const resp = await fetch(`${host}/api/auth/getUnfollwedFriends`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      const json = await resp.json();
      setunfollowedFriends(json);
    } catch (error) {
      console.log(error);
    }
  };

  const followFriend = async (friendId) => {
    try {
      const response = await fetch(`${host}/api/auth/followFriend`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          friendId: friendId,
        }),
      });
      const json = await response.json();
      alert(json)
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowFriend = async (friendId) => {
    try {
      const response = await fetch(`${host}/api/auth/unfollowFriend`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          friendId: friendId,
        }),
      });
      const json = await response.json();
      alert(json);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProfilePic = async (file) => {
    let formData = new FormData();
    formData.append("uploadImg", file ? file : null);
    try {
      const resp = await fetch(`${host}/api/auth/uploadProfilePic`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: formData,
      });

      const json = await resp.json();
      setreRenderPage((reRenderPage)=>reRenderPage+1);
      alert(json);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadBackgroundPic = async (file) => {
    let formData = new FormData();
    formData.append("uploadBackgroundPic", file ? file : null);
    try {
      const resp = await fetch(`${host}/api/auth/uploadBackgroundPic`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: formData,
      });

      const json = await resp.json();
      setreRenderPage((reRenderPage)=>reRenderPage+1);
      alert(json);
    } catch (error) {
      console.log(error);
    }
  };

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
        followFriend,
        unfollowFriend,
        uploadProfilePic,
        reRenderPage,
        uploadBackgroundPic,
        updateUserDetails
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
