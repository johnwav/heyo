import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain alphanumeric letters and be unique!",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "https://heyochatbucket.s3.eu-north-1.amazonaws.com/default.jpg",
  },
  online: {
    type: Boolean,
    default: false,
  },
  lastSeen: {
    type: Date,
    default: new Date(),
  },
  about: {
    type: String,
    default: "Hey, i'm using Heyo!",
  },
});

//Hash the password before saving

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

//compare password method
UserSchema.methods.comparePassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
const User = models.User || model("User", UserSchema);

export default User;
