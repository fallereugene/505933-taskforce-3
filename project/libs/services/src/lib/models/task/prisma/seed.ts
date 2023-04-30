import { PrismaClient } from '.prisma/task';
import { tasks } from './fixtures';

const prisma = new PrismaClient();

const fillTasks = async () => {
  for (const item of tasks) {
    const { category, ...rest } = item;
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: category,
      },
    });
    await prisma.task.create({
      data: {
        ...rest,
        ...(existingCategory
          ? { categoryId: existingCategory.id }
          : {
              category: {
                create: {
                  name: category,
                },
              },
            }),
      } as any,
    });
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
