import { PrismaClient } from '@prisma/client';
import { tasks } from './fixtures';

const prisma = new PrismaClient();

const fillTasks = async () => {
  for (const item of tasks) {
    const { category, ...rest } = item;
    await prisma.task.create({
      data: {
        ...rest,
        category: {
          create: {
            name: category,
          },
        },
      },
    });
  }
};

const seed = async () => {
  await fillTasks();
  console.info('🚀 Database was filled');
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
