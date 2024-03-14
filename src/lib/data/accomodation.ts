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


export const getExplorePropertyTypes = async () => {
  try {
    const accommodationsWithCounts = await prisma.accommodation.groupBy({
      by: ["propertyType"],
      _count: {
        id: true, // Count the number of accommodations per property type
      },
    });

    const uniqueAccommodations = [];

    for (const group of accommodationsWithCounts) {
      const accommodation = await prisma.accommodation.findFirst({
        where: {
          propertyType: group.propertyType, // Fetch the first accommodation for each property type
        },
        select: {
          imageUrls: true,
          propertyType: true,
          slug: true,
          name: true,
          id: true,
        },
      });

      uniqueAccommodations.push({
        accommodation: accommodation,
        count: group._count.id,
      });
    }

    return uniqueAccommodations;
  } catch (error) {
    throw new Error("Error getting accommodation types");
  }
};


export const getTopAccommondations = async () => {
  try {
    const accommodations = await prisma.accommodation.findMany({
      distinct: ["propertyType"],
      include: {
        offer: {
          where: {
            OR: [
              {
                startingFrom: {
                  gt: 10000,
                },
              },
              {
                startingFrom: {
                  lt: 20000,
                },
              },
            ],
          },
        },
      },
      take: 12,
    });

    return accommodations;
  } catch (error) {
    throw new Error("Error getting top accommodations");
  }
};
