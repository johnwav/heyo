import User from "@/models/user";
import Friend from "@/models/friend";
import dbConnect from "@/utils/database";
import { error } from "console";

export const POST = async (req: Request, re: Response) => {
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
      return new Response("Friend Exists", { status: 302 });
    }

    //2 Creating friendship
    const friendship = await Friend.create({
      userId: userId,
      friendId: friend._id,
    });

    //3 update the users friends list
    const user = await User.findById(userId);
    //@ts-ignore
    // if (user && !user.friends.includes(friendship._id)) {
    //     await user.friends.push(friendship._id)
    //     await user.save()
    // }
    if (user && !user.friends.includes(friendship._id)) {
      User.updateOne({ _id: userId }, { $push: { friends: friendship._id } });
    }
    //return what you need here
    return new Response("friend added successfully", { status: 200 });
  } catch (error) {
    return new Response("error adding friend", { status: 500 });
  }
};
