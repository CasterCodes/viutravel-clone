"use server";
import { DestinationSchema } from "@/schemas/destination.schema";
import prisma from "../prisma";

import { Destination } from "@/types/destination.types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createDestination = async (
  destination: Destination & { image: string }
) => {
  const validatedFields = DestinationSchema.safeParse({
    name: destination.name,
    location: destination.location,
    description: destination.description,
  });

  if (!validatedFields.success || !destination.image) {
    return {
      error: true,
      message: "Missing Fields. Failed to create destination",
    };
  }

  try {
    await prisma.destination.create({
      data: destination,
    });
  } catch (error) {
    console.log({ DESTINATION_CREATION_ERROR: error });
    return {
      error: true,
      message: "Error creating destination",
    };
  }

  revalidatePath("/admin/dashboard/destinations");
  redirect("/admin/dashboard/destinations?create=true");
};
