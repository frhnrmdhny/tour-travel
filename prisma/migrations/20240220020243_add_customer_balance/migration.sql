/*
  Warnings:

  - Added the required column `customerBalanceHistoryId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CustomerBalanceHistoryType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'TRANSACTION');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "customerBalanceHistoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CustomerBalanceHistory" (
    "id" TEXT NOT NULL,
    "type" "CustomerBalanceHistoryType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerBalanceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_customerBalanceHistoryId_fkey" FOREIGN KEY ("customerBalanceHistoryId") REFERENCES "CustomerBalanceHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
