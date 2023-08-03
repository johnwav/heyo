import User from "@/models/user";
import dbConnect from "@/utils/database";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

//@ts-ignore
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      //@ts-ignore
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        await dbConnect();
        const user = await User.findOne({ email });
        if (!user) throw new Error("email/password mismatch");
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) throw new Error("email/password mismatch");

        return {
          username: user.username,
          email: user.email,
          id: user._id,
        };
      },
    }),
  ],


  callbacks: {
    jwt(params: any) {
      if (params.user) {
        params.token.id = params.user.id;
        params.token.username = params.user.username;
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id as string,
            username: token.username as string,
          },
        };
      }
      return session;
    },
  },





};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
