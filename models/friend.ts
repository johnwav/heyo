import { Schema, model, models } from "mongoose";

const FriendshipSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  friendId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Friend = models.Friend || model("Friend", FriendshipSchema);

export default Friend;

