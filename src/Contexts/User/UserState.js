import UserContext from "./UserContext";
import { useState } from "react";

const UserState = (props)=>{
    const host = "http://localhost:8000";
    const [sUser, setSUser] = useState(null);

    const fetchUser = async()=>{
        const resp = await fetch(`${host}/api/auth/getUser`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZmIxZjNiNGYxMjE5NTMyNTcxYmNlIn0sImlhdCI6MTY5ODY3MzEzOX0.S1P5wVMZXlJaKbmgD-3JM1LHcz_737hqBm4Ak5P-bpE"
            }
        })
        const json =  await resp.json()
        console.log(json)
    }

    return (
        <UserContext.Provider value = {{fetchUser}} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;