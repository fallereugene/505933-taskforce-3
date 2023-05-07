import { PrismaClient } from '.prisma/review';
import { reviews } from './fixtures';

const prisma = new PrismaClient();

const seed = async () => {};

(async () => {
  try {
    await seed();
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  }
})();
