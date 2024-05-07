const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    conversationId: {
      type: String
    },
    sender: {
      type: String
    },
    text: {
        type: String
    }
  },
  { timestamps: true }
);

const Messages = mongoose.model("messages", MessageSchema);
module.exports = Messages;
