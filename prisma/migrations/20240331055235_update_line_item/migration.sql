/*
  Warnings:

  - A unique constraint covering the columns `[purchaseOrderId]` on the table `LineItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LineItem_purchaseOrderId_key" ON "LineItem"("purchaseOrderId");
