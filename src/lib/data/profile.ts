import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth";
import prisma from "../../lib/prisma";

export const getUserProfile = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return redirect("/");
    }

    const userProfile = await prisma.profile.findFirst({
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
      },
    });

    if (!userProfile) {
      throw new Error("No user profile");
    }

    return userProfile;
  } catch (error) {
    throw new Error("Error getting user profile");
  }
};
