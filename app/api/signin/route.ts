import dbConnect from "@/utils/database";
import User from "@/models/user";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { email, username  } = await request.json()

  try {
    await dbConnect()
    const newUser = new User({
      email: email,
      username: username,
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 });

  } catch (error) {
    return new Response("Failed to create a new user", { status: 500 });
  }
};
