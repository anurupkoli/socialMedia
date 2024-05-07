const mongoose = require("mongoose");

const ConversationsSchema = mongoose.Schema(
  {
    users: {
      type: Array,
    }
  },
  { timestamps: true }
);

const Conversations = mongoose.model("conversations", ConversationsSchema);
module.exports = Conversations;
