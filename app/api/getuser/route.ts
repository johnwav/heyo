import dbConnect from "@/utils/database";
import User from "@/models/user";
import {
  RtmRole,
  RtmTokenBuilder,
} from "agora-access-token";

function getRtmToken(userId: string) {
  const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
  const appCertificate = process.env.NEXT_PUBLIC_AGORA_APP_CERT!;
  const account = userId;
  const expirationTimeInSeconds = 3600;
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds;

  const token = RtmTokenBuilder.buildToken(
    appID,
    appCertificate,
    account,
    RtmRole.Rtm_User,
    privilegeExpiredTs
  );
  return token;
}

export const POST = async (req: Request, res: Response) => {
  try {
    const { sessionId } = await req.json(); // Get session ID from the request body

    await dbConnect();
    // Find user by session ID
    const user = await User.findOne({ _id: sessionId });
    if (user) {
      const token = getRtmToken("72");
      console.log("user from api", user, "token", token);
      return new Response(JSON.stringify({user, token}), { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Error fetching user data", { status: 500 });
  }
};
