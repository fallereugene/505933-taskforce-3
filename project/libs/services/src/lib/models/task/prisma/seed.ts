import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seed = async () => {};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
