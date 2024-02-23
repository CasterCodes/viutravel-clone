"use server";

import { UserProfile } from "@/types/profile.types";
import prisma from "../../lib/prisma";
import { getCurrentUser } from "../data/auth";

export const updateUserProfile = async (values: UserProfile) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        error: true,
        message: "No authenticated user",
      };
    }

    const { email, ...newValues } = values;

    const updatedProfile = await prisma.profile.update({
      where: {
        userId: user.id,
      },
      data: { ...newValues },
    });

    if (!updatedProfile) {
      return {
        error: true,
        message: "Error updating user profile",
      };
    }

    return {
      success: true,
      message: "Profile update successfully",
    };
  } catch (error) {
    console.log({ PROFILE_UPDATE_ERROR: error });
    return {
      error: true,
      message: "Error updating user profile",
    };
  }
};
