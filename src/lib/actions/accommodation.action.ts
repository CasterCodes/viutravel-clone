"use server";
import prisma from "../prisma";

import { AccommodationSchema } from "@/schemas/accommodation.schema";
import { Accommodation } from "@/types/accommodation.type";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createAccommodation = async (
  accommodation: Accommodation & { imageUrls: string[] }
) => {
  const validatedFields = AccommodationSchema.safeParse({
    name: accommodation.name,
    description: accommodation.description,
    address: accommodation.address,
    destinationId: accommodation.destinationId,
    propertyType: accommodation.propertyType,
    amenities: accommodation.amenities,
  });
  // @ts-expect-error
  console.log({ error: validatedFields.error });

  if (!validatedFields.success || accommodation.imageUrls.length < 0) {
    return {
      error: true,
      message: "Missing Fields. Failed to create destination",
    };
  }

  const amenities = accommodation.amenities.map((amenity) => amenity.value);

  try {
    await prisma.accommodation.create({
      data: {
        ...validatedFields.data,
        amenities,
      },
    });
  } catch (error) {
    console.log({ ACCOMMODATION_CREATION_ERROR: error });
    return {
      error: true,
      message: "Error creating destination",
    };
  }

  revalidatePath("/admin/dashboard/accommodations");
  redirect("/admin/dashboard/accommodations?create=true");
};
