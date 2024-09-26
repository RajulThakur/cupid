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
    select:false
  },
});

const UserModel = models?.User || model("User", userSchema);
export default UserModel;
