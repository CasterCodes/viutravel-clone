"use server";

import { SignUpSchema } from "@/schemas/auth.schemas";
import { Signup } from "@/types/auth.types";
import prisma from "../prisma";

import bcrypt from "bcryptjs";

export const createUserAccount = async (data: Signup) => {
  const validatedData = SignUpSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      error: "Invalid user data",
    };
  }

  const userInfo = {
    username: validatedData.data.username,
    password: validatedData.data.password,
    email: validatedData.data.email,
    phone: validatedData.data.phone,
  };

  try {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: userInfo.email,
      },
    });

    if (emailExists) {
      return {
        error: "Email associated with another account",
      };
    }

    const salt = await bcrypt.genSalt(12);

    userInfo.password = await bcrypt.hash(userInfo.password, salt);

    const createdUser = await prisma.user.create({
      data: userInfo,
    });

    if (!createdUser) {
      return {
        error: "Error creating user account",
      };
    }

    return {
      success: "Account was created successfully",
    };
  } catch (error) {
    console.log({ ACCOUNT_CREATION_ERROR: error });
    return {
      error: "Error creating user account",
    };
  }
};


