/*
  Warnings:

  - Added the required column `bankAccountId` to the `PartnerBalanceHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartnerBalanceHistory" ADD COLUMN     "bankAccountId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PartnerBalanceHistory" ADD CONSTRAINT "PartnerBalanceHistory_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
