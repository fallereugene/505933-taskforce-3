/*
  Warnings:

  - Changed the type of `contractor_id` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "contractor_id",
ADD COLUMN     "contractor_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "contractor_id" TEXT NOT NULL,
    "total_rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "ratings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
