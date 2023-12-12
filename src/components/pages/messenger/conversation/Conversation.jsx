import React, { useContext, useEffect } from "react";
import "./Conversation.css";
import ConversationFriends from "./ConversationFriends";
import MessengerContext from "../../../../Contexts/Messenger/MessengerContext";
import UserContext from '../../../../Contexts/User/UserContext';

export default function Conversation(props) {
  const { setMConversation } = props;

  const context1 = useContext(UserContext)
  const {friendDetails} = context1;
  const context2 = useContext(MessengerContext);
  const { getConversations, conversations } = context2;

  useEffect(() => {
    const fn = async () => {
      await getConversations();
    };
    fn();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="conversationMainContainer">
        <div className="conversationSearch">
          <input type="text" placeholder="Search for your friends" />
        </div>
        <div className="conversationFriends">
          {friendDetails?.map((friend) => {
            return (
              <div
                key={friend.id}
              >
                <ConversationFriends
                  friend={friend}
                  conversations={conversations}
                  setMConversation={setMConversation}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
