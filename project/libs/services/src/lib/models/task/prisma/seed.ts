import { PrismaClient } from '@prisma/client';
import { tasks } from './fixtures';

const prisma = new PrismaClient();

const fillTasks = async () => {
  const categoryList = {};
  for (const item of tasks) {
    const { category, ...rest } = item;
    await prisma.task.create({
      data: {
        ...rest,
        ...(categoryList[category]
          ? { categoryId: categoryList[category] }
          : { category: { create: { name: category } } }),
      },
    });
    if (!categoryList[category]) {
      categoryList[category] = Object.keys(categoryList).length + 1;
    }
  }
};

const seed = async () => {
  await fillTasks();
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
