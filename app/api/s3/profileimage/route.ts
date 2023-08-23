import User from "@/models/user";
import dbConnect from "@/utils/database";
import { useS3Upload } from "@/utils/useS3upload";

export const POST = async (req: Request, res: Response) => {
  try {
    const { sessionId, url } = await req.json();
    await dbConnect();
    const user = await User.findOneAndUpdate(
      { _id: sessionId },
      { $set: { profileImage: url } }, // Update the "profileImage" field
      { new: true } // Return the updated document
    );
    if (user) {
      return new Response(JSON.stringify({ user }), { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("internal server error", { status: 500 });
  }
};
