import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth";
import prisma from "../../lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export const getUserProfile = async () => {
  noStore();
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
