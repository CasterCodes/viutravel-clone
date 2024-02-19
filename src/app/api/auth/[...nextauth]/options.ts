import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
        const user = await prisma?.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) return null;

        const correctPassword = await bcrypt.compare(
          credentials?.password!,
          user.password
        );

        if (!correctPassword) return null;

        console.log({ user });

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
