const io = require('socket.io')(8001, {
    cors: {
        origin: "http://localhost:3000"
    },
})

let users = [];
const addUser = (userId, socketId)=>{
    !users.some(user=>user.userId===userId) && users.push({userId, socketId})
}

const removeUser = (socketId)=>{
    users = users.filter(user=>user.socketId!==socketId)
}

const getUser = (friendId)=>{
    return users.find(user=>user.userId === friendId)
}

io.on("connect", (socket)=>{
    //After connection
    console.log('user connected')
    socket.on("setUser", userId=>{
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })
    //Sending and recieving messages
    socket.on("sendMessage", ({userId, friendId, text})=>{
        try {
            const friend = getUser(friendId)
            if(!friend){
                return
            }
            io.to(friend.socketId).emit("getMessage",{
                userId,
                text
            })
        } catch (error) {
            console.log(error)
        }
    })

    //After disconnection
    socket.on("disconnect", ()=>{
        removeUser(socket.id)
        io.emit("getUsers", users)
    })

})

