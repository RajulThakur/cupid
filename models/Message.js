import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  userA: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userB: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [
    {
      from: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["text", "image"],
        default: "text",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = models.Message || model("Message", MessageSchema);

export default Message;
