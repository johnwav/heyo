import dbConnect from "@/utils/database";
import User from "@/models/user";

export const POST = async (req: Request, res: Response) => {
  try {
    const { sessionId } = await req.json(); // Get session ID from the request body

    await dbConnect();
    // Find user by session ID

    const user = await User.findOne({ _id: sessionId });
    if (user) {
      return new Response(JSON.stringify(user), { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Error fetching user data", { status: 500 });
  }

};
