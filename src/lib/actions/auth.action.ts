"use server";

import { SignUpSchema } from "@/schemas/auth.schemas";
import { Login, Signup, VerifyCredentials } from "@/types/auth.types";
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

    await prisma.profile.create({
      data: {
        userId: createdUser.id,
      },
    });

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

export const verifyLoginCredentials = async (
  data: Login
): Promise<VerifyCredentials> => {
  const { username, password } = data;

  const user = await prisma?.user.findUnique({
    where: {
      email: username,
    },
  });

  const errorResponse: VerifyCredentials = {
    error: true,
    message: "Invalid credentials",
  };

  if (!user) return errorResponse;

  const correctPassword = await bcrypt.compare(password, user.password);

  if (!correctPassword) return errorResponse;

  return {
    success: true,
    message: "Correct credentials",
    email: user.email,
    name: user.username,
    id: user.id,
  };
};

