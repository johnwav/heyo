import dbConnect from "@/utils/database";
import User from "@/models/user";
import { RtmRole, RtmTokenBuilder } from "agora-access-token";
import { userState } from "@/features/user/userSlice";

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
    const user = <userState>await User.findOne({ _id: sessionId });
    if (user) {
      const agoraId = user.agoraId;
      const token = getRtmToken(agoraId);
      console.log("user from api", user, "token", token);
      return new Response(JSON.stringify({ user, token }), { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Error fetching user data", { status: 500 });
  }
};
