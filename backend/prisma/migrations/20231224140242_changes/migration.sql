/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Made the column `orderDetailsId` on table `OrderUpdateDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OrderUpdateDetails" DROP CONSTRAINT "OrderUpdateDetails_orderDetailsId_fkey";

-- AlterTable
ALTER TABLE "OrderUpdateDetails" ALTER COLUMN "orderDetailsId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "event_datetime_with_tz" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "OrderUpdateDetails" ADD CONSTRAINT "OrderUpdateDetails_orderDetailsId_fkey" FOREIGN KEY ("orderDetailsId") REFERENCES "OrderDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
