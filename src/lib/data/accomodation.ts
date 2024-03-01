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
