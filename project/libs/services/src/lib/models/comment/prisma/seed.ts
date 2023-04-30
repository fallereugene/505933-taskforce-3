import { PrismaClient } from '.prisma/comment';
import { comments } from './fixtures';

const prisma = new PrismaClient();

const seed = async () => {
  for (const item of comments) {
    await prisma.comment.create({
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
