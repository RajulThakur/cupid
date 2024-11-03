import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  username:{
    type:String,
    unique:true,
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
  pin: {
    type: String,
    select: false,
  },
});

const UserModel = models?.User || model("User", userSchema);
export default UserModel;
