import User from "@/models/user";
import dbConnect from "@/utils/database";
import { NextResponse } from "next/server";

interface NewUserRequest {
  username: string;
  email: string;
  password: string;
}

interface NewUserResponse {
  id: string;
  username: string;
  email: string;
}
type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>;

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as NewUserRequest;
  await dbConnect();
  const oldUser = await User.findOne({ email: body.email });
  if (oldUser) {
    return NextResponse.json(
      { error: "email is aready in use" },
      { status: 422 }
    );
  }
  const user = await User.create({ ...body });
  return NextResponse.json({
    user: {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
    },
  });
};
