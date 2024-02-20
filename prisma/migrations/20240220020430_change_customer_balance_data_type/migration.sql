/*
  Warnings:

  - Added the required column `customerId` to the `CustomerBalanceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_customerBalanceHistoryId_fkey";

-- AlterTable
ALTER TABLE "CustomerBalanceHistory" ADD COLUMN     "customerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CustomerBalanceHistory" ADD CONSTRAINT "CustomerBalanceHistory_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
