/*
  Warnings:

  - Made the column `partnerId` on table `BankAccount` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BankAccount" DROP CONSTRAINT "BankAccount_partnerId_fkey";

-- AlterTable
ALTER TABLE "BankAccount" ALTER COLUMN "partnerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
