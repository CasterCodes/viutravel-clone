"use server";
import prisma from "../prisma";

import {
  AccommodationOfferSchema,
  AccommodationRoomSchema,
  AccommodationSchema,
} from "@/schemas/accommodation.schema";
import {
  Accommodation,
  AccommodationRoom,
  AccommodatonOffer,
} from "@/types/accommodation.type";
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

export const createAccommodationRoom = async (
  data: AccommodationRoom & { accommodationId: string }
) => {
  const validatedFields = AccommodationRoomSchema.safeParse({
    pricePerNight: data.numberOfGuests.toString(),
    roomType: data.roomType,
    numberOfGuests: data.numberOfGuests.toString(),
    capacity: data.capacity.toString(),
  });

  if (!validatedFields.success || !data.accommodationId) {
    return {
      error: true,
      message: "Missing Fields. Failed to create room",
    };
  }

  const newRoom = {
    pricePerNight: +validatedFields.data.pricePerNight,
    roomType: validatedFields.data.roomType,
    numberOfGuests: +validatedFields.data.numberOfGuests,
    capacity: +validatedFields.data.capacity,
    accommodationId: data.accommodationId,
  };
  try {
    await prisma.room.create({
      data: newRoom,
    });
  } catch (error) {
    return {
      error: true,
      message: "Error creating room",
    };
  }

  revalidatePath(`/admin/dashboard/accommodations/${data.accommodationId}`);
  redirect(`/admin/dashboard/accommodations/${data.accommodationId}`);
};

export const updateAccommodationRoom = async (
  data: AccommodationRoom & { accommodationId: string },
  roomId: string
) => {
  const validatedFields = AccommodationRoomSchema.safeParse({
    pricePerNight: data.numberOfGuests.toString(),
    roomType: data.roomType,
    numberOfGuests: data.numberOfGuests.toString(),
    capacity: data.capacity.toString(),
  });

  if (!validatedFields.success || !data.accommodationId || !roomId) {
    return {
      error: true,
      message: "Missing Fields. Failed to update room",
    };
  }

  const newRoom = {
    pricePerNight: +validatedFields.data.pricePerNight,
    roomType: validatedFields.data.roomType,
    numberOfGuests: +validatedFields.data.numberOfGuests,
    capacity: +validatedFields.data.capacity,
    accommodationId: data.accommodationId,
  };
  try {
    await prisma.room.update({
      data: newRoom,
      where: {
        id: roomId,
      },
    });
  } catch (error) {
    return {
      error: true,
      message: "Error updating room",
    };
  }

  revalidatePath(`/admin/dashboard/accommodations/${data.accommodationId}`);
  redirect(`/admin/dashboard/accommodations/${data.accommodationId}`);
};

export const createAccommodationOffer = async (
  data: AccommodatonOffer,
  accommodationId: string
) => {
  const validatedFields = AccommodationOfferSchema.safeParse({
    name: data.name,
    startingFrom: data.startingFrom.toString(),
    startDate: data.startDate,
    endDate: data.endDate,
  });

  if (!validatedFields.success || !accommodationId) {
    return {
      error: true,
      message: "Missing Fields. Failed to create room",
    };
  }

  const offer = {
    ...validatedFields.data,
    accommodationId,
  };

  try {
    await prisma.offer.create({
      data: offer,
    });
  } catch (error) {
    console.log({ ERROR_CREATING_OFFER: error });
    return {
      error: true,
      message: "Error creating offer",
    };
  }

  revalidatePath(`/admin/dashboard/accommodations/${accommodationId}`);
  redirect(`/admin/dashboard/accommodations/${accommodationId}`);
};


export const updateAccommodationOffer = async (
  data: AccommodatonOffer,
  accommodationId: string,
  offerId: string
) => {
  const validatedFields = AccommodationOfferSchema.safeParse({
    name: data.name,
    startingFrom: data.startingFrom.toString(),
    startDate: data.startDate,
    endDate: data.endDate,
  });

  if (!validatedFields.success || !accommodationId) {
    return {
      error: true,
      message: "Missing Fields. Failed to updating room",
    };
  }

  const offer = {
    ...validatedFields.data,
    accommodationId,
  };

  try {
    await prisma.offer.update({
      data: offer,
      where: {
        id: offerId,
      },
    });
  } catch (error) {
    console.log({ ERROR_UPDATING_OFFER: error });
    return {
      error: true,
      message: "Error updating  offer",
    };
  }

  revalidatePath(`/admin/dashboard/accommodations/${accommodationId}`);
  redirect(`/admin/dashboard/accommodations/${accommodationId}`);
};
