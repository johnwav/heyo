import User from "@/models/user";
import Friend from "@/models/friend";
import dbConnect from "@/utils/database";

export const POST = async (req: Request, res: Response) => {
  const { userId, friendshipId } = await req.json()

  try {
    // Find the friendship document
    await dbConnect();
    const existingFriendship = await Friend.findOne({
      userId: userId,
      _id: friendshipId,
    });

    if (!existingFriendship) {
      return new Response ("Frieind not found", {status: 404})
    }

    // Remove the friendship document
    await Friend.findByIdAndRemove(existingFriendship._id)

    // Update the user's friends list
    const user = await User.findById(userId);
    if (user && user.friends.includes(friendshipId)) {
      user.friends = user.friends.filter(
        (friendId:string) => friendId.toString() !== friendshipId.toString()
      );
      await user.save();
    }

    // Return success response
    return new Response("Friend removed successfully", {status:200})
  } catch (error) {
    console.error(error);
    return new Response("Error removing friend")
  }
};
