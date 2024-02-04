import React, { useContext } from "react";
import "./MessageOnlineFriends.css";
import UserContext from "../../../../Contexts/User/UserContext";
import OnlineFriend from "../../../onlineFriends/OnlineFriend";
import MessengerContext from "../../../../Contexts/Messenger/MessengerContext";

export default function MessageOnlineFriends(props) {
  const { onlineUsers, setMConversation } = props;

  const context1 = useContext(UserContext);
  const { friendDetails } = context1;

  const context2 = useContext(MessengerContext);
  const { conversations } = context2;

  let onlineUserIds = onlineUsers?.map((user) => user.userId);
  let friends = friendDetails?.filter((friend) =>
    onlineUserIds.includes(friend.id)
  );

  return (
    <>
      {friends
        ? friends.map((friend) => {
            let conversation = conversations.find((conversation) =>
              conversation.users.includes(friend.id)
            );
            return (
              <div className="messengerOnlineFriendDiv" key={friend.id} onClick={()=>{setMConversation(conversation._id)}} >
                <OnlineFriend  friend={friend} />
              </div>
            );
          })
        : "No Online Friends"}
    </>
  );
}
