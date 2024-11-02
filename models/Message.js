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
      message: {
        type: String,
        required: true,
      },
      msgType: {
        type: String,
        enum: ["text", "image", "audio"],
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
