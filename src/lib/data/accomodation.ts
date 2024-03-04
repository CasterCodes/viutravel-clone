import prisma from "../prisma";

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
