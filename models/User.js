import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  gender: {
    type: String,
  },
  relationshipStatus: {
    type: String,
  },
  bio: {
    type: String,
  },
});

const UserModel = models?.User || model("User", userSchema);
export default UserModel;
