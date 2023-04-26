import { PrismaClient } from '@prisma/review';
// import {  } from './fixtures';

const prisma = new PrismaClient();

const seed = async () => {
  console.info('🚀 Database was filled');
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
