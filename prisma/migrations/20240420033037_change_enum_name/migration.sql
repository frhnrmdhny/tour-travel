/*
  Warnings:

  - Changed the type of `type` on the `CustomerBalanceHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `PartnerBalanceHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BalanceHistoryType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'TRANSACTION');

-- AlterTable
ALTER TABLE "CustomerBalanceHistory" DROP COLUMN "type",
ADD COLUMN     "type" "BalanceHistoryType" NOT NULL;

-- AlterTable
ALTER TABLE "PartnerBalanceHistory" DROP COLUMN "type",
ADD COLUMN     "type" "BalanceHistoryType" NOT NULL;

-- DropEnum
DROP TYPE "CustomerBalanceHistoryType";
