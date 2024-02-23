import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(options);
    if (!session || !session.user) {
      return null;
    }

    return session.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
