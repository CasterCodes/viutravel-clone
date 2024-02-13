const { PrismaClient } = require("@prisma/client");
const data = require("./data.json");

const database = new PrismaClient();

async function seedDatabase() {
  try {
    // Insert users
    await database?.user.createMany({ data: data.users });

    // Insert offers
    await database?.offer.createMany({ data: data.offers });

    // Insert destinations
    await database?.destination.createMany({ data: data.destinations });

    // Insert rooms
    await database?.room.createMany({ data: data.rooms });

    // Insert accommodations
    await database?.accommodation.createMany({ data: data.accommodations });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await database?.$disconnect();
  }
}

seedDatabase();
