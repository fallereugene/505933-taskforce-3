import { PrismaClient } from '.prisma/review';
import { reviews } from './fixtures';

const prisma = new PrismaClient();

const seed = async () => {
  for (const item of reviews) {
    await prisma.review.create({
      data: {
        ...item,
      },
    });
  }
};

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
