-- CreateEnum
CREATE TYPE "City" AS ENUM ('Moscow', 'StPetersburg', 'Vladivostok');

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "category_id" INTEGER NOT NULL,
    "cost" INTEGER DEFAULT 0,
    "due_date" TIMESTAMP(3),
    "image" TEXT DEFAULT '',
    "address" TEXT DEFAULT '',
    "tags" TEXT[],
    "city" "City" NOT NULL,
    "status" INTEGER NOT NULL,
    "customer" TEXT,
    "contractor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
