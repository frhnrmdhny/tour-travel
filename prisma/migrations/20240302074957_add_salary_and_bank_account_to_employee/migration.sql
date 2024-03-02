/*
  Warnings:

  - Added the required column `bankAccount` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "bankAccount" TEXT NOT NULL,
ADD COLUMN     "salary" INTEGER NOT NULL;
