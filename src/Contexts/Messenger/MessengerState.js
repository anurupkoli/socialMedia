import MessengerContext from "./MessengerContext";
const MessengerState = (props)=>{
    const host = "https://localhost:8000/api/conversations";

    const createConversation = async(friendId)=>{
        const resp = await fetch(`${host}/createConversation`,{
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            },
            body: JSON.stringify({
                friendId: friendId
            })
        } )

        const json = await resp.json();
        console.log(json)
    }

    const getConversations = async()=>{
        const resp = await fetch(`${host}/getConversations`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('auth-token')
            }
        })
        const json = await resp.json();
        console.log(json)
    }

    return(
        <MessengerContext.Provider value={{createConversation, getConversations}} >
           {props.children} 
        </MessengerContext.Provider>
    )
}

export default MessengerState;