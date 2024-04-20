/*
  Warnings:

  - A unique constraint covering the columns `[ComponentId,purchaseOrderId]` on the table `LineItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LineItem_ComponentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "LineItem_ComponentId_purchaseOrderId_key" ON "LineItem"("ComponentId", "purchaseOrderId");
