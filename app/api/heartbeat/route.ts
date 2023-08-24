import User from "@/models/user";
import dbConnect from "@/utils/database";

export const POST = async (req: Request, res: Response) => {
  const { sessionId } = await req.json();
  try {
    await dbConnect();
    const user = await User.findOneAndUpdate(
      { _id: sessionId },
      { $set: { online: true } }
    );
    if (user) {
      return new Response(JSON.stringify(user), { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};
