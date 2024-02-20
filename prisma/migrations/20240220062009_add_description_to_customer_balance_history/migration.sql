/*
  Warnings:

  - Added the required column `description` to the `CustomerBalanceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerBalanceHistory" ADD COLUMN     "description" TEXT NOT NULL;
