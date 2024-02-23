import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const options: NextAuthOptions = {
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
  callbacks: {
    async session({ session }) {
      const user = await prisma.user.findFirst({
        where: {
          email: session.user?.email!,
        },
      });

      if (!user) return session;

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  pages: {
    signIn: "/",
  },
};
