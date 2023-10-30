import UserContext from "./UserContext";
import { useState } from "react";

const UserState = (props)=>{
    const host = "http://localhost:8000";
    let user  = {}
    const [sUser, setSUser] = useState(user);
    const [userProfilePic, setUserProfilePic] = useState(null);

    const fetchUser = async () => {
        try {
          const resp = await fetch(`${host}/api/auth/getUser`, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZmIxZjNiNGYxMjE5NTMyNTcxYmNlIn0sImlhdCI6MTY5ODY3MzU4Nn0.epFCuo31uChQ4VQ8MQMxAlAJZ8t1wlNEmzQZPu-QPe8"
            }
          });
      
          if (!resp.ok) {
            throw new Error('Network response was not ok');
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
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZmIxZjNiNGYxMjE5NTMyNTcxYmNlIn0sImlhdCI6MTY5ODY3MzU4Nn0.epFCuo31uChQ4VQ8MQMxAlAJZ8t1wlNEmzQZPu-QPe8"
            }
          });
      
          if (!resp.ok) {
            throw new Error('Network response was not ok');
          }
      
          const profilePic = await resp.text();
          setUserProfilePic(profilePic);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      

    return (
        <UserContext.Provider value = {{fetchUser, sUser, fetchUserProfilePic, userProfilePic}} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;