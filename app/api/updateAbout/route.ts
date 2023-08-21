import dbConnect from "@/utils/database";
import User from "@/models/user";

export const POST = async (req: Request, res: Response) => {
  try {
    const { sessionId, newAbout } = await req.json(); // Get session ID from the request body
    await dbConnect();

    const user = await User.findOneAndUpdate(
      { _id: sessionId },
      { $set: { about: newAbout } }, // Update the "about" field
      { new: true } // Return the updated document
    );
    if (user) {
      return new Response(JSON.stringify(user), { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("internal server error", { status: 500 });
  }
};

