import prisma from "../prisma";
import { unstable_noStore as noStore } from "next/cache";

export const getAccommodations = async () => {
  try {
    const accommodations = await prisma.accommodation.findMany({
      include: {
        destination: true,
      },
    });
    return accommodations;
  } catch (error) {
    throw new Error("Error getting accommodations");
  }
};

export const getAccommodationById = async (accommodationId: string) => {
  try {
    const accommodation = await prisma.accommodation.findUniqueOrThrow({
      where: {
        id: accommodationId,
      },
      include: {
        destination: true,
        offer: true,
        rooms: true,
      },
    });

    return accommodation;
  } catch (error) {
    // console.log({ ERROR_GETTING_ACCOMMODATION: error });
    throw new Error("Error getting accommodation");
  }
};

export const getAccommodationsHotDeals = async () => {
  noStore();
  try {
    const accommodations = await prisma.offer.findMany({
      where: {
        startingFrom: {
          lte: 100000,
        },
      },
      include: {
        accommodation: true,
      },
      take: 12,
      orderBy: {
        createdAt: "desc",
      },
    });

    return accommodations;
  } catch (error) {
    throw new Error("Error getting hot deals");
  }
};
