// testPrisma.js
import prisma from './models/prisma.js'; // note the .js extension

async function test() {
  try {
    const users = await prisma.users.findMany();
    console.log("Prisma working:", users);
  } catch (err) {
    console.error("Prisma failed:", err);
  }
}

test();
