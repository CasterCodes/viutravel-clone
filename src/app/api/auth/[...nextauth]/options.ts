import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { verifyLoginCredentials } from "@/lib/actions/auth.action";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // by the time we reach the authorize function we would have verified user credentials

        const user = await prisma?.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) return null;

        return {
          email: user.email,
          name: user.username,
          id: user.id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};
