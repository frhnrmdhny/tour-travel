/*
  Warnings:

  - Added the required column `status` to the `PurchaseOrder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PurchaseOrderStatus" AS ENUM ('NEW', 'APPROVED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "completedDate" TIMESTAMP(3),
ADD COLUMN     "status" "PurchaseOrderStatus" NOT NULL;
