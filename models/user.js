import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already existS!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "UserName is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-0._]+(?<![_.])$/,
      "UserName invalid, it should contain 4-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
