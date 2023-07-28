import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import User from "@/models/user";
import dbConnect from "@/utils/database";

const handler = NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "heychatmail@gmail.com",
          pass: "heychatmailP@@ss",
        },
      },
      from: "heychatmail@gmail.com",
    }),
  ],

  callbacks: {
    //@ts-ignore
    async signIn({user, account, email}) {
      await dbConnect();
      const userExists = await User.findOne({email: user.email});
      if (userExists) {
        return true;
      }
      else  {
        return "/signup"
      }
    }

  },
});

export { handler as GET, handler as POST };
