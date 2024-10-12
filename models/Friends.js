import { Schema, model, models } from "mongoose";

const friendSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  requests: [{ type: Schema.Types.ObjectId, ref: "User", }],
});

const Friends = models.Friends || model("Friends", friendSchema);

export default Friends;
