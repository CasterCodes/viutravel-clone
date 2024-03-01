import prisma from "../prisma";

export const getDestinations = async () => {
  try {
    const destinations = await prisma.destination.findMany();
    return destinations;
  } catch (error) {
    throw new Error("Error fetching destinations");
  }
};
