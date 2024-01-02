/*
  Warnings:

  - You are about to drop the column `verificationStatus` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verificationStatus";

-- DropEnum
DROP TYPE "VerificationStatus";
