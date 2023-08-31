import User from "@/models/user";
import Friend from "@/models/friend";
import dbConnect from "@/utils/database";
import { error } from "console";

export const POST = async (req: Request, res: Response) => {
  const { userId, friendUsername } = await req.json();

  try {
    // 1 Find the friend's user document
    //find the friend's account
    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      return new Response("Friend Not Found", { status: 404 });
    }
    // find if thhis friend relationship already exists ie theyre already friends
    const existingFriend = await Friend.findOne({
      userId: userId,
      friendId: friend._id, //the friends id
    });

    if (existingFriend) {
      // remove friend
      Friend.findByIdAndDelete(existingFriend._id);
      return new Response("Friend removed successfully", { status: 200 });
    }
  } catch (error) {
    return new Response("error removing friend", { status: 500 });
  }
};

