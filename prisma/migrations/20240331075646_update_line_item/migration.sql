/*
  Warnings:

  - A unique constraint covering the columns `[ComponentId]` on the table `LineItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LineItem_purchaseOrderId_key";

-- CreateIndex
CREATE UNIQUE INDEX "LineItem_ComponentId_key" ON "LineItem"("ComponentId");
